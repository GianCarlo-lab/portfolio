import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Type, Layers, Shield } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Syntax tokenizer ───────────────────────────────────────────────────────

type TType = 'kw' | 'type' | 'fn' | 'str' | 'cmt' | 'punct' | 'num' | 'plain'

const KW = new Set([
  'const', 'interface', 'return', 'if', 'else', 'let', 'var',
  'function', 'await', 'async', 'export', 'import', 'for', 'while',
])
const TY = new Set(['number', 'string', 'boolean', 'void', 'any', 'null', 'undefined', 'true', 'false'])

const COLORS: Record<TType, string | undefined> = {
  kw:    '#C792EA',
  type:  '#FFCB6B',
  fn:    '#82AAFF',
  str:   '#C3E88D',
  cmt:   '#546E7A',
  punct: '#89DDFF',
  num:   '#F78C6C',
  plain: undefined,
}

function tokenize(code: string): Array<{ text: string; type: TType }> {
  const out: Array<{ text: string; type: TType }> = []
  let i = 0
  while (i < code.length) {
    const ch = code[i]
    if (ch === '/' && code[i + 1] === '/') {
      const nl = code.indexOf('\n', i)
      const end = nl === -1 ? code.length : nl
      out.push({ text: code.slice(i, end), type: 'cmt' })
      i = end; continue
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1
      while (j < code.length && code[j] !== ch && code[j] !== '\n') j++
      out.push({ text: code.slice(i, j + 1), type: 'str' })
      i = j + 1; continue
    }
    if (ch >= '0' && ch <= '9') {
      let j = i
      while (j < code.length && ((code[j] >= '0' && code[j] <= '9') || code[j] === '.')) j++
      out.push({ text: code.slice(i, j), type: 'num' })
      i = j; continue
    }
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++
      const word = code.slice(i, j)
      const type: TType = KW.has(word) ? 'kw' : TY.has(word) ? 'type' : code[j] === '(' ? 'fn' : 'plain'
      out.push({ text: word, type })
      i = j; continue
    }
    out.push({ text: ch, type: 'plain' })
    i++
  }
  return out
}

function HighlightedCode({ code }: { code: string }) {
  return (
    <>
      {tokenize(code).map((t, i) =>
        t.type === 'plain' ? (
          <span key={i}>{t.text}</span>
        ) : (
          <span
            key={i}
            style={{
              color: COLORS[t.type],
              fontStyle: t.type === 'cmt' ? 'italic' : undefined,
            }}
          >
            {t.text}
          </span>
        )
      )}
    </>
  )
}

// ─── Code samples ────────────────────────────────────────────────────────────

const DIRTY = `// calcular precio
function calc(d, arr, x, flag) {
  var total = 0
  var res = []
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] != null && arr[i] != undefined) {
      if(flag == true) {
        total = total + (arr[i] * d)
        if(total > x) {
          res.push(arr[i])
        }
      } else {
        total += arr[i]
      }
    }
  }
  return {total: total, res: res}
}`

const CLEAN = `interface PriceCalculationResult {
  total: number
  itemsAboveThreshold: number[]
}

const calculatePriceWithDiscount = (
  discount: number,
  prices: number[],
  threshold: number,
  applyDiscount: boolean
): PriceCalculationResult => {
  const validPrices = prices.filter(Boolean)

  if (!applyDiscount) {
    const total = validPrices
      .reduce((sum, price) => sum + price, 0)
    return { total, itemsAboveThreshold: [] }
  }

  const discountedPrices = validPrices
    .map(price => price * discount)

  const total = discountedPrices
    .reduce((sum, price) => sum + price, 0)

  const itemsAboveThreshold = discountedPrices
    .filter(price => price > threshold)

  return { total, itemsAboveThreshold }
}`

// ─── Metric bar ──────────────────────────────────────────────────────────────

function MetricBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--color-text-secondary)]">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    Icon: Type,
    title: 'Nombres descriptivos',
    body: 'calc → calculatePriceWithDiscount\nd → discount, arr → prices\nCada nombre explica su propósito.',
  },
  {
    Icon: Layers,
    title: 'Single Responsibility',
    body: 'Cada función hace UNA sola cosa.\nSeparar el filtrado, el cálculo\ny la construcción del resultado.',
  },
  {
    Icon: Shield,
    title: 'Tipado estricto',
    body: 'TypeScript + interfaces eliminan\nambigüedad. El código documenta\nsus propios contratos.',
  },
]

export function CleanCodeDemo() {
  const [charCount, setCharCount] = useState(0)
  const [highlighted, setHighlighted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isTyping = charCount < CLEAN.length

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= CLEAN.length) {
          if (timerRef.current) clearInterval(timerRef.current)
          setTimeout(() => setHighlighted(true), 150)
          return prev
        }
        return prev + 3
      })
    }, 14)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const CODE_STYLE: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    fontSize: '12px',
    lineHeight: '1.7',
  }

  return (
    <div className="flex flex-col gap-8 w-full overflow-x-hidden">

      {/* ── PARTE A: Code comparison ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Dirty */}
        <div
          className="flex-1 rounded-xl overflow-hidden"
          style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
            <span className="text-xs font-semibold text-red-400">❌ Código sucio</span>
          </div>
          <pre className="p-4 m-0 overflow-x-auto" style={{ ...CODE_STYLE, color: 'var(--color-text-muted)' }}>
            <code><HighlightedCode code={DIRTY} /></code>
          </pre>
        </div>

        {/* Clean */}
        <div
          className="flex-1 rounded-xl overflow-hidden"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(34,197,94,0.15)' }}>
            <span className="text-xs font-semibold text-emerald-400">✅ Código limpio</span>
          </div>
          <pre className="p-4 m-0 overflow-x-auto" style={{ ...CODE_STYLE, color: 'var(--color-text-primary)' }}>
            <AnimatePresence mode="wait">
              {highlighted ? (
                <motion.code
                  key="hl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <HighlightedCode code={CLEAN} />
                </motion.code>
              ) : (
                <motion.code key="plain" exit={{ opacity: 0 }}>
                  {CLEAN.slice(0, charCount)}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
                      className="inline-block w-0.5 h-3.5 bg-emerald-400 align-middle ml-px"
                    />
                  )}
                </motion.code>
              )}
            </AnimatePresence>
          </pre>
        </div>
      </div>

      {/* ── PARTE B: Principles ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Principios aplicados
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRINCIPLES.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.35 }}
            >
              <GlassCard className="p-4 flex flex-col gap-2 h-full">
                <Icon size={20} className="text-primary flex-shrink-0" />
                <p className="font-semibold text-sm text-[var(--color-text-primary)]">{title}</p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                  {body}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PARTE C: Metrics ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Impacto medible
        </p>
        <GlassCard className="p-5 flex flex-col gap-4">
          <MetricBar label="Legibilidad"    pct={80} color="#6366F1" />
          <MetricBar label="Bugs reducidos" pct={60} color="#22C55E" />
          <MetricBar label="Coste de mantenimiento reducido" pct={70} color="#06B6D4" />
        </GlassCard>
      </div>
    </div>
  )
}
