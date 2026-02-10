import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getDeptList, createDept, updateDept, deleteDept } from '@/api/dept'
import { getDeptColumns, getDeptEditRules } from './columns'
import type { IDept, IDeptSearchForm, IDeptForm } from './types'
// import { useCoreForm } from '@/components'

export function useDeptPage() {
  // 响应式状态
  const loading = ref(false)
  const tableData = ref<IDept[]>([])
  const searchForm = ref<IDeptSearchForm>({
    name: '',
    code: '',
    status: '',
    leader: '',
    type: '',
  })

  const gridRef = ref<{
    getTableData: () => { fullData: IDept[] }
    validate: (rows?: IDept[]) => Promise<boolean>
    fullValidate: (rows?: IDept[]) => Promise<boolean>
  } | null>(null)

  const dialogVisible = ref(false)
  const dialogTitle = ref('新增部门')
  const editForm = ref<IDeptForm>({
    parentId: null,
    name: '',
    code: '',
    sortOrder: 0,
    status: 'enabled',
    description: '',
    leader: '',
    phone: '',
    email: '',
    type: 'dept',
  })
  const editingId = ref<string | null>(null)

  // const [registerCoreForm, coreForm] = useCoreForm(scheams as BaseFormSchema[])

  const deptColumns = getDeptColumns()
  const deptEditRules = getDeptEditRules()

  const editConfig = {
    trigger: 'click' as const,
    mode: 'cell' as const,
    showStatus: true,
  }

  // 计算属性
  const treeConfig = computed(() => ({
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
    showLine: true,
    expandAll: true,
  }))

  const filteredTableData = computed(() => {
    let list = tableData.value
    const { name, code, status, leader, type } = searchForm.value
    if (name?.trim()) list = list.filter((d) => d.name.includes(name.trim()))
    if (code?.trim()) {
      const lower = code.toLowerCase()
      list = list.filter((d) => d.code.toLowerCase().includes(lower))
    }
    if (status) list = list.filter((d) => d.status === status)
    if (leader?.trim()) list = list.filter((d) => d.leader?.includes(leader.trim()))
    if (type) list = list.filter((d) => d.type === type)
    return list
  })

  const parentOptions = computed(() => {
    const options: { id: string; parentId: string | null; name: string }[] = [
      { id: 'Root', parentId: null, name: '根部门（顶级）' },
    ]
    const list = tableData.value
    const excludeIds = new Set<string>()
    if (editingId.value) {
      const collect = (pid: string | null) => {
        list
          .filter((d) => d.parentId === pid)
          .forEach((d) => {
            excludeIds.add(d.id)
            collect(d.id)
          })
      }
      const editRow = list.find((d) => d.id === editingId.value)
      if (editRow) {
        excludeIds.add(editRow.id)
        collect(editRow.id)
      }
    }
    const append = (parentId: string | null, prefix = '') => {
      list
        .filter((d) => d.parentId === parentId && !excludeIds.has(d.id))
        .forEach((d) => {
          options.push({ id: d.id, parentId: d.parentId, name: prefix + d.name })
          append(d.id, prefix + '　')
        })
    }
    append(null)
    return options
  })

  // 方法
  async function loadList() {
    loading.value = true
    try {
      const list = await getDeptList()
      tableData.value = list
    } catch (e) {
      globalThis.console.error(e)
      ElMessage.error('加载部门列表失败')
    } finally {
      loading.value = false
    }
  }

  function handleSearch() {
    ElMessage.success('已按条件筛选')
  }

  function handleReset() {
    searchForm.value = { name: '', code: '', status: '', leader: '', type: '' }
    ElMessage.info('已重置筛选条件')
  }

  function openAdd(parentId: string | null = null) {
    editingId.value = null
    dialogTitle.value = parentId ? '新增子部门' : '新增部门'
    editForm.value = {
      parentId,
      name: '',
      code: '',
      sortOrder: tableData.value.filter((d) => d.parentId === parentId).length,
      status: 'enabled',
      description: '',
      leader: '',
      phone: '',
      email: '',
      type: 'dept',
    }
    dialogVisible.value = true
  }

  function openEdit(row: IDept) {
    editingId.value = row.id
    dialogTitle.value = '编辑部门'
    editForm.value = {
      parentId: row.parentId,
      name: row.name,
      code: row.code,
      sortOrder: row.sortOrder,
      status: row.status,
      description: row.description ?? '',
      leader: row.leader ?? '',
      phone: row.phone ?? '',
      email: row.email ?? '',
      type: row.type ?? 'dept',
    }
    dialogVisible.value = true
  }

  async function handleSubmit() {
    // const valid = await coreForm.validate()
    // if (!valid) return
    try {
      if (editingId.value) {
        await updateDept(editingId.value, editForm.value)
        ElMessage.success('更新成功')
      } else {
        await createDept({
          ...editForm.value,
          parentId: editForm.value.parentId ?? null,
        })
        ElMessage.success('新增成功')
      }
      dialogVisible.value = false
      await loadList()
    } catch (e) {
      globalThis.console.error(e)
      ElMessage.error(editingId.value ? '更新失败' : '新增失败')
    }
  }

  function handleDialogClose() {
    // coreForm.resetFields()
  }

  function handleDelete(row: IDept) {
    const hasChild = tableData.value.some((d) => d.parentId === row.id)
    if (hasChild) {
      ElMessage.warning('请先删除或移走子部门')
      return
    }
    ElMessageBox.confirm(`确定删除部门「${row.name}」吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteDept(row.id)
          ElMessage.success('删除成功')
          await loadList()
        } catch (e) {
          globalThis.console.error(e)
          ElMessage.error('删除失败')
        }
      })
      .catch(() => {})
  }

  async function handleValidateRow(row: IDept) {
    const $grid = gridRef.value
    if (!$grid?.fullValidate) return
    try {
      const valid = await $grid.fullValidate([row])
      if (valid) {
        ElMessage.warning(`${row.name || row.code || '该行'} 校验未通过，请修正后重试`)
      } else {
        ElMessage.success(`${row.name || row.code || '该行'} 校验通过`)
      }
    } catch {
      ElMessage.warning(`${row.name || row.code || '该行'} 校验未通过，请修正后重试`)
    }
  }

  async function handleValidateAll() {
    const $grid = gridRef.value
    if (!$grid?.fullValidate) return
    try {
      const valid = await $grid.fullValidate($grid.getTableData()?.fullData ?? [])
      if (valid) {
        ElMessage.warning('存在未通过项，请修正后再保存')
      } else {
        ElMessage.success('全部校验通过')
      }
    } catch {
      ElMessage.warning('存在未通过项，请修正后再保存')
    }
  }

  async function handleSaveAll() {
    const $grid = gridRef.value
    if ($grid?.fullValidate) {
      try {
        const valid = await $grid.fullValidate($grid.getTableData()?.fullData ?? [])
        if (valid) {
          ElMessage.warning('存在未通过项，请修正后再保存')
          return
        }
        ElMessage.success('全部校验通过')
        const data = $grid?.getTableData?.()?.fullData ?? tableData.value
        for (const row of data) {
          await updateDept(row.id, row)
        }
        ElMessage.success('保存成功')
        await loadList()
      } catch {
        ElMessage.warning('存在未通过项，请修正后再保存')
      }
    }
  }

  onMounted(() => {
    loadList()
  })

  return {
    // 状态
    loading,
    tableData,
    searchForm,
    gridRef,
    dialogVisible,
    dialogTitle,
    editForm,
    editingId,
    // 表格配置
    deptColumns,
    deptEditRules,
    editConfig,
    treeConfig,
    filteredTableData,
    parentOptions,
    // 方法
    handleSearch,
    handleReset,
    openAdd,
    openEdit,
    handleSubmit,
    handleDelete,
    handleValidateRow,
    handleValidateAll,
    handleSaveAll,
    // registerCoreForm,
    // coreForm,
    handleDialogClose,
  }
}
