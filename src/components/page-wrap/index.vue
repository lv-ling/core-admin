<script setup lang="ts"></script>

<template>
  <ElCard class="page-wrap">
    <template v-if="$slots.header">
      <div class="page-header">
        <slot name="header" />
      </div>
    </template>
    <div class="page-container">
      <slot />
    </div>
  </ElCard>
</template>

<style scoped lang="scss">
.page-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .page-header {
    padding: 12px;
  }

  > :deep(.el-card__body) {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .page-container {
    flex: 1;
    width: 100%;
    padding: 12px;
  }
}
</style>
