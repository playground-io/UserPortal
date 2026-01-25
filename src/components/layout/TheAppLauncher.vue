<script setup>
import { computed } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useToolbarButtonStore } from '@/stores/useToolbarButtonStore';

import spriteUrl from '@/assets/icons/app-icons.svg?url'
import { APPS_LAUNCHER } from '@/config/apps.config';

// Initialize the Store
const toolbarButtonStore = useToolbarButtonStore();
// Destructure refs to use them directly in the template
const { activeLauncher } = storeToRefs(toolbarButtonStore);
// Use actions directly from the store
const { closeAll } = toolbarButtonStore;

// List of applications to display in the launcher
const apps = APPS_LAUNCHER;

// Computed property to check if the launcher is open
const isLauncherOpen = computed(() => activeLauncher.value === 'btnA');

// Close the launcher on 'Escape' key press
onKeyStroke('Escape', () => closeAll());

// Function to get the full icon URL
const getIcon = (iconName) => {
  return `${spriteUrl}#${iconName}`;
}

// Function to handle app launch
function handleAppLaunch(app) {
  // Close the sidebar and backdrop first
  closeAll();
  // Check if the app object has a 'url' property
  if (app.url) {
    // Open in a new tab with security best practices
    window.open(app.url, '_blank', 'noopener,noreferrer');
    console.log(`Opening external service: ${app.label}`);
  } else {
    // Handle internal navigation or other logic
    console.log(`Internal service selected: ${app.label}`);
    // router.push(app.path); // Example if using Vue Router
  }
}
</script>

<template>
  <Transition name="launcher-slide">
    <aside
      v-if="isLauncherOpen"
      class="launcher-panel"
    >
      <header class="launcher-header">
        <h3>Apps Launcher</h3>
      </header>
      <div class="launcher-grid">
        <div 
          v-for="(item, index) in apps" 
          :key="item.id"
          @click="handleAppLaunch(item)"
          class="launcher-item"
        >
          <div class="item-icon">
            <svg class="launcher-svg">
              <use :href="getIcon(item.iconName)" />
            </svg>
          </div>
          <span class="item-label">{{ item.label }}</span>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped lang="scss">
.launcher-panel {
  display: flex; flex-direction: column;
  position: fixed; top: var(--toolbar-height); left: 0;
  min-width: 540px;
  background: var(--launcher-bg);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px, rgba(0, 0, 0, 0.24) 0px 14px 28.8px;
  border-radius: 2px;
  z-index: 1001;
}

/* Transition Classes */
.launcher-slide-enter-active,
.launcher-slide-leave-active {
  transition: transform var(--transition-medium) ease-out;
}

/* The "Hidden" state */
.launcher-slide-enter-from,
.launcher-slide-leave-to {
  transform: translateY(-100%);
}

/* The "Open" state */
.launcher-slide-enter-to,
.launcher-slide-leave-from {
  transform: translateY(0);
}

.launcher-header {
  display: flex; align-items: center; justify-content: center;
  padding-top: 20px;
  
  h3 {
    margin: 0; font-weight: 600; font-size: 1.6rem;
  }
}

.launcher-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 20px;
}

.launcher-item {
  display: flex; align-items: center; flex-direction: column;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color var(--transition-fast) ease-in-out;

  &:hover { background-color: var(--launcher-item-hover-bg); }

  .item-label {
    color: var(--text-secondary);
    font-weight: 100;
    font-size: 1.3rem;
  }

  .item-icon {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px;
    background-color: var(--launcher-item-bg);
    margin-bottom: 2px;
    border-radius: 4px;

    .launcher-svg { 
      width: 24px;
      height: 24px;
      stroke: none;
      stroke-width: 1;
      stroke-linecap: round;
      stroke-linejoin: round;  
    }
  }
}
</style>