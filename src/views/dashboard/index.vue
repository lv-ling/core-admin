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
import { PageWrap } from '@/components'
</script>

<template>
  <PageWrap>
    <div class="sticky top-0 z-[9] bg-[var(--layout-content-bg)] p-2 shadow-md">
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
  </PageWrap>
</template>
