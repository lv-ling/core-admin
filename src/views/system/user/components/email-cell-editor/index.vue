<script setup lang="ts">
import { ref } from 'vue'
import type { ICellEditorParams } from 'ag-grid-community'
import { validateEmail } from '../../utils'

const props = defineProps<{
  params: ICellEditorParams
}>()

// eslint-disable-next-line no-undef -- DOM 类型为浏览器全局
const wrapperRef = ref<Element | null>(null)
const value = ref<string>(String(props.params.value ?? ''))

function getValue(): string {
  return value.value.trim()
}

/** AG Grid 内置校验：返回错误信息数组，null 表示通过 */
function getValidationErrors(): string[] | null {
  const err = validateEmail(value.value)
  return err ? [err] : null
}

/** AG Grid 校验反馈锚点元素，用于 tooltip 定位 */
function getValidationElement() {
  return wrapperRef.value
}

defineExpose({
  getValue,
  getValidationErrors,
  getValidationElement,
})
</script>

<template>
  <div ref="wrapperRef" class="email-editor">
    <ElInput
      v-model="value"
      size="small"
      placeholder="请输入邮箱"
      class="email-editor__input"
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
}
</style>
