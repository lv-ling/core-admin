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
  { id: '1', name: 'code-search', initial: 'C', color: '#51cf66', isPrivate: true, updated: '2022-12-12' },
  { id: '2', name: 'core-admin', initial: 'G', color: '#fa8c16', isPrivate: true, updated: '2022-12-11' },
  { id: '3', name: 'web-app', initial: 'W', color: '#69db7c', isPrivate: true, updated: '2022-12-10' },
  { id: '4', name: 'toolkit', initial: 'T', color: '#da8c5c', isPrivate: true, updated: '2022-12-09' },
]
</script>

<template>
  <ElCard class="my-repos" shadow="never">
    <template #header>
      <div class="my-repos__head">
        <span>我参与的代码库</span>
        <ElButton link type="primary">全部</ElButton>
      </div>
    </template>
    <ul class="my-repos__list">
      <li
        v-for="r in repos"
        :key="r.id"
        class="my-repos__row"
      >
        <span
          class="my-repos__avatar"
          :style="{ background: r.color }"
        >
          {{ r.initial }}
        </span>
        <div class="my-repos__info">
          <span class="my-repos__name">{{ r.name }}</span>
          <span class="my-repos__meta">
            {{ r.isPrivate ? '私有' : '公开' }} · 更新于 {{ r.updated }}
          </span>
        </div>
      </li>
    </ul>
  </ElCard>
</template>

<style scoped>
.my-repos {
  margin-bottom: 16px;
}
.my-repos__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.my-repos__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.my-repos__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--layout-tag-border);
}
.my-repos__row:last-child {
  border-bottom: none;
}
.my-repos__avatar {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}
.my-repos__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.my-repos__name {
  font-size: 14px;
  color: var(--app-text);
}
.my-repos__meta {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
