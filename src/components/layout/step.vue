<script setup>
  import { useOverlaySidebar } from '@/composables/useOverlaySidebar';
  const { sidebarOpen } = useOverlaySidebar();
</script>

<template>
  <div>
    <button
      @click="sidebarOpen"
    >
      Open
    </button>
  </div>
</template>
