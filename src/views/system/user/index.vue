<script setup lang="ts">
import { ref } from 'vue'
import type { GridApi, GridReadyEvent, IRowNode } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import { ElMessage } from 'element-plus'
import { PageWrap } from '@/components'
import {
  AvatarCellRenderer,
  AvatarCellEditor,
  EmailCellEditor,
  RowActionsCellRenderer,
  UserHeader,
} from './components'
import { defaultColDef, getColDefs } from './columns'
import type { IUser } from './types'
import { validateAge, validateEmail } from './utils'

const gridApi = ref<GridApi | null>(null)
const rowData = ref<IUser[]>([
  {
    id: '1',
    avatar: '',
    username: '张三',
    age: 25,
    email: 'zhangsan@example.com',
    status: 'active',
  },
  {
    id: '2',
    avatar: '',
    username: '李四',
    age: 30,
    email: 'lisi@test.cn',
    status: 'active',
  },
  {
    id: '3',
    avatar: '',
    username: '王五',
    age: 28,
    email: 'wangwu',
    status: 'inactive',
  },
])

const originalData = ref<Map<string, IUser>>(new Map())

const gridComponents = {
  AvatarCellRenderer,
  AvatarCellEditor,
  EmailCellEditor,
  RowActionsCellRenderer,
}

const context = ref<{ componentParent: unknown }>({ componentParent: null })

const colDefs = getColDefs()

function onGridReady(params: GridReadyEvent<IUser>) {
  gridApi.value = params.api
}

function onRowDragEnd() {
  if (!gridApi.value) return
  const newOrder: IUser[] = []
  gridApi.value.forEachNode((node) => {
    const data = node.data as IUser
    if (data) newOrder.push(data)
  })
  rowData.value = newOrder
}

function getRowId(params: { data: IUser }) {
  return params.data.id
}

function getRowValidationErrors(data: IUser): string[] {
  const errors: string[] = []
  const ageErr = validateAge(data.age)
  if (ageErr) errors.push(ageErr)
  const emailErr = validateEmail(data.email)
  if (emailErr) errors.push(emailErr)
  return errors
}

function onSaveRow(node: IRowNode<IUser>) {
  const data = node?.data
  if (!data || !gridApi.value) return
  gridApi.value.stopEditing()
  const errs = getRowValidationErrors(data)
  if (errs.length > 0) {
    ElMessage.warning(`校验未通过：${errs.join('；')}`)
    return
  }
  originalData.value.set(data.id, { ...data })
  ElMessage.success('保存成功')
}

function onValidateRow(node: IRowNode<IUser>) {
  const data = node?.data
  if (!data || !gridApi.value) return
  gridApi.value.stopEditing()
  const errs = getRowValidationErrors(data)
  if (errs.length > 0) {
    ElMessage.warning(errs.join('；'))
  } else {
    ElMessage.success('校验通过')
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- 行操作统一签名
function onCancelRow(_node?: unknown) {
  if (!gridApi.value) return
  gridApi.value.stopEditing(true)
}

function onRevertRow(node: IRowNode<IUser>) {
  const data = node?.data
  if (!data || !gridApi.value) return
  const original = originalData.value.get(data.id)
  if (!original) {
    ElMessage.info('该行无修改记录，无法还原')
    return
  }
  Object.assign(data, original)
  gridApi.value.refreshCells({ rowNodes: [node], force: true })
  ElMessage.success('已还原')
}

function handleAdd() {
  const id = `new_${Date.now()}`
  const newRow: IUser = {
    id,
    avatar: '',
    username: '',
    age: null,
    email: '',
    status: 'active',
  }
  rowData.value = [...rowData.value, newRow]
  ElMessage.success('已添加新行')
}

function handleValidateAll() {
  if (!gridApi.value) return
  gridApi.value.stopEditing()
  const allErrors: string[] = []
  gridApi.value.forEachNode((node) => {
    const data = node.data as IUser
    if (!data) return
    const errs = getRowValidationErrors(data)
    if (errs.length > 0) {
      allErrors.push(`${data.username || '未命名'}：${errs.join('；')}`)
    }
  })
  if (allErrors.length > 0) {
    ElMessage.warning(
      `共 ${allErrors.length} 行校验未通过：\n${allErrors.slice(0, 5).join('\n')}${allErrors.length > 5 ? '\n...' : ''}`
    )
  } else {
    ElMessage.success('全部校验通过')
  }
}

function handleSave() {
  globalThis.console.log(rowData.value)
}

context.value.componentParent = {
  onSaveRow,
  onValidateRow,
  onCancelRow,
  onRevertRow,
}
</script>

<template>
  <PageWrap>
    <template #header>
      <UserHeader
        :on-add="handleAdd"
        :on-validate-all="handleValidateAll"
        :on-save="handleSave"
      />
    </template>
    <AgGridVue
      class="w-full h-full"
      :column-defs="colDefs"
      :row-data="rowData"
      :default-col-def="defaultColDef"
      :components="gridComponents"
      :context="context"
      :get-row-id="getRowId"
      invalid-edit-value-mode="block"
      row-drag-managed
      @grid-ready="onGridReady"
      @row-drag-end="onRowDragEnd"
    />
  </PageWrap>
</template>
