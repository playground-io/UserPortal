<script setup>
import { defineAsyncComponent } from 'vue'
import spinner from '@/components/core/LoadingBar.vue'
import SlidingDrawer from '@/components/extensions/SlidingDrawer.vue'
import StatusBar from '@/components/features/StatusBar.vue'

const props = defineProps(['isOpen', 'separatorHeight']);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const DrawerTable = defineAsyncComponent({
  loader: async () => {
    // 1. Wait for 2 seconds
    await sleep(1000)
    // 2. Then proceed with the import
    return import('@/components/views/DrawerTable.vue')
  },
  loadingComponent: spinner,
  delay: 10,
  errorComponent: console.log('Error loading component'),
  timeout: 20000,
})
</script>

<template>
  <footer class="footer-container">
    <SlidingDrawer
      :isOpen="props.isOpen"
      :drawerHeight="props.separatorHeight">
      <DrawerTable />
    </SlidingDrawer>
    <StatusBar />
  </footer>
</template>

<style lang="scss" scoped>
.footer-container {
  display: block;
  position: relative;
}


</style>
