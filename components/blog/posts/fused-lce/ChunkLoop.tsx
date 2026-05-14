import { useId, useState } from 'react'

const N = 32
const W = 640
const H = 220
const PAD_X = 24
const PAD_Y = 28
const ROW_H = 28
const VOCAB_W = W - PAD_X * 2

export default function ChunkLoop() {
  const [step, setStep] = useState(8)
  const [chunk, setChunk] = useState(4)

  const sliderId = useId()
  const chunkId = useId()

  const cellW = VOCAB_W / N
  const numChunks = Math.ceil(N / chunk)
  const activeChunk = Math.min(Math.floor(step / chunk), numChunks - 1)
  const chunkStart = activeChunk * chunk
  const chunkEnd = Math.min(chunkStart + chunk, N)
  const processedEnd = Math.min(step, N)

  return (
    <div className="my-8 rounded-md border border-border bg-card p-5">
      <div className="mb-1 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          interactive · chunked loop
        </p>
        <p className="font-mono text-[11px] text-muted-foreground">
          {N} tokens · chunk {chunk}
        </p>
      </div>
      <p className="mb-4 text-[13px] leading-snug text-muted-foreground">
        Scrub the top slider to step through the kernel. The teal block is the
        live chunk that holds <code className="font-mono text-[12px]">p</code>{' '}
        in SRAM. Grey cells are tokens already processed and freed.
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxHeight: H }}
        role="img"
        aria-label="Chunked loop visualization"
      >
        <text
          x={PAD_X}
          y={PAD_Y - 12}
          className="fill-muted-foreground"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
        >
          hidden states h[0..N]
        </text>

        {Array.from({ length: N }).map((_, i) => {
          const x = PAD_X + i * cellW
          const inChunk = i >= chunkStart && i < chunkEnd && i < step
          const processed = i < step && !inChunk
          const fill = inChunk
            ? 'rgb(var(--accent))'
            : processed
              ? 'rgb(var(--muted-foreground) / 0.25)'
              : 'rgb(var(--muted))'
          const stroke = inChunk ? 'rgb(var(--accent))' : 'rgb(var(--border))'
          return (
            <rect
              key={i}
              x={x + 0.5}
              y={PAD_Y}
              width={cellW - 1}
              height={ROW_H}
              fill={fill}
              stroke={stroke}
              strokeWidth={1}
            />
          )
        })}

        <text
          x={PAD_X}
          y={PAD_Y + ROW_H + 40}
          className="fill-muted-foreground"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
        >
          softmax buffer p (resident in SRAM)
        </text>

        <rect
          x={PAD_X + 0.5}
          y={PAD_Y + ROW_H + 52}
          width={VOCAB_W - 1}
          height={ROW_H}
          fill="rgb(var(--muted))"
          stroke="rgb(var(--border))"
          strokeWidth={1}
        />
        <rect
          x={PAD_X + chunkStart * cellW + 0.5}
          y={PAD_Y + ROW_H + 52}
          width={(chunkEnd - chunkStart) * cellW - 1}
          height={ROW_H}
          fill="rgb(var(--accent))"
          opacity={0.85}
          style={{ transition: 'x 120ms ease' }}
        />

        <text
          x={W / 2}
          y={H - 18}
          textAnchor="middle"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
          className="fill-foreground"
        >
          chunk {activeChunk + 1} / {numChunks} · tokens processed{' '}
          {processedEnd} / {N}
        </text>
      </svg>

      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-[110px_1fr_72px] items-center gap-3">
          <label
            htmlFor={sliderId}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            step · t
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={N}
            value={step}
            onChange={e => setStep(Number(e.target.value))}
            className="accent-accent"
          />
          <span className="text-right font-mono text-[12px] tabular-nums text-foreground">
            {processedEnd}
          </span>
        </div>
        <div className="grid grid-cols-[110px_1fr_72px] items-center gap-3">
          <label
            htmlFor={chunkId}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            chunk · C
          </label>
          <input
            id={chunkId}
            type="range"
            min={1}
            max={N}
            value={chunk}
            onChange={e => setChunk(Number(e.target.value))}
            className="accent-accent"
          />
          <span className="text-right font-mono text-[12px] tabular-nums text-foreground">
            {chunk}
          </span>
        </div>
      </div>
    </div>
  )
}
