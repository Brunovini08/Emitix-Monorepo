import { jwtDecode } from "jwt-decode"

interface jwtPayload {
  exp: number
}

export const getTokenExpiration = (token: string): number | null => {
  try {
    const decoded = jwtDecode<jwtPayload>(token)
    return decoded?.exp * 1000
  } catch (error) {
    return null
  }
}

export const getTimeUntilExpiration = (token: string): number | null => {
  const exp = getTokenExpiration(token)
  if (!exp) return null
  return exp - Date.now()
}