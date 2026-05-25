interface UmamiWindow {
  umami?: { track: (name: string, data?: Record<string, unknown>) => void }
}

export function track(event: string, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const w = window as Window & UmamiWindow
  w.umami?.track(event, data)
}
