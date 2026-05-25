import type { ComponentType } from 'react'
import { components as fusedLce } from './fused-lce'

type MDXComponent = ComponentType<Record<string, unknown>>

export const postComponents: Record<string, Record<string, MDXComponent>> = {
  'fused-lce': fusedLce as Record<string, MDXComponent>,
}
