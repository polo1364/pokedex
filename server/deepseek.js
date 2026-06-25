const API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-v4-flash';

function apiKey() {
  return process.env.DEEPSEEK_API_KEY?.trim() || '';
}

/**
 * @param {string} system
 * @param {{ role: string, content: string }[]} messages
 */
export async function callDeepSeek(system, messages) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey()}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        ...messages,
      ],
      temperature: 1.0,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error('DeepSeek error', res.status, errText);
    if (res.status === 401) {
      throw new Error('API 金鑰無效，請至 DeepSeek 平台重新建立並更新 .env');
    }
    if (res.status === 404) {
      throw new Error('模型或 API 路徑錯誤，可嘗試設定 DEEPSEEK_API_URL');
    }
    throw new Error('AI 服務回應失敗');
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) throw new Error('AI 回應為空');
  return reply.trim();
}

export { apiKey };
