import data from '../../lib/data.json'

const PRODUCTS = ['kranot','gemel_hashkaa','polisa','pension']
const PRODUCT_NAMES = {
  kranot: 'קרנות השתלמות',
  gemel_hashkaa: 'קופת גמל להשקעה', 
  polisa: 'פוליסות חיסכון',
  pension: 'קרנות פנסיה',
}

function buildContext(productId) {
  const MAX = 8000
  let parts = []
  const pids = productId === 'all' ? PRODUCTS : [productId]
  for (const pid of pids) {
    const sheets = data[pid]
    if (!sheets) continue
    const pname = PRODUCT_NAMES[pid] || pid
    const entries = Object.entries(sheets)
    const limit = productId === 'all' ? 2 : entries.length
    for (const [sheet, rows] of entries.slice(0, limit)) {
      parts.push(`[${pname} - ${sheet}]`)
      for (const row of rows.slice(0, 6))
        parts.push(row.slice(0, 9).filter(Boolean).join(' | '))
    }
  }
  const full = parts.join('\n')
  return full.length > MAX ? full.slice(0, MAX) + '...' : full
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { type, productId, goals, lang, question } = req.body
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

  const ctx = buildContext(productId || 'all')
  const isHe = lang === 'he'
  let system, userMsg

  if (type === 'optimize') {
    system = isHe
      ? 'אתה מומחה פיננסי ישראלי. ענה תמיד ב-JSON בלבד ללא טקסט נוסף.'
      : 'You are an Israeli financial expert. Always respond with JSON only, no extra text.'

    const jsonFmt = '{"options":[{"title":"...","advantage":"...","allocations":[{"name":"...","weight":40}],"params":[{"label":"...","value":"..."}],"note":"..."}]}'
    const instruction = isHe
      ? `החזר JSON בפורמט: ${jsonFmt} — 3 אפשרויות, סכום משקלות 100 בכל אפשרות. כל הטקסט בעברית.`
      : `Return JSON: ${jsonFmt} — 3 options, weights sum to 100 each. All text in English.`

    const productName = productId === 'all' ? (isHe ? 'כל המוצרים' : 'All Products') : (PRODUCT_NAMES[productId] || productId)
    const goalLines = Object.entries(goals || {}).filter(([,v]) => v).map(([k,v]) => `${k}: ${v}`).join('\n') || 'No specific goals'
    userMsg = `${instruction}\n\nProduct: ${productName}\nGoals:\n${goalLines}\n\nData:\n${ctx}`

  } else if (type === 'chat') {
    system = isHe
      ? 'אתה מומחה פיננסי ישראלי. ענה בעברית עם מספרים וגופים ספציפיים.'
      : 'You are an Israeli financial expert. Answer with specific numbers and fund names.'
    userMsg = `Data:\n${ctx}\n\nQuestion: ${question}`
  } else {
    return res.status(400).json({ error: 'Invalid type' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system,
        messages: [{ role: 'user', content: userMsg }],
      }),
    })

    const d = await response.json()
    if (!response.ok) return res.status(response.status).json({ error: d.error?.message || 'API Error' })

    const text = d.content?.map(b => b.text || '').join('') || ''
    res.status(200).json({ text })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
