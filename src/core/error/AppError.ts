export class AppError extends Error {
  public status: number
  public cause?: unknown

  constructor(message: string, status = 500, cause?: unknown) {
    super(message)
    this.status = status
    this.cause = cause

    Object.setPrototypeOf(this, AppError.prototype)
  }
}
