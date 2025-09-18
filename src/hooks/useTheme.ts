// hooks/useTheme.ts
import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

export const useTheme = () => {
  // Obtener tema guardado o usar 'system' como default
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    return savedTheme || 'system'
  })

  // Función para detectar preferencia del sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Función para aplicar el tema al DOM
  const applyTheme = (currentTheme: Theme) => {
    const root = document.documentElement
    
    // Remover clases previas
    root.classList.remove('light', 'dark')
    
    // Determinar qué tema aplicar
    let themeToApply: 'light' | 'dark'
    
    if (currentTheme === 'system') {
      themeToApply = getSystemTheme()
    } else {
      themeToApply = currentTheme
    }
    
    // Aplicar clase al elemento raíz
    root.classList.add(themeToApply)
    
    // Opcional: cambiar meta theme-color para móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeToApply === 'dark' ? '#1a1a1a' : '#ffffff')
    }
  }

  // Función para cambiar tema
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  // Efecto para aplicar tema inicial y escuchar cambios del sistema
  useEffect(() => {
    // Aplicar tema inicial
    applyTheme(theme)

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])

  // Obtener el tema actual efectivo (resuelto)
  const currentTheme = theme === 'system' ? getSystemTheme() : theme

  return {
    theme,
    currentTheme,
    changeTheme,
    isLight: currentTheme === 'light',
    isDark: currentTheme === 'dark',
    isSystem: theme === 'system'
  }
}