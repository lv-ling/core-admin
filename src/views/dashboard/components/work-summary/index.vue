<script setup lang="ts">
interface LegendItem {
  label: string
  percent: number
  count: number
  color: string
}

const total = 8
const legend: LegendItem[] = [
  { label: '需求', percent: 75, count: 6, color: '#228be6' },
  { label: '缺陷', percent: 0, count: 0, color: '#fa5252' },
  { label: '任务', percent: 25, count: 2, color: '#51cf66' },
]
</script>

<template>
  <ElCard class="mb-4" shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <span>我的工作小结</span>
        <ElButton link type="primary">更多</ElButton>
      </div>
    </template>
    <div class="flex flex-wrap items-center gap-6">
      <div class="flex flex-col">
        <span class="text-2xl font-semibold text-[var(--app-text)]"> {{ total }}个 </span>
        <span class="text-xs text-[var(--el-text-color-secondary)]"> 存量工作项 </span>
      </div>
      <ElProgress type="circle" :percentage="75" :width="120" :stroke-width="10" color="#228be6" />
      <ul class="m-0 list-none p-0 text-[13px] text-[var(--el-text-color-secondary)]">
        <li v-for="(item, i) in legend" :key="i" class="mb-1 flex items-center gap-2">
          <span class="h-2 w-2 rounded-full" :style="{ background: item.color }" />
          <span>{{ item.label }} {{ item.percent }}% {{ item.count }}</span>
        </li>
      </ul>
    </div>
  </ElCard>
</template>
