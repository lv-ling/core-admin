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
  <div class="p-0">
    <div
      class="sticky top-0 z-[9] bg-[var(--layout-content-bg)] px-4 pb-4"
      style="margin: 0 -16px; box-shadow: 0 8px 0 var(--layout-content-bg)"
    >
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
