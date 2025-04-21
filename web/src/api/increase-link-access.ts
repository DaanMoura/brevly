import { withErrorGuard } from '@/utils/with-error-guard'
import { api } from './client'

export const increaseLinkAccess = async (linkId: string) => {
  return await api.put(`links/${linkId}/access`, { json: {} }).json()
}

export const increaseLinkAccessRequest = withErrorGuard(increaseLinkAccess)
