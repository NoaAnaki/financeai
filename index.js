import { useState, useRef, useEffect } from 'react'
import data from '../lib/data.json'

const LOGO_B64 = "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"

const PRODUCTS = [
  { id: 'kranot',        he: 'קרנות השתלמות',   en: 'Study Funds' },
  { id: 'gemel_hashkaa', he: 'קופת גמל להשקעה', en: 'Investment Pension' },
  { id: 'polisa',        he: 'פוליסות חיסכון',  en: 'Savings Policies' },
  { id: 'pension',       he: 'קרנות פנסיה',     en: 'Pension Funds' },
]

const PRODUCT_PARAMS = {
  kranot: [
    { key:'stocks',   he:'חשיפה למניות (%)',  en:'Stocks (%)',      ph:'50',  type:'target' },
    { key:'foreign',  he:'חשיפה לחול (%)',    en:'Foreign (%)',     ph:'45',  type:'target' },
    { key:'forex',    he:'חשיפה למטח (%)',    en:'FX (%)',          ph:'20',  type:'target' },
    { key:'sharpe',   he:'מדד שארפ מינימלי',  en:'Min Sharpe',      ph:'1.2', type:'min'    },
    { key:'illiquid', he:'לא סחירים מקס (%)', en:'Max Illiquid (%)',ph:'30',  type:'max'    },
  ],
  gemel_hashkaa: [
    { key:'stocks',   he:'חשיפה למניות (%)',  en:'Stocks (%)',      ph:'50',  type:'target' },
    { key:'foreign',  he:'חשיפה לחול (%)',    en:'Foreign (%)',     ph:'40',  type:'target' },
    { key:'forex',    he:'חשיפה למטח (%)',    en:'FX (%)',          ph:'20',  type:'target' },
    { key:'sharpe',   he:'מדד שארפ מינימלי',  en:'Min Sharpe',      ph:'1.2', type:'min'    },
    { key:'illiquid', he:'לא סחירים מקס (%)', en:'Max Illiquid (%)',ph:'25',  type:'max'    },
  ],
  polisa: [
    { key:'stocks',   he:'חשיפה למניות (%)',  en:'Stocks (%)',      ph:'50',  type:'target' },
    { key:'foreign',  he:'חשיפה לחול (%)',    en:'Foreign (%)',     ph:'45',  type:'target' },
    { key:'forex',    he:'חשיפה למטח (%)',    en:'FX (%)',          ph:'20',  type:'target' },
    { key:'sharpe',   he:'מדד שארפ מינימלי',  en:'Min Sharpe',      ph:'1.2', type:'min'    },
    { key:'illiquid', he:'לא סחירים מקס (%)', en:'Max Illiquid (%)',ph:'30',  type:'max'    },
  ],
  pension: [
    { key:'ageGroup', he:'קבוצת גיל',         en:'Age Group',       ph:'עד50',type:'text'   },
    { key:'stocks',   he:'חשיפה למניות (%)',  en:'Stocks (%)',      ph:'55',  type:'target' },
    { key:'foreign',  he:'חשיפה לחול (%)',    en:'Foreign (%)',     ph:'45',  type:'target' },
    { key:'illiquid', he:'לא סחירים מקס (%)', en:'Max Illiquid (%)',ph:'35',  type:'max'    },
  ],
  all: [
    { key:'stocks',   he:'חשיפה למניות (%)',  en:'Stocks (%)',      ph:'50',  type:'target' },
    { key:'foreign',  he:'חשיפה לחול (%)',    en:'Foreign (%)',     ph:'45',  type:'target' },
    { key:'forex',    he:'חשיפה למטח (%)',    en:'FX (%)',          ph:'20',  type:'target' },
    { key:'sharpe',   he:'מדד שארפ מינימלי',  en:'Min Sharpe',      ph:'1.2', type:'min'    },
    { key:'illiquid', he:'לא סחירים מקס (%)', en:'Max Illiquid (%)',ph:'30',  type:'max'    },
  ],
}

