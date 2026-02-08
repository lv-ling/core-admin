<script setup lang="ts">
interface ProjectItem {
  id: string
  name: string
  color: string
}

const projects: ProjectItem[] = [
  {
    id: '1',
    name: '工作台项目',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: '2',
    name: '双十一活动交付空间',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: '3',
    name: '双十一业务需求空间',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
]
</script>

<template>
  <ElCard
    class="mb-4"
    shadow="never"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <span>我的项目</span>
        <div class="flex items-center gap-2">
          <ElDropdown>
            <span class="cursor-pointer text-[13px] text-[var(--app-text)]"> 我管理的 </span>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>我管理的</ElDropdownItem>
                <ElDropdownItem>我参与的</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
          <ElButton
            type="primary"
            size="small"
            >+ 新建</ElButton
          >
          <ElButton
            link
            type="primary"
            >全部</ElButton
          >
        </div>
      </div>
    </template>
    <ul class="m-0 list-none p-0">
      <li
        v-for="p in projects"
        :key="p.id"
        class="flex items-center gap-3 border-b border-[var(--layout-tag-border)] py-2.5 last:border-b-0"
      >
        <span
          class="h-8 w-8 shrink-0 rounded-md"
          :style="{ background: p.color }"
        />
        <span class="text-sm text-[var(--app-text)]">{{ p.name }}</span>
      </li>
    </ul>
  </ElCard>
</template>
