<script setup lang="ts">
import { ref } from 'vue'
import type { ICellEditorParams } from 'ag-grid-community'

const props = defineProps<{
  params: ICellEditorParams
}>()

const avatarUrl = ref<string>(String(props.params.value ?? ''))

function handleChange(uploadFile: { raw?: unknown }): void {
  const raw = uploadFile?.raw
  if (!raw || typeof (raw as { arrayBuffer?: unknown }).arrayBuffer !== 'function') return
  const reader = new globalThis.FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (typeof result === 'string') avatarUrl.value = result
  }
  reader.readAsDataURL(raw)
}

function getValue() {
  return avatarUrl.value
}

defineExpose({ getValue })
</script>

<template>
  <div class="avatar-editor">
    <div v-if="avatarUrl" class="avatar-editor__preview">
      <img :src="avatarUrl" alt="预览" class="avatar-editor__img" />
    </div>
    <ElUpload
      :show-file-list="false"
      :auto-upload="false"
      accept="image/*"
      :limit="1"
      class="avatar-editor__upload"
      @change="(uf: { raw?: File }) => handleChange(uf)"
    >
      <ElButton size="small" type="primary">选择图片</ElButton>
    </ElUpload>
  </div>
</template>

<style scoped lang="scss">
.avatar-editor {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  min-height: 40px;

  &__preview {
    flex-shrink: 0;
  }

  &__img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
  }

  &__upload {
    flex: 1;
  }
}
</style>
