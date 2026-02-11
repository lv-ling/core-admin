<script setup lang="ts">
import { CoreForm, PageWrap, useCoreForm } from '@/components'
import { useDeptPage } from './useDeptPage'
import { getDeptSearchFormSchemas, getDeptEditFormSchemas } from './form-items'

const {
  gridRef,
  loading,
  dialogVisible,
  dialogTitle,
  deptColumns,
  deptEditRules,
  editConfig,
  treeConfig,
  filteredTableData,
  parentOptions,
  handleSearch,
  handleReset,
  openAdd,
  openEdit,
  handleSubmit,
  handleDelete,
  handleValidateAll,
  handleSaveAll,
  handleDialogClose,
} = useDeptPage()

const [registerSearchForm] = useCoreForm({
  schemas: getDeptSearchFormSchemas(),
  inline: true,
  isSearch: true,
  maxRows: 2,
  onSearch: (model) => handleSearch(model),
  onReset: () => handleReset(),
})

const [registerCoreForm] = useCoreForm({
  schemas: getDeptEditFormSchemas(),
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
          <CoreForm @register="registerSearchForm" />
        </template>

        <template #operation="{ row }">
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
      width="80%"
      destroy-on-close
      @close="handleDialogClose"
    >
      <CoreForm @register="registerCoreForm">
        <template #parentId="{ model }">
          <ElSelect
            v-model="model.parentId"
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
        </template>
      </CoreForm>
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
