import { withErrorGuard } from '@/utils/with-error-guard'
import { api } from './client'

export interface ExportLinkResponse {
  reportUrl: string
}

const exportLinks = async () => {
  return await api.post('links/export', { json: {} }).json<ExportLinkResponse>()
}

export const exportLinksRequest = withErrorGuard(exportLinks)
