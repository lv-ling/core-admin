<script setup lang="ts">
defineProps<{
  onAdd?: () => void
  onValidateAll?: () => void
  onSave?: () => void
}>()
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <span>角色管理</span>
    <div class="flex gap-2">
      <ElButton
        type="primary"
        @click="onAdd"
      >
        新增
      </ElButton>
      <ElButton @click="onValidateAll">校验全部</ElButton>
      <ElButton @click="onSave">保存</ElButton>
    </div>
  </div>
</template>
