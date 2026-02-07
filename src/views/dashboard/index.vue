<script setup lang="ts">
import {
  WelcomeHeader,
  ProductShortcuts,
  WorkItems,
  IterationProgress,
  WorkSummary,
  MyProjects,
  MyRepos,
} from "./components";
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-page__sticky-header">
      <WelcomeHeader />
    </div>
    <ProductShortcuts />
    <ElRow :gutter="16">
      <ElCol :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
        <WorkItems />
        <IterationProgress />
      </ElCol>
      <ElCol :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <WorkSummary />
        <MyProjects />
        <MyRepos />
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 0;
}
.dashboard-page__sticky-header {
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: var(--layout-content-bg);
  box-shadow: 0 8px 0 var(--layout-content-bg);
}
</style>
