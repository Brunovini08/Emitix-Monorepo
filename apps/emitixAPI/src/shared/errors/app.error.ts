export class AppError extends Error {
  constructor(public message: string, public statusCode = 400, public details?: any) {
    super(message)
    this.name = this.constructor.name
  }
}