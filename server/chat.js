import { getGuideContext, getGuideScope } from './guides.js';
import { buildSystemPrompt } from './prompt.js';
import { apiKey, callDeepSeek } from './deepseek.js';

export async function handleChat(req, res) {
  try {
    const { messages, versionId, partId } = req.body || {};

    if (!versionId || typeof versionId !== 'string') {
      return res.status(400).json({ error: '缺少 versionId' });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: '缺少 messages' });
    }

    if (messages.length > 20) {
      return res.status(400).json({ error: '對話過長' });
    }

    for (const m of messages) {
      if (!m?.content || typeof m.content !== 'string' || m.content.length > 2000) {
        return res.status(400).json({ error: '訊息格式或長度無效' });
      }
      if (m.role !== 'user' && m.role !== 'assistant') {
        return res.status(400).json({ error: '訊息角色無效' });
      }
    }

    const scope = getGuideScope(versionId, typeof partId === 'string' ? partId : 'main');
    if (!scope) {
      return res.status(400).json({ error: '此版本攻略資料準備中' });
    }

    const context = getGuideContext(versionId, null, typeof partId === 'string' ? partId : 'main');
    if (!context) {
      return res.status(400).json({ error: '此版本攻略資料準備中' });
    }

    if (!apiKey()) {
      return res.status(503).json({ error: 'AI 服務未設定，請在專案根目錄 .env 填入 DEEPSEEK_API_KEY' });
    }

    const system = buildSystemPrompt(context, scope);
    const reply = await callDeepSeek(system, messages);

    return res.json({ reply });
  } catch (err) {
    console.error(err);
    const msg = err.message || '問答服務暫時無法使用';
    const status = msg.includes('金鑰') ? 502 : 500;
    return res.status(status).json({ error: msg });
  }
}
