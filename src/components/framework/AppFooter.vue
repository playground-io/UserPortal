<script setup>
import { ref, defineAsyncComponent } from 'vue'
import spinner from '@/components/core/LoadingSpinner.vue'
import SlidingDrawer from '@/components/extensions/SlidingDrawer.vue'
import StatusBar from '@/components/layout/StatusBar.vue'
//import DrawerTable from '../views/DrawerTable.vue';
import { useDrawerStore } from '@/stores/useDrawerStore'

const drawerStore = useDrawerStore()
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const DrawerTable = defineAsyncComponent({
  loader: async () => {
    // 1. Wait for 2 seconds
    await sleep(10000)
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
    <SlidingDrawer v-if="drawerStore.getLayout()">
      <DrawerTable />
    </SlidingDrawer>
    <StatusBar />
  </footer>
</template>

<style lang="scss" scoped>
.footer-container {
  display: block;
}
</style>