const T = {
  he: {
    title:'FinanceAI', subtitle:'מערכת AI לניתוח מוצרי חיסכון',
    allProducts:'כל המוצרים', optimize:'אופטימיזציה לתיק',
    chat:'שאלות חופשיות', dataStatus:'נתוני חשיפות',
    goal:'הגדר יעד לתיק', analyze:'נתח והמלץ',
    send:'שלח', top3:'3 האפשרויות המובילות',
    advantage:'יתרון עיקרי', allocation:'הרכב התיק', params:'פרמטרים',
    chatPlaceholder:'שאל כל שאלה על המוצרים...',
    examples:'דוגמאות:', thinking:'מנתח...',
    errorMsg:'שגיאה. נסה שוב.', allNote:'מציג פרמטרים משותפים לכולם',
  },
  en: {
    title:'FinanceAI', subtitle:'AI Savings Product Analysis',
    allProducts:'All Products', optimize:'Portfolio Optimizer',
    chat:'Free Questions', dataStatus:'Exposure Data',
    goal:'Define Portfolio Goals', analyze:'Analyze & Recommend',
    send:'Send', top3:'Top 3 Recommendations',
    advantage:'Key Advantage', allocation:'Allocation', params:'Parameters',
    chatPlaceholder:'Ask anything about the products...',
    examples:'Examples:', thinking:'Analyzing...',
    errorMsg:'Error. Try again.', allNote:'Showing shared parameters',
  }
}

async function callAPI(body) {
  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const d = await res.json()
  if (!res.ok) throw new Error(d.error || 'API Error ' + res.status)
  return d.text
}

