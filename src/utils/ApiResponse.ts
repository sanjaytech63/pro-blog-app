import { NextResponse } from 'next/server'

export class ApiResponse {
  static success<T>(data: T, message = 'Success') {
    return NextResponse.json({
      success: true,
      message,
      data,
    })
  }

  static error(message: string, status = 400) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status },
    )
  }
}
