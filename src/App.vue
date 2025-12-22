<script setup>
import AppHeader from '@/components/framework/AppHeader.vue'
import AppContent from '@/components/framework/AppContent.vue'
import AppSeparator from '@/components/framework/AppSeparator.vue'
import AppFooter from '@/components/framework/AppFooter.vue'

import { useDrawerStore } from '@/stores/useDrawerStore'

const drawerStore = useDrawerStore()
</script>

<template>
  <div class="global-container" :class="{ extended: drawerStore.getLayout() }">
    <AppHeader />
    <AppContent />
    <AppSeparator v-if="drawerStore.getLayout()" />
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.global-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  overflow-y: hidden;
  height: 100%;

  &.extended {
    grid-template-rows: auto 1fr auto auto;
  }
}
</style>
