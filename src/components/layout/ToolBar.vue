<script setup>
import { useSidebar } from '@/composables/useSidebar'
const { toggle } = useSidebar()
</script>

<template>
  <header class="toolbar">
    <button class="menu-btn" @click="toggle">☰</button>
    <div class="title">My App</div>
  </header>
</template>

<style scoped>
.toolbar {
  height: 48px;
  background: #0078d4; /* Azure primary blue */
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
</style>