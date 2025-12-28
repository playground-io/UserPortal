<script setup>
import { useSidebar } from '@/composables/useSidebar'
const { isOpen, close } = useSidebar()

const menuItems = [
  { icon: '🏠', label: 'Home' },
  { icon: '📊', label: 'Dashboard' },
  { icon: '📦', label: 'All resources' },
  { icon: '⚙️', label: 'Settings' }
]
</script>

<template>
  <aside class="azure-sidebar" :class="{ 'is-open': isOpen }">
    <div class="sidebar-header">
      <div class="hamburger-close" @click="close">✕</div>
      <span class="brand">Microsoft Azure</span>
    </div>

    <nav class="sidebar-nav">
      <div v-for="item in menuItems" :key="item.label" class="nav-item">
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.azure-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background-color: #252423;
  color: white;
  z-index: 1001;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.5);
  
  /* Optimization: GPU acceleration */
  transform: translateX(-100%);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.azure-sidebar.is-open {
  transform: translateX(0);
}

.sidebar-header {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #1b1a19;
}

.hamburger-close {
  cursor: pointer;
  font-size: 20px;
  margin-right: 20px;
}

.brand {
  font-size: 14px;
  font-weight: 600;
}

.sidebar-nav {
  padding-top: 10px;
}

.nav-item {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: #3b3a39;
}

.nav-item:active {
  border-left-color: #0078d4;
  background-color: #484644;
}

.nav-icon {
  width: 24px;
  font-size: 18px;
}

.nav-label {
  margin-left: 12px;
  font-size: 13px;
}
</style>