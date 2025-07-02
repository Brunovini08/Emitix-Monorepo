import { AppError } from "src/shared/errors/app.error"

export class DomainError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 422, details)
  }
}
