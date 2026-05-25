import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = 'https://umami-production-c1c9.up.railway.app'
const WEBSITE_ID = 'a2b1edb1-1f23-404a-b65a-a0253f85ca02'
const OUT = join('out', 'views.json')

function writeEmpty(reason) {
  writeFileSync(OUT, '{}')
  console.log(`[build-views] ${reason}; wrote empty views.json`)
}

async function main() {
  const username = process.env.UMAMI_USERNAME
  const password = process.env.UMAMI_PASSWORD
  if (!username || !password) {
    writeEmpty('UMAMI_USERNAME/PASSWORD not set')
    return
  }

  const loginRes = await fetch(`${ROOT}/api/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!loginRes.ok) {
    writeEmpty(`login failed (${loginRes.status})`)
    return
  }
  const { token } = await loginRes.json()

  const endAt = Date.now()
  const startAt = endAt - 365 * 24 * 60 * 60 * 1000
  const url = `${ROOT}/api/websites/${WEBSITE_ID}/metrics?startAt=${startAt}&endAt=${endAt}&type=url&limit=500`
  const res = await fetch(url, { headers: { authorization: `Bearer ${token}` } })
  if (!res.ok) {
    writeEmpty(`metrics fetch failed (${res.status})`)
    return
  }

  const rows = await res.json()
  const views = {}
  for (const row of rows) {
    const m = row.x?.match(/^\/blog\/(ko\/)?([^/]+)\/?$/)
    if (!m) continue
    const key = m[1] ? `ko:${m[2]}` : m[2]
    views[key] = (views[key] ?? 0) + Number(row.y || 0)
  }
  writeFileSync(OUT, JSON.stringify(views))
  console.log(`[build-views] wrote ${Object.keys(views).length} slugs`)
}

main().catch(err => {
  console.error('[build-views]', err)
  writeEmpty('error during fetch')
})
