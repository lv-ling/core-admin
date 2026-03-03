<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HotTable } from '@handsontable/vue3'
import { ElMessage } from 'element-plus'
import { CoreForm, PageWrap, useCoreForm } from '@/components'
import { RoleHeader } from './components'
import { COL_HEADERS, getColumns } from './columns'
import { getRoleSearchFormSchemas } from './form-items'
import type { IRoleSearchForm } from './form-items'
import type { IRole } from './types'
import { getRowValidationErrors } from './utils'

const hotTableRef = ref<InstanceType<typeof HotTable> | null>(null)
const roles = ref<IRole[]>([
  {
    id: '1',
    roleCode: 'admin',
    roleName: '管理员',
    description: '系统管理员',
    status: 'enabled',
    sortOrder: 0,
  },
  {
    id: '2',
    roleCode: 'user',
    roleName: '普通用户',
    description: '普通用户角色',
    status: 'enabled',
    sortOrder: 1,
  },
  {
    id: '3',
    roleCode: 'guest',
    roleName: '访客',
    description: '访客角色',
    status: 'disabled',
    sortOrder: 2,
  },
])

const [registerSearchForm] = useCoreForm({
  schemas: getRoleSearchFormSchemas(),
  inline: true,
  isSearch: true,
  maxRows: 1,
  onSearch: (model) => handleSearch(model),
  onReset: () => handleReset(),
})

const hotSettings = computed(() => ({
  themeName: 'ht-theme-main',
  data: roles.value,
  colHeaders: COL_HEADERS,
  columns: getColumns(),
  licenseKey: 'non-commercial-and-evaluation',
  height: 'calc(100vh - 280px)',
  minHeight: 300,
  autoWrapRow: true,
  autoWrapCol: true,
  stretchH: 'all',
  afterChange(changes: [number, string, unknown, unknown][] | null) {
    if (!changes) return
    const hot = hotTableRef.value?.hotInstance
    if (!hot) return
    roles.value = hot.getSourceData() as IRole[]
  },
}))

function handleAdd() {
  const id = `new_${Date.now()}`
  const newRow: IRole = {
    id,
    roleCode: '',
    roleName: '',
    description: '',
    status: 'enabled',
    sortOrder: roles.value.length,
  }
  roles.value = [...roles.value, newRow]
  const hot = hotTableRef.value?.hotInstance
  if (hot) {
    hot.loadData(roles.value)
  }
  ElMessage.success('已添加新行')
}

function handleValidateAll() {
  const hot = hotTableRef.value?.hotInstance
  if (hot) {
    hot.validateCells((valid) => {
      if (valid) {
        ElMessage.success('全部校验通过')
        return
      }
      const allErrors: string[] = []
      const data = hot.getSourceData() as IRole[]
      for (const row of data) {
        const errs = getRowValidationErrors(row)
        if (errs.length > 0) {
          allErrors.push(`${row.roleName || row.roleCode || '未命名'}：${errs.join('；')}`)
        }
      }
      ElMessage.warning(
        `共 ${allErrors.length} 行校验未通过：\n${allErrors.slice(0, 5).join('\n')}${allErrors.length > 5 ? '\n...' : ''}`
      )
    })
  } else {
    const allErrors = roles.value.flatMap((row) =>
      getRowValidationErrors(row).map((e) => `${row.roleName || row.roleCode || '未命名'}：${e}`)
    )
    if (allErrors.length > 0) {
      ElMessage.warning(
        `共 ${allErrors.length} 行校验未通过：\n${allErrors.slice(0, 5).join('\n')}${allErrors.length > 5 ? '\n...' : ''}`
      )
    } else {
      ElMessage.success('全部校验通过')
    }
  }
}

function handleSave() {
  const hot = hotTableRef.value?.hotInstance
  const data = hot ? (hot.getSourceData() as IRole[]) : roles.value
  const allErrors: string[] = []
  for (const row of data) {
    const errs = getRowValidationErrors(row)
    if (errs.length > 0) {
      allErrors.push(`${row.roleName || row.roleCode || '未命名'}：${errs.join('；')}`)
    }
  }
  if (allErrors.length > 0) {
    ElMessage.warning(`校验未通过，无法保存：\n${allErrors.slice(0, 5).join('\n')}`)
    return
  }
  roles.value = [...data]
  ElMessage.success('保存成功')
}

function normalizeSearchForm(model: Record<string, unknown>): IRoleSearchForm {
  const roleCode = typeof model.roleCode === 'string' ? model.roleCode : ''
  const roleName = typeof model.roleName === 'string' ? model.roleName : ''
  const statusValue = model.status
  const status: IRoleSearchForm['status'] =
    statusValue === 'enabled' || statusValue === 'disabled' ? statusValue : ''
  return {
    roleCode,
    roleName,
    status,
  }
}

function handleSearch(model: Record<string, unknown>) {
  const { roleCode, roleName, status } = normalizeSearchForm(model)
  let filtered = roles.value
  if (roleCode?.trim()) {
    filtered = filtered.filter((r) => r.roleCode.toLowerCase().includes(roleCode.toLowerCase()))
  }
  if (roleName?.trim()) {
    filtered = filtered.filter((r) => r.roleName.includes(roleName))
  }
  if (status) {
    filtered = filtered.filter((r) => r.status === status)
  }
  const hot = hotTableRef.value?.hotInstance
  if (hot) {
    hot.loadData(filtered)
  }
}

function handleReset() {
  const hot = hotTableRef.value?.hotInstance
  if (hot) {
    hot.loadData(roles.value)
  }
}
</script>

<template>
  <PageWrap>
    <template #header>
      <RoleHeader
        :on-add="handleAdd"
        :on-validate-all="handleValidateAll"
        :on-save="handleSave"
      />
    </template>
    <CoreForm
      class="mb-4"
      @register="registerSearchForm"
    />
    <HotTable
      ref="hotTableRef"
      :settings="hotSettings"
    />
  </PageWrap>
</template>
