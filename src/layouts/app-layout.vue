<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import SidebarMenu from '@/layouts/components/sidebar-menu/index.vue'
import AppHeader from '@/layouts/components/app-header/index.vue'
import TagNav from '@/layouts/components/tag-nav/index.vue'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

const LAYOUT_NAME = 'Home'

function isLayoutChild() {
  const layoutRoute = router.getRoutes().find((r) => r.name === LAYOUT_NAME)
  if (!layoutRoute) return false
  const full = route.path
  if (full === '/') return false
  const layoutPath = layoutRoute.path === '/' ? '' : layoutRoute.path
  return full.startsWith(layoutPath === '' ? '/' : layoutPath)
}

watch(
  () => route.fullPath,
  () => {
    if (!isLayoutChild()) return
    layoutStore.addView(route)
  },
  { immediate: true }
)
</script>

<template>
  <ElContainer class="main-layout">
    <SidebarMenu />
    <ElContainer class="main-right">
      <AppHeader />
      <TagNav />
      <ElMain class="main-content">
        <router-view />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  overflow: hidden;
}
.main-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.main-right > *:not(.main-content) {
  flex-shrink: 0;
}
.main-content {
  background-color: var(--layout-content-bg);
  padding: 16px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
