// components/ThemeToggle.tsx
import React from 'react'
import { useTheme } from '../hooks/useTheme'

// Iconos SVG simples (puedes usar lucide-react u otra librería de iconos)
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

const SystemIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

// Versión simple con botón toggle
export const SimpleThemeToggle: React.FC = () => {
  const { isDark, changeTheme } = useTheme()

  return (
    <button
      onClick={() => changeTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg transition-colors duration-200 
                 bg-gray-200 hover:bg-gray-300 
                 dark:bg-gray-700 dark:hover:bg-gray-600
                 text-gray-800 dark:text-gray-200"
      aria-label="Cambiar tema"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

// Versión completa con menú dropdown
export const ThemeToggle: React.FC = () => {
  const { theme, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  const themes = [
    { key: 'light' as const, label: 'Claro', icon: <SunIcon /> },
    { key: 'dark' as const, label: 'Oscuro', icon: <MoonIcon /> },
    { key: 'system' as const, label: 'Sistema', icon: <SystemIcon /> },
  ]

  const currentThemeConfig = themes.find(t => t.key === theme)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200
                   bg-gray-200 hover:bg-gray-300 
                   dark:bg-gray-700 dark:hover:bg-gray-600
                   text-gray-800 dark:text-gray-200"
        aria-label="Seleccionar tema"
      >
        {currentThemeConfig?.icon}
        <span className="text-sm font-medium hidden sm:inline">
          {currentThemeConfig?.label}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic fuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menú dropdown */}
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 
                         rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
                         z-20 overflow-hidden">
            {themes.map((themeOption) => (
              <button
                key={themeOption.key}
                onClick={() => {
                  changeTheme(themeOption.key)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left
                           transition-colors duration-150
                           hover:bg-gray-100 dark:hover:bg-gray-700
                           ${theme === themeOption.key 
                             ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                             : 'text-gray-700 dark:text-gray-200'
                           }`}
              >
                {themeOption.icon}
                <span className="text-sm font-medium">{themeOption.label}</span>
                {theme === themeOption.key && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}