const Spinner = ({ size = 18 }) => (
  <div style={{ width: size, height: size, border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
)

function TypeBadge({ type, lang }) {
  const cfg = { target:{he:'יעד',en:'Target',c:'#6366f1'}, min:{he:'מינ',en:'Min',c:'#10b981'}, max:{he:'מקס',en:'Max',c:'#f59e0b'}, text:{he:'טקסט',en:'Text',c:'#64748b'} }[type] || {he:'יעד',en:'Target',c:'#6366f1'}
  return <span style={{ fontSize:9, fontWeight:700, color:cfg.c, border:'1px solid '+cfg.c, borderRadius:4, padding:'1px 5px', marginLeft:4, opacity:0.85 }}>{cfg[lang]}</span>
}

function OptionCard({ opt, idx, lang }) {
  const t = T[lang]
  const [open, setOpen] = useState(idx === 0)
  const colors = ['#6366f1','#10b981','#f59e0b']
  const color = colors[idx] || '#6366f1'
  const badge = ['🥇','🥈','🥉'][idx] || '⭐'
  return (
    <div style={{ background:'#1e293b', borderRadius:14, marginBottom:14, border:'1px solid '+color+'40', overflow:'hidden' }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding:'16px 20px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:20 }}>{badge}</span>
          <div>
            <div style={{ color:'#e2e8f0', fontWeight:700, fontSize:15 }}>{opt.title}</div>
            <div style={{ color:'#94a3b8', fontSize:12, marginTop:2 }}>{opt.advantage}</div>
          </div>
        </div>
        <span style={{ color:'#64748b' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding:'0 20px 20px', borderTop:'1px solid #334155' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:16 }}>
            <div>
              <div style={{ color:'#64748b', fontSize:11, fontWeight:700, marginBottom:10 }}>{t.allocation.toUpperCase()}</div>
              {(opt.allocations||[]).map((a,i) => (
                <div key={i} style={{ marginBottom:8 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                    <span style={{ color:'#cbd5e1', fontSize:12 }}>{a.name}</span>
                    <span style={{ color, fontSize:12, fontWeight:700 }}>{a.weight}%</span>
                  </div>
                  <div style={{ background:'#0f172a', borderRadius:4, height:5 }}>
                    <div style={{ background:color, borderRadius:4, height:5, width:Math.min(a.weight,100)+'%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color:'#64748b', fontSize:11, fontWeight:700, marginBottom:10 }}>{t.params.toUpperCase()}</div>
              {(opt.params||[]).map((p,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid #1e293b' }}>
                  <span style={{ color:'#94a3b8', fontSize:12 }}>{p.label}</span>
                  <span style={{ color:'#e2e8f0', fontSize:12, fontWeight:600 }}>{p.value}</span>
                </div>
              ))}
              {opt.note && <div style={{ marginTop:12, padding:10, background:'#0f172a', borderRadius:8, color:'#64748b', fontSize:11, lineHeight:1.5 }}>💡 {opt.note}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function OptimizerTab({ selectedProduct, lang }) {
  const t = T[lang]
  const paramDefs = PRODUCT_PARAMS[selectedProduct] || PRODUCT_PARAMS.all
  const [goals, setGoals] = useState({})
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState(null)
  const [errorText, setErrorText] = useState('')
  const prevProd = useRef(selectedProduct)
  useEffect(() => {
    if (prevProd.current !== selectedProduct) { setGoals({}); setOptions(null); setErrorText(''); prevProd.current = selectedProduct }
  }, [selectedProduct])

  const analyze = async () => {
    setLoading(true); setOptions(null); setErrorText('')
    try {
      const raw = await callAPI({ type:'optimize', productId:selectedProduct, goals, lang })
      const start = raw.indexOf('{'); const end = raw.lastIndexOf('}')
      const parsed = JSON.parse(start !== -1 && end !== -1 ? raw.slice(start, end+1) : raw)
      if (!parsed.options?.length) throw new Error('Invalid structure')
      setOptions(parsed.options.slice(0,3))
    } catch(err) { setErrorText(t.errorMsg + ' (' + err.message + ')') }
    setLoading(false)
  }

  const rows = []
  for (let i=0; i<paramDefs.length; i+=2) rows.push(paramDefs.slice(i,i+2))

  return (
    <div style={{ maxWidth:820, margin:'0 auto' }}>
      <div style={{ background:'#1e293b', borderRadius:16, padding:20, marginBottom:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ color:'#94a3b8', fontSize:12, fontWeight:700 }}>{t.goal.toUpperCase()}</div>
          {selectedProduct !== 'all' && (
            <div style={{ fontSize:11, color:'#6366f1', background:'#1e1b4b', borderRadius:6, padding:'3px 10px', border:'1px solid #4338ca' }}>
              {PRODUCTS.find(p=>p.id===selectedProduct)?.he}
            </div>
          )}
        </div>
        {rows.map((row,ri) => (
          <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat('+row.length+',1fr)', gap:12, marginBottom:12 }}>
            {row.map(({key,he,en,ph,type}) => (
              <div key={key}>
                <label style={{ color:'#94a3b8', fontSize:11, display:'flex', alignItems:'center', marginBottom:5, gap:4, flexDirection:lang==='he'?'row-reverse':'row', justifyContent:lang==='he'?'flex-end':'flex-start' }}>
                  <TypeBadge type={type} lang={lang} />
                  <span>{lang==='he'?he:en}</span>
                </label>
                <input value={goals[key]||''} onChange={e=>setGoals(g=>({...g,[key]:e.target.value}))}
                  placeholder={ph} dir={type==='text'?'rtl':'ltr'}
                  style={{ width:'100%', background:'#0f172a', border:'1px solid #334155', borderRadius:8, padding:'9px 12px', color:'#e2e8f0', fontSize:14, boxSizing:'border-box', outline:'none' }} />
              </div>
            ))}
          </div>
        ))}
        {selectedProduct==='all' && <div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>ℹ️ {t.allNote}</div>}
      </div>
      <button onClick={analyze} disabled={loading}
        style={{ width:'100%', background:loading?'#374151':'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', borderRadius:12, padding:16, color:'#fff', fontSize:16, fontWeight:700, cursor:loading?'not-allowed':'pointer', marginBottom:28, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        {loading ? <><Spinner />{t.thinking}</> : '🚀 ' + t.analyze}
      </button>
      {errorText && <div style={{ background:'#450a0a', border:'1px solid #ef4444', borderRadius:10, padding:'12px 16px', color:'#fca5a5', fontSize:13, marginBottom:16 }}>⚠️ {errorText}</div>}
      {options && (
        <div>
          <div style={{ color:'#e2e8f0', fontSize:17, fontWeight:700, marginBottom:16 }}>✨ {t.top3}</div>
          {options.map((opt,i) => <OptionCard key={i} opt={opt} idx={i} lang={lang} />)}
        </div>
      )}
    </div>
  )
}

function ChatTab({ selectedProduct, lang }) {
  const t = T[lang]
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()
  const examples = lang==='he'
    ? ['השווה בין קרן פנסיה של הראל למגדל','מה ההבדל בין מסלול מניות לכללי?','מי מציע נכסים לא סחירים גבוהים ביותר?']
    : ['Compare Harel vs Migdal pension','Stocks vs general track difference?','Who has highest illiquid assets?']
  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}) }, [msgs,loading])

  const send = async (txt) => {
    const q = txt||input.trim()
    if (!q||loading) return
    setInput(''); setMsgs(m=>[...m,{role:'user',text:q}]); setLoading(true)
    try {
      const ans = await callAPI({ type:'chat', productId:selectedProduct, question:q, lang })
      setMsgs(m=>[...m,{role:'assistant',text:ans}])
    } catch(err) { setMsgs(m=>[...m,{role:'assistant',text:'שגיאה: '+err.message,error:true}]) }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth:820, margin:'0 auto', display:'flex', flexDirection:'column', height:'60vh', minHeight:400 }}>
      {msgs.length===0 && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, padding:20 }}>
          <div style={{ color:'#64748b', fontSize:13, marginBottom:4 }}>{t.examples}</div>
          {examples.map((ex,i) => (
            <button key={i} onClick={()=>send(ex)}
              style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:10, padding:'10px 18px', color:'#94a3b8', fontSize:13, cursor:'pointer', maxWidth:440, width:'100%', textAlign:'right', direction:'rtl' }}>
              {ex}
            </button>
          ))}
        </div>
      )}
      {msgs.length>0 && (
        <div style={{ flex:1, overflowY:'auto', padding:'16px 0', display:'flex', flexDirection:'column', gap:12 }}>
          {msgs.map((m,i) => (
            <div key={i} style={{ display:'flex', justifyContent:m.role==='user'?'flex-start':'flex-end' }}>
              <div style={{ maxWidth:'82%', background:m.role==='user'?'#1e293b':m.error?'#450a0a':'#312e81', borderRadius:12, padding:'10px 14px', color:m.error?'#fca5a5':'#e2e8f0', fontSize:14, lineHeight:1.6, direction:'rtl', textAlign:'right', whiteSpace:'pre-wrap' }}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <div style={{ background:'#312e81', borderRadius:12, padding:'10px 18px', display:'flex', gap:6, alignItems:'center' }}>
                <Spinner /><span style={{ color:'#a5b4fc', fontSize:13 }}>{t.thinking}</span>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
      )}
      <div style={{ display:'flex', gap:10, paddingTop:12, borderTop:'1px solid #1e293b' }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()}
          placeholder={t.chatPlaceholder} dir='rtl'
          style={{ flex:1, background:'#1e293b', border:'1px solid #334155', borderRadius:10, padding:'12px 14px', color:'#e2e8f0', fontSize:14, outline:'none' }} />
        <button onClick={()=>send()}
          style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', borderRadius:10, padding:'12px 20px', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          {t.send}
        </button>
      </div>
    </div>
  )
}

function parsePct(val) {
  if (!val) return null
  const n = parseFloat(val.toString().replace('%','').replace(',','.'))
  return isNaN(n) ? null : n
}

const MC = {
  'סך חשיפה למניות מתוך כלל נכסי הקופה':{label:'מניות',color:'#6366f1',max:110},
  'חשיפה למניות מתוך כלל נכסי פוליסת החיסכון':{label:'מניות',color:'#6366f1',max:110},
  'סך חשיפה לנכסים המושקעים בחול מתוך כלל נכסי הקופה':{label:'חול',color:'#06b6d4',max:130},
  'סך חשיפה לנכסים המושקעים בחול מתוך כלל נכסי המסלול':{label:'חול',color:'#06b6d4',max:130},
  'סך חשיפה לנכסים המושקעים בחול מתוך כלל נכסי פוליסת החיסכון':{label:'חול',color:'#06b6d4',max:130},
  'מדד שארפ':{label:'שארפ',color:'#10b981',max:2},
  'נכסים לא סחירים':{label:'לא סחיר',color:'#f59e0b',max:50},
  'חשיפה לנכסים לא סחירים':{label:'לא סחיר',color:'#f59e0b',max:50},
  'חשיפה למטח':{label:'מטח',color:'#a855f7',max:110},
}

function DataTab({ selectedProduct }) {
  const [activePid, setActivePid] = useState(selectedProduct!=='all'?selectedProduct:'kranot')
  const sheets = data[activePid] || {}
  const sheetNames = Object.keys(sheets)
  const [activeSheet, setActiveSheet] = useState(sheetNames[0]||null)
  useEffect(() => { const n = Object.keys(data[activePid]||{}); setActiveSheet(n[0]||null) }, [activePid])

  const currentRows = activeSheet && sheets[activeSheet] ? sheets[activeSheet] : null
  const tableData = (() => {
    if (!currentRows || currentRows.length<2) return null
    const headers = currentRows[0]
    return headers.slice(1).map((fundName,fi) => {
      const obj={name:fundName}
      currentRows.slice(1).forEach(row=>{obj[row[0]]=row[fi+1]})
      return obj
    })
  })()
  const paramNames = currentRows ? currentRows.slice(1).map(r=>r[0]) : []
  const summaryMetrics = tableData ? paramNames.map(pname=>{
    const cfg=MC[pname]; if(!cfg) return null
    const vals=tableData.map(f=>parsePct(f[pname])).filter(v=>v!==null)
    if(!vals.length) return null
    const avg=vals.reduce((a,b)=>a+b,0)/vals.length
    return{pname,...cfg,avg,min:Math.min(...vals),max:Math.max(...vals)}
  }).filter(Boolean):[]

  return (
    <div style={{ maxWidth:900, margin:'0 auto' }}>
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        {PRODUCTS.map(p=>(
          <button key={p.id} onClick={()=>setActivePid(p.id)}
            style={{ background:activePid===p.id?'linear-gradient(135deg,#6366f1,#8b5cf6)':'#1e293b', border:'1px solid '+(activePid===p.id?'#6366f1':'#334155'), borderRadius:10, padding:'8px 14px', color:activePid===p.id?'#fff':'#94a3b8', fontSize:12, fontWeight:activePid===p.id?700:400, cursor:'pointer' }}>
            {p.he}
          </button>
        ))}
      </div>
      <div style={{ display:'flex', gap:6, marginBottom:16, flexWrap:'wrap' }}>
        {sheetNames.map(s=>(
          <button key={s} onClick={()=>setActiveSheet(s)}
            style={{ background:activeSheet===s?'#1e3a5f':'#0f172a', border:'1px solid '+(activeSheet===s?'#06b6d4':'#334155'), borderRadius:8, padding:'5px 12px', color:activeSheet===s?'#67e8f9':'#64748b', fontSize:11, fontWeight:activeSheet===s?700:400, cursor:'pointer' }}>
            {s}
          </button>
        ))}
      </div>
      {summaryMetrics.length>0 && (
        <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
          {summaryMetrics.map((m,i)=>(
            <div key={i} style={{ background:'#1e293b', borderRadius:12, padding:'12px 16px', border:'1px solid #334155', flex:'1 1 100px', minWidth:90 }}>
              <div style={{ color:'#64748b', fontSize:10, marginBottom:4 }}>{m.label}</div>
              <div style={{ color:m.color, fontWeight:800, fontSize:18 }}>{m.avg.toFixed(1)}{m.pname!=='מדד שארפ'?'%':''}</div>
              <div style={{ color:'#475569', fontSize:10 }}>טווח: {m.min.toFixed(1)}–{m.max.toFixed(1)}</div>
            </div>
          ))}
        </div>
      )}
      {tableData && (
        <div style={{ background:'#1e293b', borderRadius:14, border:'1px solid #334155', overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <thead>
              <tr style={{ background:'#0f172a' }}>
                <th style={{ padding:'10px 14px', color:'#64748b', textAlign:'right', fontWeight:700, borderBottom:'1px solid #334155', whiteSpace:'nowrap', minWidth:140 }}>גוף</th>
                {paramNames.map((p,i)=>(
                  <th key={i} style={{ padding:'10px', color:MC[p]?.color||'#64748b', textAlign:'center', fontWeight:700, borderBottom:'1px solid #334155', whiteSpace:'nowrap', minWidth:70 }}>
                    {MC[p]?.label||(p.length>12?p.slice(0,12)+'...':p)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((fund,fi)=>(
                <tr key={fi} style={{ borderBottom:'1px solid #0f172a', background:fi%2===0?'#1e293b':'#162032' }}>
                  <td style={{ padding:'8px 14px', color:'#e2e8f0', fontWeight:600, direction:'rtl', whiteSpace:'nowrap', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis' }} title={fund.name}>
                    {fund.name.length>26?fund.name.slice(0,26)+'...':fund.name}
                  </td>
                  {paramNames.map((pname,pi)=>{
                    const num=parsePct(fund[pname])
                    const cfg=MC[pname]
                    const color=cfg?.color||'#94a3b8'
                    return (
                      <td key={pi} style={{ padding:'6px 10px', textAlign:'center' }}>
                        {num!==null ? (
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                            <span style={{ color, fontWeight:700, fontSize:12 }}>{num.toFixed(1)}{pname!=='מדד שארפ'?'%':''}</span>
                            <div style={{ background:'#0f172a', borderRadius:4, height:5, width:50, overflow:'hidden' }}>
                              <div style={{ background:color, height:'100%', width:Math.max(0,Math.min(100,(Math.abs(num)/(cfg?.max||100))*100))+'%', borderRadius:4 }} />
                            </div>
                          </div>
                        ) : <span style={{ color:'#334155' }}>—</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState('he')
  const [tab, setTab] = useState('optimize')
  const [selectedProduct, setSelectedProduct] = useState('all')
  const t = T[lang]
  const dir = lang==='he'?'rtl':'ltr'

  const tabs = [
    {id:'optimize', label:'🎯 '+t.optimize},
    {id:'chat',     label:'💬 '+t.chat},
    {id:'data',     label:'📊 '+t.dataStatus},
  ]

  return (
    <div dir={dir} style={{ minHeight:'100vh', background:'#0f172a', color:'#e2e8f0', fontFamily:"'Segoe UI',Arial,sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        * { box-sizing: border-box }
        ::-webkit-scrollbar { width: 6px }
        ::-webkit-scrollbar-track { background: #0f172a }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px }
        input::placeholder { color: #475569 }
        button { -webkit-tap-highlight-color: transparent }
      `}</style>

      {/* HEADER */}
      <div style={{ background:'#1e293b', borderBottom:'1px solid #334155', padding:'10px 16px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontWeight:900, fontSize:20, background:'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{t.title}</div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={()=>setLang(l=>l==='he'?'en':'he')}
              style={{ background:'#334155', border:'none', borderRadius:8, padding:'7px 14px', color:'#94a3b8', fontSize:12, fontWeight:700, cursor:'pointer' }}>
              {lang==='he'?'EN':'עב'}
            </button>
            <img src={`data:image/png;base64,${LOGO_B64}`} style={{ height:36, width:'auto', objectFit:'contain' }} alt='Profit' />
          </div>
        </div>
        <select value={selectedProduct} onChange={e=>setSelectedProduct(e.target.value)}
          style={{ background:'#0f172a', border:'1px solid #4338ca', borderRadius:10, padding:'10px 14px', color:'#a5b4fc', fontSize:14, fontWeight:600, cursor:'pointer', outline:'none', direction:dir, width:'100%' }}>
          <option value='all'>{t.allProducts}</option>
          {PRODUCTS.map(p=><option key={p.id} value={p.id}>{p.he}</option>)}
        </select>
      </div>

      {/* TABS */}
      <div style={{ background:'#1e293b', borderBottom:'1px solid #334155', display:'flex', justifyContent:'space-around' }}>
        {tabs.map(tb=>(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{ background:'none', border:'none', borderBottom:tab===tb.id?'2px solid #6366f1':'2px solid transparent', padding:'12px 8px', color:tab===tb.id?'#a5b4fc':'#64748b', fontSize:12, fontWeight:tab===tb.id?700:400, cursor:'pointer', flex:1, textAlign:'center' }}>
            {tb.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding:'16px' }}>
        {tab==='optimize' && <OptimizerTab selectedProduct={selectedProduct} lang={lang} />}
        {tab==='chat'     && <ChatTab selectedProduct={selectedProduct} lang={lang} />}
        {tab==='data'     && <DataTab selectedProduct={selectedProduct} lang={lang} />}
      </div>
    </div>
  )
}
