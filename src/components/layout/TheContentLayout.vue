<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useOverlaySidebar } from '@/composables/useOverlaySidebar.js'

const { isExpanded, toggleSidebar } = useOverlaySidebar()


const state = ref({
  count: 0,
})

const cpuUsage = ref(0)
let timer = null

onMounted(() => {
  console.log('Monitor started: Connecting to server...')

  // 1. Start a timer to fetch data every 2 seconds
  timer = setInterval(() => {
    cpuUsage.value = Math.floor(Math.random() * 100)
  }, 2000)
})

onUnmounted(() => {
  console.log('Monitor stopped: Cleaning up resources.')

  // 2. CRITICAL: Stop the timer so it doesn't run in the background forever
  clearInterval(timer)
})
</script>

<template>
  <div>
    <TheTicketManager />
    <TheOverlaySidebar />
    
    <div v-if="isExpanded" class="overlay" @click="toggleSidebar"></div>
    <button @click="state.count++" :disabled="state.count >= 10">
      {{ state.count }}
    </button>
    <div>Current CPU Load: {{ cpuUsage }}%</div>
    <button @click="isOpen=true">Open Sidebar</button>
  </div>
  <div class="layout-wrapper">
    <div v-if="isOpen" class="backdrop" @click="close"></div>
  </div>
</template>

<style lang="scss" scoped>
  
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90; /* Just below the sidebar */
}

.app-body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
