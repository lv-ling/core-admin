<script setup lang="ts">
import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { CoreForm, PageWrap, useCoreForm } from '@/components'
import { getMenuSearchFormSchemas } from './form-items'
import { menuColumnDefs, menuDefaultColDef } from './columns'

const [registerSearchForm] = useCoreForm({
  schemas: getMenuSearchFormSchemas(),
  inline: true,
  isSearch: true,
  maxRows: 1,
})

// 临时模拟数据，实际项目中应由接口返回
const rowData = ref(
  Array.from({ length: 1000 }).map((_, i) => ({
    id: i + 1,
    name: `菜单-${i + 1}`,
    path: `/demo/path-${i + 1}`,
    component: `views/demo/Component-${i + 1}.vue`,
    type: i % 3 === 0 ? '目录' : i % 3 === 1 ? '菜单' : '按钮',
    permission: `system:menu:${i + 1}`,
    sort: i + 1,
    status: i % 2 === 0 ? '启用' : '禁用',
  })),
)
</script>

<template>
  <PageWrap>
    <template #header>
      <span class="text-lg font-medium">菜单 / 权限配置</span>
    </template>

    <div class="flex flex-col h-full gap-2 min-h-0">
      <CoreForm @register="registerSearchForm" />

      <div class="flex items-center justify-between shrink-0">
        <ElButton type="primary">新增菜单</ElButton>
      </div>

      <div class="flex-1 min-h-0 flex flex-col">
        <div class="ag-theme-alpine w-full h-full">
          <AgGridVue class="w-full h-full" :column-defs="menuColumnDefs" :default-col-def="menuDefaultColDef"
            :row-data="rowData" row-selection="multiple" :animate-rows="true" />
        </div>
      </div>
    </div>
  </PageWrap>
</template>
