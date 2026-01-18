<script setup>
const appVersion = import.meta.env.VITE_APP_VERSION
</script>

<template>
  <footer class="status-bar">
    <span>System Status: Online</span>
    <span>v{{ appVersion }}</span>
  </footer>
</template>

<style scoped>
.status-bar { height: 24px; background: #004578; color: white; font-size: 11px; display: flex; justify-content: space-between; align-items: center; padding: 0 12px; }
</style>