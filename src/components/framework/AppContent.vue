<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

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
    <button @click="state.count++" :disabled="state.count >= 10">
      {{ state.count }}
    </button>
    <div>Current CPU Load: {{ cpuUsage }}%</div>
  </div>
</template>

<style lang="scss" scoped></style>
