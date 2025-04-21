import { api } from './client'
import { withErrorGuard } from '@/utils/with-error-guard'

export interface CreateLinkBody {
  originalUrl: string
  alias: string
}

export interface CreateLinkResponse {
  linkId: string
}

const createLink = async (body: CreateLinkBody) => {
  return await api.post('links', { json: body }).json<CreateLinkResponse>()
}

export const createLinkRequest = withErrorGuard(createLink)
