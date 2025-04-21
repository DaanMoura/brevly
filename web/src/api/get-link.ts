import { ErrorGuardResponse } from '@/types/ErrorGuard'
import { LinkModel } from '@/types/Link'
import { api } from './client'
import { withErrorGuard } from '@/utils/with-error-guard'

export const getLink = async (linkId: string) => {
  return await api.get<LinkModel>(`links/${linkId}`).json()
}

export const getLinkRequest = withErrorGuard(getLink)
