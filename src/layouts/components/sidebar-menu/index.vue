<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Document, Folder } from '@element-plus/icons-vue'
import { resolvePath } from '@/utils/route'
import { useLayoutStore } from '@/stores/layout'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

const LAYOUT_NAME = 'Home'

const menuRoutes = computed(() => {
  const layoutRoute = router.getRoutes().find((r) => r.name === LAYOUT_NAME)
  const children = layoutRoute?.children?.filter((c) => c.meta?.title) ?? []
  return children
})

const activeMenu = computed(() => route.path)

const asideWidth = computed(() => (layoutStore.sidebarCollapsed ? '64px' : '200px'))
</script>

<template>
  <ElAside
    :width="asideWidth"
    class="sidebar-menu-aside"
    :class="{ 'is-collapsed': layoutStore.sidebarCollapsed }"
  >
    <div class="sidebar-menu-logo">
      {{ layoutStore.sidebarCollapsed ? '管' : '管理系统' }}
    </div>
    <div class="sidebar-menu-nav-wrap">
      <ElMenu
        :default-active="activeMenu"
        :collapse="layoutStore.sidebarCollapsed"
        class="sidebar-menu-nav"
        router
      >
        <template v-for="item in menuRoutes" :key="String(item.path)">
          <ElMenuItem v-if="!item.children?.length" :index="resolvePath('/', item.path || '')">
            <ElIcon><Document /></ElIcon>
            <span>{{ item.meta?.title ?? item.name }}</span>
          </ElMenuItem>
          <ElSubMenu v-else :index="resolvePath('/', item.path || '')">
            <template #title>
              <ElIcon><Folder /></ElIcon>
              <span>{{ item.meta?.title ?? item.name }}</span>
            </template>
            <template v-for="sub in item.children" :key="String(sub.path)">
              <ElMenuItem
                v-if="!sub.children?.length"
                :index="resolvePath(resolvePath('/', item.path || ''), sub.path || '')"
              >
                <ElIcon><Document /></ElIcon>
                <span>{{ sub.meta?.title ?? sub.name }}</span>
              </ElMenuItem>
              <ElSubMenu
                v-else
                :index="resolvePath(resolvePath('/', item.path || ''), sub.path || '')"
              >
                <template #title>
                  <ElIcon><Folder /></ElIcon>
                  <span>{{ sub.meta?.title ?? sub.name }}</span>
                </template>
                <ElMenuItem
                  v-for="third in sub.children"
                  :key="String(third.path)"
                  :index="
                    resolvePath(
                      resolvePath(resolvePath('/', item.path || ''), sub.path || ''),
                      third.path || ''
                    )
                  "
                >
                  <ElIcon><Document /></ElIcon>
                  <span>{{ third.meta?.title ?? third.name }}</span>
                </ElMenuItem>
              </ElSubMenu>
            </template>
          </ElSubMenu>
        </template>
      </ElMenu>
    </div>
  </ElAside>
</template>

<style scoped>
.sidebar-menu-aside {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--layout-sidebar-bg);
  transition: width 0.2s;
  flex-shrink: 0;
  overflow: hidden;
}
.sidebar-menu-aside.is-collapsed {
  overflow: hidden;
}
.sidebar-menu-logo {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: var(--layout-sidebar-text-active);
  font-weight: 600;
  flex-shrink: 0;
}
.sidebar-menu-nav-wrap {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
.sidebar-menu-nav {
  border-right: none;
  background-color: var(--layout-sidebar-bg);
}
.sidebar-menu-nav :deep(.el-menu-item),
.sidebar-menu-nav :deep(.el-sub-menu__title) {
  color: var(--layout-sidebar-text);
}
.sidebar-menu-nav :deep(.el-menu-item:hover),
.sidebar-menu-nav :deep(.el-menu-item.is-active),
.sidebar-menu-nav :deep(.el-sub-menu__title:hover) {
  color: var(--layout-sidebar-text-active);
  background-color: var(--layout-sidebar-active-bg);
}

/* 二级展开菜单背景：与侧栏同色系，略深以区分层级 */
.sidebar-menu-nav :deep(.el-sub-menu .el-menu),
.sidebar-menu-nav :deep(.el-sub-menu .el-menu--inline) {
  background-color: var(--layout-sidebar-submenu-bg);
}
.sidebar-menu-nav :deep(.el-sub-menu .el-menu .el-menu-item:hover),
.sidebar-menu-nav :deep(.el-sub-menu .el-menu .el-menu-item.is-active) {
  background-color: var(--layout-sidebar-active-bg);
}
</style>
