import { BaseServerError } from '@/errors/base-server-error'

class APIError extends BaseServerError {
  readonly error?: unknown

  constructor(
    message: string,
    readonly status: number = 500,
    readonly opts?: {
      error?: unknown
    },
  ) {
    super(message, status)
    this.name = 'APIError'
    this.error = opts?.error
  }
}

export default APIError
