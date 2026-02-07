import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface IVisitedView {
  fullPath: string
  name?: string
  meta?: { title?: string }
}

export const useLayoutStore = defineStore('layout', () => {
  const visitedViews = ref<IVisitedView[]>([])
  const sidebarCollapsed = ref(false)

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function addView(route: RouteLocationNormalizedLoaded) {
    if (!route.meta?.title) return
    const exists = visitedViews.value.some((v) => v.fullPath === route.fullPath)
    if (!exists) {
      visitedViews.value.push({
        fullPath: route.fullPath,
        name: route.name as string | undefined,
        meta: { title: route.meta?.title as string },
      })
    }
  }

  function removeView(fullPath: string) {
    const idx = visitedViews.value.findIndex((v) => v.fullPath === fullPath)
    if (idx === -1) return
    visitedViews.value.splice(idx, 1)
  }

  function closeOthers(fullPath: string) {
    visitedViews.value = visitedViews.value.filter((v) => v.fullPath === fullPath)
  }

  function closeAll() {
    visitedViews.value = []
  }

  return {
    visitedViews,
    sidebarCollapsed,
    toggleSidebar,
    addView,
    removeView,
    closeOthers,
    closeAll,
  }
})
