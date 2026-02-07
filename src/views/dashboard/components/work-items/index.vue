<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

interface WorkItem {
  id: string
  title: string
  status: string
  priority: '高' | '中'
  creator: string
  project: string
}

const activeTab = ref('requirement')
const items: WorkItem[] = [
  {
    id: '1',
    title: '全局搜索支持指定类型搜索',
    status: '待处理',
    priority: '高',
    creator: '设计创建',
    project: '工作台项目',
  },
  {
    id: '2',
    title: '工作项详情支持关联需求',
    status: '待处理',
    priority: '中',
    creator: '设计创建',
    project: '双十一活动交付空间',
  },
]
</script>

<template>
  <ElCard class="work-items" shadow="never">
    <template #header>
      <div class="work-items__head">
        <span>工作项</span>
        <div class="work-items__actions">
          <ElDropdown>
            <span class="work-items__dropdown">我负责的</span>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>我负责的</ElDropdownItem>
                <ElDropdownItem>我参与的</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
          <ElButton link type="primary">全部</ElButton>
        </div>
      </div>
    </template>
    <ElTabs v-model="activeTab">
      <ElTabPane label="需求 6" name="requirement" />
      <ElTabPane label="任务 2" name="task" />
    </ElTabs>
    <ul class="work-items__list">
      <li v-for="item in items" :key="item.id" class="work-items__row">
        <span class="work-items__dot work-items__dot--high" />
        <span class="work-items__title">{{ item.title }}</span>
        <ElDropdown>
          <ElButton size="small" type="primary" link>
            {{ item.status }}
            <ElIcon><ArrowDown /></ElIcon>
          </ElButton>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem>待处理</ElDropdownItem>
              <ElDropdownItem>进行中</ElDropdownItem>
              <ElDropdownItem>已完成</ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
        <span
          class="work-items__priority"
          :class="item.priority === '高' ? 'work-items__priority--high' : 'work-items__priority--mid'"
        >
          {{ item.priority }}
        </span>
        <span class="work-items__meta">{{ item.creator }} · {{ item.project }}</span>
      </li>
    </ul>
  </ElCard>
</template>

<style scoped>
.work-items {
  margin-bottom: 16px;
}
.work-items__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.work-items__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.work-items__dropdown {
  cursor: pointer;
  color: var(--app-text);
}
.work-items__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.work-items__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--layout-tag-border);
  font-size: 13px;
}
.work-items__row:last-child {
  border-bottom: none;
}
.work-items__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.work-items__dot--high {
  background: #52c41a;
}
.work-items__title {
  flex: 1;
  min-width: 0;
  color: var(--app-text);
}
.work-items__priority {
  font-size: 12px;
  padding: 0 6px;
}
.work-items__priority--high {
  color: #fa8c16;
}
.work-items__priority--mid {
  color: var(--el-color-primary);
}
.work-items__meta {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
</style>
