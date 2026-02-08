import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const THEME_KEY = 'theme-primary'
const MODE_KEY = 'theme-mode'
const DEFAULT_THEME = '#409eff'

function getStoredTheme(): string {
  return localStorage.getItem(THEME_KEY) ?? DEFAULT_THEME
}

function getStoredDark(): boolean {
  return localStorage.getItem(MODE_KEY) === 'dark'
}

function applyTheme(color: string) {
  document.documentElement.style.setProperty('--theme-primary', color)
}

function applyLightMode() {
  document.documentElement.classList.remove('dark')
  document.documentElement.dataset.agThemeMode = 'light'
}

function applyDarkMode() {
  document.documentElement.classList.add('dark')
  document.documentElement.dataset.agThemeMode = 'dark'
}

/** 仅根据 localStorage 应用主题与深色模式，用于应用启动时（不依赖 Pinia） */
export function applyStoredTheme() {
  applyTheme(getStoredTheme())
  if (getStoredDark()) {
    applyDarkMode()
  } else {
    applyLightMode()
  }
}

export const useThemeStore = defineStore('theme', () => {
  const themeColor = ref<string>(getStoredTheme())
  const isDark = ref<boolean>(getStoredDark())

  watch(
    themeColor,
    (color) => {
      applyTheme(color)
      localStorage.setItem(THEME_KEY, color)
    },
    { immediate: false }
  )

  watch(
    isDark,
    (dark) => {
      if (dark) {
        applyDarkMode()
      } else {
        applyLightMode()
      }
      localStorage.setItem(MODE_KEY, dark ? 'dark' : 'light')
    },
    { immediate: false }
  )

  function setThemeColor(color: string) {
    themeColor.value = color
  }

  function setDark(dark: boolean) {
    isDark.value = dark
  }

  function toggleDark() {
    isDark.value = !isDark.value
  }

  return {
    themeColor,
    isDark,
    setThemeColor,
    setDark,
    toggleDark,
  }
})
