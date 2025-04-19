import { api } from './client'

export interface ListLinksResponse {
  links: {
    id: string
    originalUrl: string
    alias: string
    accessCount: number
    createdAt: string
  }[]
  total: number
}

export const listLinksRequest = async () => {
  const response = await api.get<ListLinksResponse>('links').json()
  return response
}
