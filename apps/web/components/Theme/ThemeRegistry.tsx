'use client'

import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import type { ReactNode } from "react"
import theme from "../../theme"

interface ThemeRegistryProps {
  children: ReactNode
}

export default function ThemeRegistry({children}: ThemeRegistryProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

