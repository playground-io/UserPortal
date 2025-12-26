<script setup>
import ToolBar from '@/components/features/ToolBar.vue'

</script>

<template>
  <header class="header-container">
    <ToolBar v-bind="$attrs"/>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  display: block;
}
</style>
