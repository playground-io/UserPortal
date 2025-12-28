<script setup>
import { useSidebar } from '@/composables/useSidebar'
import TheSidebar from './TheSidebar.vue'
import TheToolbar from './ToolBar.vue'
import TheStatusBar from './StatusBar.vue'

const { isOpen, close } = useSidebar()
</script>

<template>
  <div class="app-shell">
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="backdrop" @click="close"></div>
      </Transition>
      <TheSidebar />
    </Teleport>

    <TheToolbar />

    <main class="content-area">
      <slot /> </main>

    <TheStatusBar />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f3f2f1; /* Light grey Azure content background */
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

/* Transition for Backdrop */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>