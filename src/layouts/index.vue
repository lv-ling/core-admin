<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import SidebarMenu from '@/layouts/components/sidebar-menu/index.vue'
import AppHeader from '@/layouts/components/app-header/index.vue'
import TagNav from '@/layouts/components/tag-nav/index.vue'

const route = useRoute()
const layoutStore = useLayoutStore()

const LAYOUT_NAME = 'Home'

const isLayoutChild = computed(() => route.matched.some((record) => record.name === LAYOUT_NAME))

watch(
  () => route.fullPath,
  () => {
    if (!isLayoutChild.value) return
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
        <div class="main-content__inner">
          <router-view v-slot="{ Component, route: currentRoute }">
            <KeepAlive>
              <component
                :is="Component"
                v-if="currentRoute.meta?.keepAlive !== false"
                :key="String(currentRoute.matched[1]?.name ?? currentRoute.matched[1]?.path ?? currentRoute.path)"
              />
            </KeepAlive>
            <component
              :is="Component"
              v-if="currentRoute.meta?.keepAlive === false"
              :key="currentRoute.fullPath"
            />
          </router-view>
        </div>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  height: 100dvh;
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
  flex: 1;
  min-height: 0;
  padding: 0;
}
.main-content__inner {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
