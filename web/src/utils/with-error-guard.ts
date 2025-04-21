import { ErrorGuardResponse } from '@/types/ErrorGuard'
import { HTTPError } from 'ky'

export function withErrorGuard<Args extends unknown[], T>(
  fn: (...args: Args) => Promise<T>
): (...args: Args) => Promise<ErrorGuardResponse<T>> {
  return async (...args: Args) => {
    try {
      const result = await fn(...args)
      return [null, result]
    } catch (error) {
      if (error instanceof HTTPError) {
        return [
          {
            message: error.response.statusText,
            statusCode: error.response.status,
            originalError: error
          },
          undefined
        ]
      }
      return [
        {
          message: error instanceof Error ? error.message : 'Unknown error',
          originalError: error
        },
        undefined
      ]
    }
  }
}
