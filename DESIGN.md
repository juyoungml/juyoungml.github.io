# Design Guide

This site should feel like a quiet researcher notebook, not a startup landing
page or a generic portfolio. The design goal is serious, minimal, warm, and
human.

## Principles

- Keep the page narrow and text-led.
- Prefer restraint over decoration.
- Use hierarchy through spacing and contrast, not large type.
- Make links useful but not loud.
- Keep copy concise, direct, and technically credible.
- Avoid em dashes in visible copy.

## Typography

- Body copy uses the serif stack in `styles/globals.css`.
- The global base size is `18px`; avoid dropping below `15px` except for
  compact metadata.
- Main reading text should usually be `text-[15px] leading-6`.
- Homepage intro text may use `text-[16px] leading-7` when it needs to carry
  the main visual emphasis.
- Metadata, dates, contact links, and descriptions should usually be `text-sm`.
- Page titles should stay modest, usually `text-xl` or `text-2xl`.
- Avoid bold headings unless the surrounding page genuinely needs emphasis.

## Layout

- Use `research-container` for homepage, blog index, and blog posts.
- Keep sections separated with generous vertical spacing, usually `mb-12` or
  `mb-14`.
- Keep the profile image documentary, not heroic. `h-28 w-28` is the upper
  bound for the current homepage style.
- Navigation should feel quiet and secondary to the content.

## Color

- Use warm off-white backgrounds and warm charcoal dark mode.
- Default text should be readable, but not harsh black.
- Muted text is appropriate for intro copy, descriptions, metadata, and contact
  information.
- One sentence or paragraph may use stronger foreground contrast when it
  expresses the core identity of the page.
- Accent color should be reserved for hover states or important links.

## Links

- Use `quiet-link` for contact, navigation-like, and secondary links.
- Use `work-link` for blog titles, selected work, and primary content links.
- Avoid making every link orange by default.

## Blog

- Blog index and posts should match the homepage, not use a separate article
  theme.
- Blog post titles should be restrained, not publication-hero sized.
- Post prose should use `prose-research`, which follows the same 15px rhythm as
  the homepage.
- Chronological lists should stay simple: date first, title second.
