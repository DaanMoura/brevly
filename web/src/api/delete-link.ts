import { api } from './client'

export const deleteLinkRequest = async (linkId: string) => {
  await api.delete(`links/${linkId}`, { json: {} })
}
