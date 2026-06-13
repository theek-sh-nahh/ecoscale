import { useState, useEffect } from 'react'

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage on first load
    return localStorage.getItem('ecoscale-theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('ecoscale-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('ecoscale-theme', 'light')
    }
  }, [isDark])

  return [isDark, setIsDark]
}