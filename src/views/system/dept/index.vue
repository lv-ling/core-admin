<script setup lang="ts">
// 1. 导入
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageWrap } from '@/components'
import { getDeptList, createDept, updateDept, deleteDept } from '@/api/dept'
import { getDeptColumns, getDeptEditRules } from './columns'
import type { IDept, IDeptSearchForm, IDeptForm } from './types'

// 2. 类型/接口（见 ./types）

// 3. 响应式数据
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
const formRef = ref<{ validate: () => Promise<boolean>; resetFields: () => void } | null>(null)
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

const formRules = {
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
}

const deptColumns = getDeptColumns()
const deptEditRules = getDeptEditRules()

const editConfig = {
  trigger: 'click' as const,
  mode: 'cell' as const,
  showStatus: true,
}

// 4. 计算属性
const treeConfig = computed(() => ({
  transform: true,
  rowField: 'id',
  parentField: 'parentId',
  showLine: true,
  /** 默认展开所有节点，便于一眼看到层级 */
  expandAll: true,
}))

const filteredTableData = computed(() => {
  let list = tableData.value
  const { name, code, status, leader, type } = searchForm.value
  if (name?.trim()) list = list.filter((d) => d.name.includes(name.trim()))
  if (code?.trim()) list = list.filter((d) => d.code.toLowerCase().includes(code.toLowerCase()))
  if (status) list = list.filter((d) => d.status === status)
  if (leader?.trim()) list = list.filter((d) => d.leader?.includes(leader.trim()))
  if (type) list = list.filter((d) => d.type === type)
  return list
})

