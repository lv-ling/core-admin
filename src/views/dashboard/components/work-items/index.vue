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
  <ElCard class="mb-4" shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <span>工作项</span>
        <div class="flex items-center gap-2">
          <ElDropdown>
            <span class="cursor-pointer text-[var(--app-text)]">我负责的</span>
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
    <ul class="m-0 list-none p-0">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-center gap-3 border-b border-[var(--layout-tag-border)] py-2.5 text-[13px] last:border-b-0"
      >
        <span class="h-2 w-2 shrink-0 rounded-full bg-[#52c41a]" />
        <span class="min-w-0 flex-1 text-[var(--app-text)]">{{ item.title }}</span>
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
          class="px-1.5 text-xs"
          :class="item.priority === '高' ? 'text-[#fa8c16]' : 'text-[var(--el-color-primary)]'"
        >
          {{ item.priority }}
        </span>
        <span class="text-xs text-[var(--el-text-color-secondary)]">
          {{ item.creator }} · {{ item.project }}
        </span>
      </li>
    </ul>
  </ElCard>
</template>
