export function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (process.env.NODE_ENV === "production") {
    return "https://app.juspilot.ai"
  }

  return "http://localhost:3000"
}

export function getTrialUrl(): string {
  return `${getAppUrl()}/welcome`
}
