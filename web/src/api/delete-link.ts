import { api } from './client'
import { withErrorGuard } from '@/utils/with-error-guard'

export const deleteLink = async (linkId: string) => {
  return await api.delete(`links/${linkId}`, { json: {} }).json()
}

export const deleteLinkRequest = withErrorGuard(deleteLink)
