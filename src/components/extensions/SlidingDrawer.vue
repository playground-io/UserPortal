<script setup>
import { useSplitterStore } from '@/stores/useSplitterStore'
import { useDrawerStore } from '@/stores/useDrawerStore'

const props = defineProps(['isOpen', 'drawerHeight']);
const drawerStore = useDrawerStore()
const splitterStore = useSplitterStore()
</script>

<template>
  <Transition name="slide">
    <div class="sliding-drawer" v-if="props.isOpen">
      <slot></slot>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.sliding-drawer {
  background-color: rgb(237, 237, 237);
  height: v-bind('props.drawerHeight + "px"');
  overflow: hidden;
  

/* :class="{ 'close-drawer': !drawerStore.isOpen }"
  transition: height 0.1s ease;

  &.close-drawer {
    transition: height 0.3s ease;
    height: 0px !important; // !important ensures it overrides the v-bind when closed
  }*/
}
/* 1. Define the 'Active' state (the duration) */
.slide-enter-active, 
.slide-leave-active {
  transition: transform 3.35s ease-out, opacity 0.35s ease, height 0.35s ease;
}

/* 2. Define the 'Hidden' state (the Start and the End) */
.slide-enter-from, 
.slide-leave-to {
  //transform: translateY(100%); /* Slide it off-screen to the bottom */
  height: 0;
  opacity: 0;
}

/* 3. The 'Shown' state (Optional, as elements usually default to this) */
.slide-enter-to, 
.slide-leave-from {
  //transform: translateY(0);
  height: v-bind('splitterStore.bottomHeight + "px"');
  opacity: 1;
}

</style>
