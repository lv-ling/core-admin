<script setup lang="ts">
interface RepoItem {
  id: string
  name: string
  initial: string
  color: string
  isPrivate: boolean
  updated: string
}

const repos: RepoItem[] = [
  {
    id: '1',
    name: 'code-search',
    initial: 'C',
    color: '#51cf66',
    isPrivate: true,
    updated: '2022-12-12',
  },
  {
    id: '2',
    name: 'core-admin',
    initial: 'G',
    color: '#fa8c16',
    isPrivate: true,
    updated: '2022-12-11',
  },
  {
    id: '3',
    name: 'web-app',
    initial: 'W',
    color: '#69db7c',
    isPrivate: true,
    updated: '2022-12-10',
  },
  {
    id: '4',
    name: 'toolkit',
    initial: 'T',
    color: '#da8c5c',
    isPrivate: true,
    updated: '2022-12-09',
  },
]
</script>

<template>
  <ElCard class="mb-4" shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <span>我参与的代码库</span>
        <ElButton link type="primary">全部</ElButton>
      </div>
    </template>
    <ul class="m-0 list-none p-0">
      <li
        v-for="r in repos"
        :key="r.id"
        class="flex items-center gap-3 border-b border-[var(--layout-tag-border)] py-2.5 last:border-b-0"
      >
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white"
          :style="{ background: r.color }"
        >
          {{ r.initial }}
        </span>
        <div class="flex flex-col gap-0.5">
          <span class="text-sm text-[var(--app-text)]">{{ r.name }}</span>
          <span class="text-xs text-[var(--el-text-color-secondary)]">
            {{ r.isPrivate ? '私有' : '公开' }} · 更新于 {{ r.updated }}
          </span>
        </div>
      </li>
    </ul>
  </ElCard>
</template>
