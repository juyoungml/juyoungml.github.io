import type { ComponentType } from 'react'
import { components as fusedLce } from './fused-lce'

export const postComponents: Record<
  string,
  Record<string, ComponentType<any>>
> = {
  'fused-lce': fusedLce,
}
