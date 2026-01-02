"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AuthLogo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <img
        src="https://assets.apsaradigital.com/logo-ui-kit.png"
        alt="UIKit Logo"
        className="h-5 w-auto object-contain"
      />
    )
  }

  const logoSrc =
    theme === "dark"
      ? "https://assets.apsaradigital.com/logo-ui-kit-white.png"
      : "https://assets.apsaradigital.com/logo-ui-kit.png"

  return <img src={logoSrc || "/placeholder.svg"} alt="UIKit Logo" className="h-5 w-auto object-contain" />
}
