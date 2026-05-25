export function tagSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
