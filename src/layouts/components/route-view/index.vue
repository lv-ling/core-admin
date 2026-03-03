<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component, route: currentRoute }">
    <KeepAlive>
      <component
        :is="Component"
        v-if="currentRoute.meta?.keepAlive !== false"
        :key="String(currentRoute.name ?? currentRoute.path)"
      />
    </KeepAlive>
    <component
      :is="Component"
      v-if="currentRoute.meta?.keepAlive === false"
      :key="currentRoute.fullPath"
    />
  </router-view>
</template>
