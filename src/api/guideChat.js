/**
 * @param {{ versionId: string, partId?: string, messages: { role: string, content: string }[] }} payload
 * @returns {Promise<string>}
 */
export async function sendGuideChat(payload) {
  let res;
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('無法連接後端，請確認已執行 npm run dev（需同時啟動 Vite 與後端）');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `服務錯誤 (${res.status})`);
  }

  return data.reply;
}
