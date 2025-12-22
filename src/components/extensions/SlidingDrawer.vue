<script setup>
import { useSplitterStore } from '@/stores/useSplitterStore'
import { useDrawerStore } from '@/stores/useDrawerStore'

const drawerStore = useDrawerStore()
const splitterStore = useSplitterStore()
</script>

<template>
  <div class="sliding-drawer" :class="{ 'close-drawer': !drawerStore.isOpen }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.sliding-drawer {
  background-color: rgb(237, 237, 237);
  height: v-bind('splitterStore.bottomHeight + "px"');
  transition: height 0.1s ease;

  &.close-drawer {
    transition: height 0.3s ease;
    height: 0px !important; // !important ensures it overrides the v-bind when closed
  }
}
</style>
