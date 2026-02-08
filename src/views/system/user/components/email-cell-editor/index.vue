<script setup lang="ts">
import { ref } from 'vue'
import type { ICellEditorParams } from 'ag-grid-community'
import { ElMessage } from 'element-plus'
import { validateEmail } from '../../utils'

const props = defineProps<{
  params: ICellEditorParams
}>()

// eslint-disable-next-line no-undef -- DOM 类型为浏览器全局
const wrapperRef = ref<Element | null>(null)
const value = ref<string>(String(props.params.value ?? ''))
const isInvalid = ref(false)

function getValue(): string {
  return value.value.trim()
}

/** AG Grid 内置校验：返回错误信息数组，null 表示通过 */
function getValidationErrors(): string[] | null {
  const err = validateEmail(value.value)
  return err ? [err] : null
}

/** AG Grid 校验反馈锚点元素：tooltip 时返回锚点用于 tooltip 定位，否则返回 null 由 Grid 回退到单元格 */
function getValidationElement(tooltip: boolean) {
  return tooltip ? wrapperRef.value : null
}

/** 失焦时校验并展示反馈。因 AG Grid validate() 在 Vue 自定义 Editor 中可能未触发 getValidationElement/tooltip，改用 ElMessage + 本地样式 */
function onBlur() {
  const err = validateEmail(value.value)
  isInvalid.value = !!err
  if (err) {
    ElMessage.warning(err)
  }
  props.params.validate?.()
}

defineExpose({
  getValue,
  getValidationErrors,
  getValidationElement,
})
</script>

<template>
  <div
    ref="wrapperRef"
    class="email-editor"
    :class="{ 'email-editor--invalid': isInvalid }"
  >
    <ElInput
      v-model="value"
      size="small"
      placeholder="请输入邮箱"
      class="email-editor__input"
      :status="isInvalid ? 'error' : undefined"
      @blur="onBlur"
      @input="isInvalid = false"
    />
  </div>
</template>

<style scoped lang="scss">
.email-editor {
  padding: 2px 0;
  min-width: 180px;

  &__input {
    width: 100%;
  }

  &--invalid :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }
}
</style>
