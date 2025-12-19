<script setup>
import SlidingDrawer from '@/components/extensions/SlidingDrawer.vue';
import StatusBar from '@/components/layout/StatusBar.vue';
import { useDrawerStore } from '@/stores/useDrawerStore';

const drawerStore = useDrawerStore();
</script>

<template>
  <footer class="footer-container">
    <SlidingDrawer v-if="drawerStore.getLayout()" />
    <StatusBar />
  </footer>
</template>

<style lang="scss" scoped>
.footer-container {
  display: block;
}
</style>