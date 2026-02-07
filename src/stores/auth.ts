import { defineStore } from 'pinia'
import { ref } from 'vue'

const TOKEN_KEY = 'token'
const getStoredToken = (): string => localStorage.getItem(TOKEN_KEY) ?? ''

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(getStoredToken())
  const userInfo = ref<{ name?: string; [key: string]: unknown } | null>(null)
  const routesFetched = ref(false)

  function setToken(value: string) {
    token.value = value
    if (value) {
      localStorage.setItem(TOKEN_KEY, value)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  function setUserInfo(info: { name?: string; [key: string]: unknown } | null) {
    userInfo.value = info
  }

  function setRoutesFetched(fetched: boolean) {
    routesFetched.value = fetched
  }

  function isLoggedIn(): boolean {
    return !!token.value
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    routesFetched.value = false
    localStorage.removeItem(TOKEN_KEY)
  }

  return {
    token,
    userInfo,
    routesFetched,
    setToken,
    setUserInfo,
    setRoutesFetched,
    isLoggedIn,
    logout,
  }
})
