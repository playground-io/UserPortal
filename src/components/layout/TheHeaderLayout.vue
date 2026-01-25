<script setup>
import Toolbar from '@/components/features/Toolbar.vue'

</script>

<template>
  <header class="header-container">
    <Toolbar v-bind="$attrs"/>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  display: block;
}
</style>
