import VerifyOtpClient from './components/verify-otp-client'

interface Props {
  searchParams: {
    email?: string
  }
}

export default async function VerifyOtpPage({ searchParams }: Props) {
  const email = (await searchParams.email) ?? ''

  return <VerifyOtpClient email={email} />
}
