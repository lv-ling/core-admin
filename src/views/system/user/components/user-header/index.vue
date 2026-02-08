<script setup lang="ts">
defineProps<{
  onAdd?: () => void
  onValidateAll?: () => void
  onSave?: () => void
}>()
</script>

<template>
  <div class="user-header">
    <span>用户管理</span>
    <div class="user-header__actions">
      <ElButton type="primary" @click="onAdd">新增</ElButton>
      <ElButton @click="onValidateAll">校验全部</ElButton>
      <ElButton @click="onSave">保存</ElButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__actions {
    display: flex;
    gap: 8px;
  }
}
</style>
