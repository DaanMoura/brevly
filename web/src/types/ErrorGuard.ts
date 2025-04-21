export type ErrorGuard = {
  message?: string
  statusCode?: number
  originalError: Error | unknown
}

export type ErrorGuardResponse<T> = [ErrorGuard, undefined] | [null, T]
