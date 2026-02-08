<script setup lang="ts">
import { ref } from 'vue'
import type { ColDef } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import { PageWrap } from '@/components'

interface IRow {
  make: string
  model: string
  price: number
  electric: boolean
}

const rowData = ref<IRow[]>([
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
  { make: 'Fiat', model: '500', price: 15774, electric: false },
  { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
])

const colDefs = ref<ColDef<IRow>[]>([
  { field: 'make', headerName: '品牌' },
  { field: 'model', headerName: '型号' },
  { field: 'price', headerName: '价格' },
  { field: 'electric', headerName: '电动车' },
])

const defaultColDef = {
  flex: 1,
  sortable: true,
  filter: true,
  editable: true,
}
</script>

<template>
  <PageWrap>
    <template #header>
      <span>消息通知</span>
    </template>
    <AgGridVue
      class="w-full h-full"
      :column-defs="colDefs"
      :row-data="rowData"
      :default-col-def="defaultColDef"
    />
  </PageWrap>
</template>
