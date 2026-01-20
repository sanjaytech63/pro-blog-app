export function log(message: string, ...args: string[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, ...args)
  }
}
