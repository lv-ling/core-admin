<script setup lang="ts">
import {
  WelcomeHeader,
  ProductShortcuts,
  WorkItems,
  IterationProgress,
  WorkSummary,
  MyProjects,
  MyRepos,
} from './components'
</script>

<template>
  <div class="dashboard-page">
    <WelcomeHeader />
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
</style>
