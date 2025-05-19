import { env } from '@/env'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
