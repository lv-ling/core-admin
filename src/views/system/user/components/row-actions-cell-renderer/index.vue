<script setup lang="ts">
import type { ICellRendererParams } from 'ag-grid-community'

const props = defineProps<{
  params: ICellRendererParams
}>()

const context = props.params.context as {
  componentParent?: {
    onSaveRow: (node: unknown) => void
    onValidateRow: (node: unknown) => void
    onCancelRow: (node: unknown) => void
    onRevertRow: (node: unknown) => void
  }
}
const parent = context?.componentParent
const node = props.params.node

function handleSave() {
  parent?.onSaveRow(node)
}

function handleValidate() {
  parent?.onValidateRow(node)
}

function handleCancel() {
  parent?.onCancelRow(node)
}

function handleRevert() {
  parent?.onRevertRow(node)
}
</script>

<template>
  <div class="row-actions">
    <ElButton
      size="small"
      type="primary"
      @click="handleSave"
      >保存</ElButton
    >
    <ElButton
      size="small"
      @click="handleValidate"
      >校验</ElButton
    >
    <ElButton
      size="small"
      @click="handleCancel"
      >取消</ElButton
    >
    <ElButton
      size="small"
      @click="handleRevert"
      >还原</ElButton
    >
  </div>
</template>

<style scoped lang="scss">
.row-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
