<script setup lang="ts">
const sprint = {
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
  <ElCard class="iteration-progress" shadow="never">
    <template #header>
      <div class="iteration-progress__head">
        <span>迭代进展</span>
      </div>
    </template>
    <p class="iteration-progress__name">{{ sprint.name }}</p>
    <p class="iteration-progress__meta">{{ sprint.owner }} · {{ sprint.range }}</p>
    <p class="iteration-progress__project">{{ sprint.project }}</p>
    <ElProgress
      :percentage="percent"
      :stroke-width="8"
      class="iteration-progress__bar"
    />
    <p class="iteration-progress__count">{{ sprint.done }}/{{ sprint.total }}</p>
  </ElCard>
</template>

<style scoped>
.iteration-progress {
  margin-bottom: 16px;
}
.iteration-progress__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iteration-progress__name {
  margin: 0 0 8px;
  font-weight: 600;
  color: var(--app-text);
}
.iteration-progress__meta,
.iteration-progress__project {
  margin: 0 0 4px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
.iteration-progress__bar {
  margin: 12px 0 8px;
}
.iteration-progress__count {
  margin: 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>