const parentOptions = computed(() => {
  const options: { id: string; parentId: string | null; name: string }[] = [
    { id: '', parentId: null, name: '根部门（顶级）' },
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

// 5. 方法
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
  // 搜索依赖 computed filteredTableData，searchForm 已绑定，无需额外逻辑
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
  const valid = await formRef.value?.validate?.().catch(() => false)
  if (!valid) return
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

/** 校验当前行（使用 VxeGrid 内置 validate） */
async function handleValidateRow(row: IDept) {
  const $grid = gridRef.value
  if (!$grid?.validate) return
  try {
    await $grid.validate([row])
    ElMessage.success(`${row.name || row.code || '该行'} 校验通过`)
  } catch {
    ElMessage.warning(`${row.name || row.code || '该行'} 校验未通过，请修正后重试`)
  }
}

/** 校验全部（使用 VxeGrid 内置 fullValidate） */
async function handleValidateAll() {
  const $grid = gridRef.value
  if (!$grid?.fullValidate) return
  try {
    const valid = await $grid.fullValidate(gridRef.value?.getTableData()?.fullData ?? [])
    if (valid) {
      ElMessage.warning('存在未通过项，请修正后再保存')
    } else {
      ElMessage.success('全部校验通过')
    }
  } catch {
    ElMessage.warning('存在未通过项，请修正后再保存')
  }
}

/** 保存全部：先 fullValidate 再批量更新 */
async function handleSaveAll() {
  const $grid = gridRef.value
  if ($grid?.fullValidate) {
    try {
      const valid = await $grid.fullValidate(gridRef.value?.getTableData()?.fullData ?? [])
      if (valid) {
        ElMessage.warning('存在未通过项，请修正后再保存')
        return
      } else {
        ElMessage.success('全部校验通过')
      }
      const data = $grid?.getTableData?.()?.fullData ?? tableData.value
      for (const row of data) {
        await updateDept(row.id, row)
      }
      ElMessage.success('保存成功')
      await loadList()
    } catch {
      ElMessage.warning('存在未通过项，请修正后再保存')
      return
    }
  }
}

// 6. 生命周期
onMounted(() => {
  loadList()
})
</script>

<template>
  <PageWrap>
    <template #header>
      <span class="text-lg font-medium">部门 / 组织</span>
    </template>

    <div class="w-full h-full">
      <VxeGrid
        ref="gridRef"
        :columns="deptColumns"
        :data="filteredTableData"
        :tree-config="treeConfig"
        :edit-config="editConfig"
        :edit-rules="deptEditRules"
        :loading="loading"
        border
        stripe
        show-overflow="title"
        height="auto"
        row-id="id"
        :layouts="[['Form'], ['Toolbar', 'Table']]"
      >
        <template #toolbar>
          <div class="flex items-center gap-2">
            <ElButton
              type="primary"
              @click="openAdd(null)"
            >
              新增部门
            </ElButton>
            <ElButton @click="handleValidateAll">校验全部</ElButton>
            <ElButton @click="handleSaveAll">保存</ElButton>
          </div>
        </template>
        <template #form>
          <ElForm
            :model="searchForm"
            class="flex flex-wrap items-end gap-4"
            inline
          >
            <ElFormItem label="部门名称">
              <ElInput
                v-model="searchForm.name"
                placeholder="请输入部门名称"
                clearable
                class="w-40"
              />
            </ElFormItem>
            <ElFormItem label="部门编码">
              <ElInput
                v-model="searchForm.code"
                placeholder="请输入部门编码"
                clearable
                class="w-40"
              />
            </ElFormItem>
            <ElFormItem label="状态">
              <ElSelect
                v-model="searchForm.status"
                placeholder="全部"
                clearable
                class="w-40"
              >
                <ElOption
                  label="启用"
                  value="enabled"
                />
                <ElOption
                  label="禁用"
                  value="disabled"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem>
              <ElButton
                type="primary"
                @click="handleSearch"
              >
                搜索
              </ElButton>
              <ElButton @click="handleReset">重置</ElButton>
            </ElFormItem>
          </ElForm>
        </template>

        <template #operation="{ row }">
          <ElButton
            link
            type="primary"
            size="small"
            @click="handleValidateRow(row)"
          >
            校验
          </ElButton>
          <ElButton
            link
            type="primary"
            size="small"
            @click="openAdd(row.id)"
          >
            新增子部门
          </ElButton>
          <ElButton
            link
            type="primary"
            size="small"
            @click="openEdit(row)"
          >
            编辑
          </ElButton>
          <ElButton
            link
            type="danger"
            size="small"
            @click="handleDelete(row)"
          >
            删除
          </ElButton>
        </template>
      </VxeGrid>
    </div>

    <ElDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      destroy-on-close
      @close="formRef?.resetFields?.()"
    >
      <ElForm
        ref="formRef"
        :model="editForm"
        :rules="formRules"
        label-width="90px"
      >
        <ElFormItem
          label="上级部门"
          prop="parentId"
        >
          <ElSelect
            v-model="editForm.parentId"
            placeholder="根部门（顶级）"
            clearable
            class="w-full"
          >
            <ElOption
              v-for="opt in parentOptions"
              :key="opt.id || 'root'"
              :label="opt.name"
              :value="opt.id || null"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem
          label="部门名称"
          prop="name"
          required
        >
          <ElInput
            v-model="editForm.name"
            placeholder="请输入部门名称"
          />
        </ElFormItem>
        <ElFormItem
          label="部门编码"
          prop="code"
          required
        >
          <ElInput
            v-model="editForm.code"
            placeholder="请输入部门编码"
          />
        </ElFormItem>
        <ElFormItem
          label="排序"
          prop="sortOrder"
        >
          <ElInputNumber
            v-model="editForm.sortOrder"
            :min="0"
            class="w-full"
          />
        </ElFormItem>
        <ElFormItem
          label="状态"
          prop="status"
        >
          <ElSelect
            v-model="editForm.status"
            class="w-full"
          >
            <ElOption
              label="启用"
              value="enabled"
            />
            <ElOption
              label="禁用"
              value="disabled"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem
          label="类型"
          prop="type"
        >
          <ElSelect
            v-model="editForm.type"
            placeholder="请选择"
            class="w-full"
          >
            <ElOption
              label="公司"
              value="company"
            />
            <ElOption
              label="分公司"
              value="branch"
            />
            <ElOption
              label="部门"
              value="dept"
            />
            <ElOption
              label="小组"
              value="group"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem
          label="负责人"
          prop="leader"
        >
          <ElInput
            v-model="editForm.leader"
            placeholder="选填"
          />
        </ElFormItem>
        <ElFormItem
          label="电话"
          prop="phone"
        >
          <ElInput
            v-model="editForm.phone"
            placeholder="选填"
          />
        </ElFormItem>
        <ElFormItem
          label="邮箱"
          prop="email"
        >
          <ElInput
            v-model="editForm.email"
            placeholder="选填"
          />
        </ElFormItem>
        <ElFormItem
          label="描述"
          prop="description"
        >
          <ElInput
            v-model="editForm.description"
            type="textarea"
            :rows="2"
            placeholder="选填"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton
          type="primary"
          @click="handleSubmit"
        >
          确定
        </ElButton>
      </template>
    </ElDialog>
  </PageWrap>
</template>

<style lang="scss" scoped>
/* 表格与弹窗使用原子类与组件库 */
</style>
