<script setup>
import SplitterHandle from '@/components/extensions/SplitterHandle.vue';
import SvgToIcon from '@/components/core/SvgToIcon.vue';
import { useDrawerStore } from '@/stores/useDrawerStore';

const drawerStore = useDrawerStore();
</script>

<template>
  <div class="separator-container">
    <div class="separator-left">
      <h3>{{drawerStore.getTitle()}}</h3>
    </div>
    <div class="separator-center">
      <SvgToIcon name="separator" :size=12 />
    </div>
    <div class="separator-right"></div> 
    <SplitterHandle />   
  </div>
</template>

<style lang=scss scoped>
.separator-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  cursor: row-resize;
  background-color: white;
  border-top: 1px rgba(237, 237, 237) solid;
  transition: background-color var(--transition-fast) ease;
  color: #1c1c1c;
  
  &:hover, &:active {
    background-color: rgba(237, 237, 237); //var(--splitter-bg-hover);
  }
  &:hover > .separator-center, &:active > .separator-center {
    color: rgb(92, 92, 92); //var(--splitter-bg-hover);
  }

  & h3 {
    margin: 0;
  }

  & > .separator-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(155, 155, 155);
    transition: background-color var(--transition-fast) ease;
    z-index: 10;
    margin: 5px;
  }

  & > .separator-left, & > .separator-rigth {
    display: flex;
    align-items: center;
    z-index: 20;
    padding: 0 25px;
  }
}
</style>