<script setup>
import SvgToIcon from '@/components/core/SvgToIcon.vue'
</script>

<template>
  <div class="loading">
    <SvgToIcon name="spinner_anime2" size="30" />
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: blue;
}
</style>
