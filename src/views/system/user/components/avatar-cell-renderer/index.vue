<script setup lang="ts">
import { computed } from 'vue'
import type { ICellRendererParams } from 'ag-grid-community'

const props = defineProps<{
  params: ICellRendererParams
}>()

const value = computed(() => props.params.value as string | undefined)
</script>

<template>
  <div class="avatar-cell">
    <ElImage
      v-if="value"
      :src="value"
      :preview-src-list="value ? [value] : []"
      fit="cover"
      class="avatar-cell__img"
      preview-teleported
    />
    <span v-else class="avatar-cell__placeholder">暂无</span>
  </div>
</template>

<style scoped lang="scss">
.avatar-cell {
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 32px;

  &__img {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;

    :deep(.el-image__inner) {
      border-radius: 4px;
    }
  }

  &__placeholder {
    color: var(--el-text-color-placeholder);
    font-size: 12px;
  }
}
</style>
