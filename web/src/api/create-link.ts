import { api } from './client'

export interface CreateLinkBody {
  originalUrl: string
  alias: string
}

export interface CreateLinkResponse {
  linkId: string
}

export const createLinkRequest = async (body: CreateLinkBody) => {
  const response = await api.post('/links', { json: body }).json<CreateLinkResponse>()
  return response
}
