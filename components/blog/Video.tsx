interface VideoProps {
  src: string
  poster?: string
  caption?: string
  number?: number | string
  autoPlay?: boolean
  loop?: boolean
  controls?: boolean
  muted?: boolean
}

export default function Video({
  src,
  poster,
  caption,
  number,
  autoPlay = true,
  loop = true,
  controls = false,
  muted = true,
}: VideoProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          controls={controls}
          muted={muted}
          playsInline
          className="block w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[13px] leading-snug text-muted-foreground">
          {number !== undefined && (
            <strong className="text-foreground">Figure {number}. </strong>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
