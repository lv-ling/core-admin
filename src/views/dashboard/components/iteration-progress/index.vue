<script setup lang="ts">
interface Sprint {
  name: string
  owner: string
  range: string
  project: string
  done: number
  total: number
}

const sprint: Sprint = {
  name: 'Sprint 20221210',
  owner: '设计负责',
  range: '2022-11-29 - 2022-12-10',
  project: '工作台项目',
  done: 1,
  total: 3,
}
const percent = Math.round((sprint.done / sprint.total) * 100)
</script>

<template>
  <ElCard
    class="mb-4"
    shadow="never"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <span>迭代进展</span>
      </div>
    </template>
    <p class="mb-2 mt-0 font-semibold text-[var(--app-text)]">
      {{ sprint.name }}
    </p>
    <p class="mb-1 mt-0 text-[13px] text-[var(--el-text-color-secondary)]">
      {{ sprint.owner }} · {{ sprint.range }}
    </p>
    <p class="mb-1 mt-0 text-[13px] text-[var(--el-text-color-secondary)]">
      {{ sprint.project }}
    </p>
    <ElProgress
      :percentage="percent"
      :stroke-width="8"
      class="my-3"
    />
    <p class="m-0 text-[13px] text-[var(--el-text-color-secondary)]">
      {{ sprint.done }}/{{ sprint.total }}
    </p>
  </ElCard>
</template>
