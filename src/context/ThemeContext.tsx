// context/ThemeContext.tsx
import React, { createContext, useContext } from 'react'
import type {ReactNode} from 'react'
import { useTheme } from '../hooks/useTheme'

type ThemeContextType = ReturnType<typeof useTheme>

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

// Hook alternativo que funciona tanto con context como sin él
export const useAppTheme = () => {
  const context = useContext(ThemeContext)
  const directTheme = useTheme()
  
  // Si hay context disponible, úsalo; si no, usa el hook directo
  return context || directTheme
}