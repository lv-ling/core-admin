<script setup lang="ts">
const total = 8
const legend = [
  { label: '需求', percent: 75, count: 6, color: '#228be6' },
  { label: '缺陷', percent: 0, count: 0, color: '#fa5252' },
  { label: '任务', percent: 25, count: 2, color: '#51cf66' },
]
</script>

<template>
  <ElCard class="work-summary" shadow="never">
    <template #header>
      <div class="work-summary__head">
        <span>我的工作小结</span>
        <ElButton link type="primary">更多</ElButton>
      </div>
    </template>
    <div class="work-summary__body">
      <div class="work-summary__total">
        <span class="work-summary__num">{{ total }}个</span>
        <span class="work-summary__label">存量工作项</span>
      </div>
      <div class="work-summary__chart">
        <ElProgress
          type="circle"
          :percentage="75"
          :width="120"
          :stroke-width="10"
          color="#228be6"
        />
      </div>
      <ul class="work-summary__legend">
        <li
          v-for="(item, i) in legend"
          :key="i"
          class="work-summary__legend-item"
        >
          <span
            class="work-summary__dot"
            :style="{ background: item.color }"
          />
          <span>{{ item.label }} {{ item.percent }}% {{ item.count }}</span>
        </li>
      </ul>
    </div>
  </ElCard>
</template>

<style scoped>
.work-summary {
  margin-bottom: 16px;
}
.work-summary__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.work-summary__body {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.work-summary__total {
  display: flex;
  flex-direction: column;
}
.work-summary__num {
  font-size: 24px;
  font-weight: 600;
  color: var(--app-text);
}
.work-summary__label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
.work-summary__legend {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
.work-summary__legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.work-summary__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
