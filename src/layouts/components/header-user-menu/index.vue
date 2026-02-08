<script setup lang="ts">
import { useRouter } from 'vue-router'
import { SwitchButton } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()

/** 项目内主题色预设（与 theme.css 一致） */
const themePresets = [
  { color: '#228be6', label: '蓝' },
  { color: '#0d9488', label: '青绿' },
  { color: '#6366f1', label: '靛蓝' },
  { color: '#409eff', label: '经典蓝' },
]

function setTheme(color: string) {
  themeStore.setThemeColor(color)
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <ElDropdown
    trigger="hover"
    placement="bottom-end"
  >
    <ElAvatar
      :size="32"
      class="header-user-menu__avatar"
      :style="{ background: 'var(--el-color-primary)' }"
    >
      {{ auth.userInfo?.name?.slice(0, 1) ?? '用' }}
    </ElAvatar>
    <template #dropdown>
      <div class="header-user-menu__dropdown">
        <div class="header-user-menu__row">
          <span class="header-user-menu__label">主题色</span>
          <div class="header-user-menu__colors">
            <span
              v-for="preset in themePresets"
              :key="preset.color"
              class="header-user-menu__color-dot"
              :class="{
                'is-active': themeStore.themeColor?.toLowerCase() === preset.color.toLowerCase(),
              }"
              :style="{ background: preset.color }"
              :title="preset.label"
              @click="setTheme(preset.color)"
            />
          </div>
        </div>
        <div class="header-user-menu__row">
          <span class="header-user-menu__label">深色模式</span>
          <ElSwitch
            v-model="themeStore.isDark"
            inline-prompt
            active-text="深"
            inactive-text="浅"
            size="small"
          />
        </div>
        <ElDivider class="header-user-menu__divider" />
        <div
          class="header-user-menu__item header-user-menu__item--action"
          @click="logout"
        >
          <ElIcon><SwitchButton /></ElIcon>
          <span>退出登录</span>
        </div>
      </div>
    </template>
  </ElDropdown>
</template>

<style scoped>
.header-user-menu__avatar {
  cursor: pointer;
  color: #fff;
  font-size: 14px;
}
.header-user-menu__dropdown {
  padding: 12px;
  min-width: 200px;
}
.header-user-menu__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.header-user-menu__row:last-of-type {
  margin-bottom: 0;
}
.header-user-menu__label {
  font-size: 14px;
  color: var(--el-text-color-primary);
}
.header-user-menu__colors {
  display: flex;
  gap: 8px;
}
.header-user-menu__color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  flex-shrink: 0;
}
.header-user-menu__color-dot:hover {
  opacity: 0.9;
}
.header-user-menu__color-dot.is-active {
  border-color: var(--el-text-color-primary);
  box-shadow: 0 0 0 1px var(--el-border-color);
}
.header-user-menu__divider {
  margin: 10px 0;
}
.header-user-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 14px;
  color: var(--el-text-color-primary);
  cursor: pointer;
}
.header-user-menu__item:hover {
  color: var(--el-color-primary);
}
.header-user-menu__item--action {
  padding: 8px 0 0;
}
</style>
