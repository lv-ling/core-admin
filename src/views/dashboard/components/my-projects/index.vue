<script setup lang="ts">
interface ProjectItem {
  id: string
  name: string
  color: string
}

const projects: ProjectItem[] = [
  { id: '1', name: '工作台项目', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: '2', name: '双十一活动交付空间', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: '3', name: '双十一业务需求空间', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
]
</script>

<template>
  <ElCard class="my-projects" shadow="never">
    <template #header>
      <div class="my-projects__head">
        <span>我的项目</span>
        <div class="my-projects__actions">
          <ElDropdown>
            <span class="my-projects__dropdown">我管理的</span>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>我管理的</ElDropdownItem>
                <ElDropdownItem>我参与的</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
          <ElButton type="primary" size="small">+ 新建</ElButton>
          <ElButton link type="primary">全部</ElButton>
        </div>
      </div>
    </template>
    <ul class="my-projects__list">
      <li
        v-for="p in projects"
        :key="p.id"
        class="my-projects__row"
      >
        <span
          class="my-projects__thumb"
          :style="{ background: p.color }"
        />
        <span class="my-projects__name">{{ p.name }}</span>
      </li>
    </ul>
  </ElCard>
</template>

<style scoped>
.my-projects {
  margin-bottom: 16px;
}
.my-projects__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.my-projects__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.my-projects__dropdown {
  cursor: pointer;
  color: var(--app-text);
  font-size: 13px;
}
.my-projects__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.my-projects__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--layout-tag-border);
}
.my-projects__row:last-child {
  border-bottom: none;
}
.my-projects__thumb {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  flex-shrink: 0;
}
.my-projects__name {
  font-size: 14px;
  color: var(--app-text);
}
</style>
