"""Run every tests/*_browser.py against a Vite dev server and summarise the results.

    python tests/run_browser_tests.py                 # start Vite on 127.0.0.1:5173 if it is not running
    python tests/run_browser_tests.py team backup     # only the suites whose file name contains these words
    python tests/run_browser_tests.py --base http://127.0.0.1:5173

Used by `npm run test:browser` and by CI. A suite that fails is retried once, so a one-off
timing hiccup on a slow runner does not fail the whole run; a real failure fails twice.
Requires: pip install -r tests/requirements.txt && python -m playwright install chromium
"""
import argparse
import os
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_BASE = 'http://127.0.0.1:5173'
SUITE_TIMEOUT = 15 * 60


def reachable(base):
    try:
        with urllib.request.urlopen(base, timeout=3) as response:
            return response.status < 500
    except Exception:
        return False


def start_vite(base):
    port = base.rsplit(':', 1)[-1].strip('/')
    vite = ROOT / 'node_modules' / 'vite' / 'bin' / 'vite.js'
    log = open(ROOT / 'node_modules' / '.vite-browser-tests.log', 'w', encoding='utf-8')
    process = subprocess.Popen(
        ['node', str(vite), '--host', '127.0.0.1', '--port', port, '--strictPort'],
        cwd=ROOT, stdout=log, stderr=subprocess.STDOUT,
    )
    for _ in range(60):
        if reachable(base):
            return process
        if process.poll() is not None:
            break
        time.sleep(1)
    process.terminate()
    raise SystemExit(f'Vite did not start on {base}; see node_modules/.vite-browser-tests.log')


def run_suite(path, base):
    env = {**os.environ, 'PYTHONIOENCODING': 'utf-8'}
    started = time.time()
    try:
        result = subprocess.run(
            [sys.executable, str(path), base], cwd=ROOT, env=env, capture_output=True,
            text=True, encoding='utf-8', errors='replace', timeout=SUITE_TIMEOUT,
        )
        ok, output = result.returncode == 0, (result.stdout or '') + (result.stderr or '')
    except subprocess.TimeoutExpired as error:
        ok, output = False, f'timed out after {SUITE_TIMEOUT}s\n{error.stdout or ""}'
    return ok, time.time() - started, output


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    parser = argparse.ArgumentParser()
    parser.add_argument('filters', nargs='*', help='only run suites whose file name contains one of these words')
    parser.add_argument('--base', default=DEFAULT_BASE)
    args = parser.parse_args()

    suites = sorted(Path(__file__).parent.glob('*_browser.py'))
    if args.filters:
        suites = [s for s in suites if any(word in s.name for word in args.filters)]
    if not suites:
        raise SystemExit('No browser suites matched.')

    server = None if reachable(args.base) else start_vite(args.base)
    failures = []
    try:
        for suite in suites:
            ok, seconds, output = run_suite(suite, args.base)
            if not ok:
                print(f'RETRY {suite.name} ({seconds:.0f}s) after failure:\n{output[-1500:]}', flush=True)
                ok, seconds, output = run_suite(suite, args.base)
            print(f'{"PASS" if ok else "FAIL"} {suite.name} ({seconds:.0f}s)', flush=True)
            if not ok:
                failures.append(suite.name)
                print(output[-4000:], flush=True)
    finally:
        if server:
            server.terminate()

    print(f'\n{len(suites) - len(failures)}/{len(suites)} browser suites passed')
    if failures:
        raise SystemExit('Failed: ' + ', '.join(failures))


if __name__ == '__main__':
    main()
