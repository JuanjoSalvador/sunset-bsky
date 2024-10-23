import { defineStore } from 'pinia'

function getSessionFromLocalStorage() {
  if (typeof window !== 'undefined')
    return JSON.parse(localStorage.getItem('session') || 'null')

  return null
}

function isSessionLoadedFromLocalStorage() {
  if (typeof window !== 'undefined')
    return !!localStorage.getItem('session')

  return false
}

export const useSessionStore = defineStore({
  id: 'session',

  // Store state
  state: () => ({
    session: getSessionFromLocalStorage(),
    isSessionLoaded: isSessionLoadedFromLocalStorage(),
  }),

  // Store actions and getters
  actions: {
    setSession(sessionData: any) {
      if (typeof window !== 'undefined')
        localStorage.setItem('session', JSON.stringify(sessionData))

      this.session = sessionData
      this.isSessionLoaded = true
    },

    getSession() {
      return this.session
    },

    clearSession() {
      if (typeof window !== 'undefined')
        localStorage.removeItem('session')

      this.session = null
      this.isSessionLoaded = false
    },
  },
})