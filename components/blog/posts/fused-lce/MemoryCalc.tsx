import { useId, useMemo, useState } from 'react'

interface RangeRowProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (n: number) => string
  onChange: (v: number) => void
}

function RangeRow({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: RangeRowProps) {
  const id = useId()
  return (
    <div className="grid grid-cols-[110px_1fr_72px] items-center gap-3">
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="accent-accent"
      />
      <span className="text-right font-mono text-[12px] tabular-nums text-foreground">
        {format(value)}
      </span>
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GiB`
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MiB`
  return `${(bytes / 1024).toFixed(0)} KiB`
}

export default function MemoryCalc() {
  const [seqLen, setSeqLen] = useState(8192)
  const [vocab, setVocab] = useState(128000)
  const [chunk, setChunk] = useState(1024)

  const effectiveChunk = Math.min(chunk, seqLen)

  const { baselineBytes, fusedBytes, reduction } = useMemo(() => {
    // logits in fp32 + same again for grad
    const baseline = seqLen * vocab * 4 * 2
    const fused = effectiveChunk * vocab * 4 * 2
    return {
      baselineBytes: baseline,
      fusedBytes: fused,
      reduction: 1 - fused / baseline,
    }
  }, [seqLen, vocab, effectiveChunk])

  const fusedPct = (fusedBytes / baselineBytes) * 100

  return (
    <div className="my-8 rounded-md border border-border bg-card p-5">
      <div className="mb-1 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          interactive · logits memory
        </p>
        <p className="font-mono text-[11px] text-muted-foreground">
          fp32, fwd + bwd
        </p>
      </div>
      <p className="mb-5 text-[13px] leading-snug text-muted-foreground">
        Drag the sliders. The two bars are drawn to the same scale, so the fused
        bar shrinks linearly with chunk size.
      </p>

      <div className="space-y-3">
        <RangeRow
          label="seq · T"
          value={seqLen}
          min={512}
          max={32768}
          step={512}
          format={n => `${n.toLocaleString()}`}
          onChange={setSeqLen}
        />
        <RangeRow
          label="vocab · V"
          value={vocab}
          min={32000}
          max={256000}
          step={1000}
          format={n => `${(n / 1000).toFixed(0)}k`}
          onChange={setVocab}
        />
        <RangeRow
          label="chunk · C"
          value={chunk}
          min={64}
          max={8192}
          step={64}
          format={n => `${n}`}
          onChange={setChunk}
        />
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <div className="mb-1 flex items-baseline justify-between font-mono text-[12px]">
            <span className="text-muted-foreground">baseline</span>
            <span className="tabular-nums text-foreground">
              {formatBytes(baselineBytes)}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-sm bg-muted">
            <div
              className="h-full bg-foreground/80"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-baseline justify-between font-mono text-[12px]">
            <span className="text-muted-foreground">fused</span>
            <span className="tabular-nums text-foreground">
              {formatBytes(fusedBytes)}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-sm bg-muted">
            <div
              className="h-full bg-accent transition-[width] duration-150"
              style={{ width: `${Math.max(fusedPct, 0.5)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4 font-mono text-[12px]">
        <span className="text-muted-foreground">memory saved</span>
        <span className="text-base tabular-nums text-foreground">
          {(reduction * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
