import { track } from '../lib/analytics'
import type { SiteLocale } from '../lib/site'

const BUTTONDOWN_USERNAME = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME

interface NewsletterSignupProps {
  locale?: SiteLocale
  variant?: 'inline' | 'block'
}

const STRINGS = {
  en: {
    heading: 'Newsletter',
    blurb: 'New posts in your inbox. No spam, unsubscribe anytime.',
    placeholder: 'you@example.com',
    submit: 'Subscribe',
  },
  ko: {
    heading: '뉴스레터',
    blurb:
      '새 글이 발행되면 이메일로 받아보세요. 언제든지 구독 취소할 수 있습니다.',
    placeholder: 'you@example.com',
    submit: '구독',
  },
}

export default function NewsletterSignup({
  locale = 'en',
  variant = 'inline',
}: NewsletterSignupProps) {
  if (!BUTTONDOWN_USERNAME) return null
  const s = STRINGS[locale]
  const action = `https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`
  const popup = `https://buttondown.email/${BUTTONDOWN_USERNAME}`
  const containerClass =
    variant === 'inline'
      ? 'mt-12 rounded-md border border-border bg-muted/40 px-6 py-5'
      : 'rounded-md border border-border bg-muted/40 px-6 py-5'

  return (
    <section aria-label={s.heading} className={containerClass}>
      <h3 className="mb-1 text-base text-foreground">{s.heading}</h3>
      <p className="mb-3 text-sm text-muted-foreground">{s.blurb}</p>
      <form
        action={action}
        method="post"
        target="popupwindow"
        onSubmit={() => {
          window.open(popup, 'popupwindow')
          track('newsletter-submit', { locale })
        }}
        className="flex flex-wrap gap-2"
      >
        <label htmlFor="bd-email" className="sr-only">
          {s.placeholder}
        </label>
        <input
          type="email"
          name="email"
          id="bd-email"
          required
          placeholder={s.placeholder}
          className="min-w-0 flex-1 rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
        <input type="hidden" value="1" name="embed" />
        <button
          type="submit"
          className="rounded-sm bg-accent px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          {s.submit}
        </button>
      </form>
    </section>
  )
}
