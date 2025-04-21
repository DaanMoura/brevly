import { LinkModel } from '@/types/Link'
import { api } from './client'
import { withErrorGuard } from '@/utils/with-error-guard'

export interface ListLinksResponse {
  links: LinkModel[]
  total: number
}

export const listLinks = async () => {
  return await api.get<ListLinksResponse>('links').json()
}

export const listLinksRequest = withErrorGuard(listLinks)
