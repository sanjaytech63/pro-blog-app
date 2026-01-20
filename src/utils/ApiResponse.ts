import { NextResponse } from 'next/server'
export type ErrorMessage = string | { path: string; message: string }[]

export class ApiResponse {
  static success<T>(data: T, message = 'Success', status = 200) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status },
    )
  }

  static error(message: ErrorMessage, status = 400) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status },
    )
  }
}
