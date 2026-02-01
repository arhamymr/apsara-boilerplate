"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AuthLogo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <img
        src="https://assets.apsaradigital.com/devkit-logo.png"
        alt="Apsara React Boilerplate Logo"
        className="h-5 w-auto object-contain"
      />
    );
  }

  const logoSrc =
    theme === "dark"
      ? "https://assets.apsaradigital.com/devkit-logo-white.png"
      : "https://assets.apsaradigital.com/devkit-logo.png";

  return (
    <img
      src={logoSrc || "https://assets.apsaradigital.com/devkit-logo.png"}
      alt="Apsara React Boilerplate Logo"
      className="h-5 w-auto object-contain"
    />
  );
}
