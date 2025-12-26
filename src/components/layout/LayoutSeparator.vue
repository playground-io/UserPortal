<script setup>
import SvgToIcon from '@/components/core/SvgToIcon.vue'
import SplitterHandle from '@/components/extensions/SplitterHandle.vue'

const separatorHeight = defineModel('separatorHeight');
const separatorTitle = defineModel('separatorTitle');

</script>

<template>
  <div class="separator-container">
    <div class="separator-left">
      <div class="separator-title">
        {{ separatorTitle }}
      </div>
    </div>
    <div class="separator-center">
      <SvgToIcon name="separator" :size=18 />
    </div>
    <div class="separator-right"></div>
    <SplitterHandle
      class="splitter-handle"
      v-model:separatorHeight="separatorHeight" />
  </div>
</template>

<style lang="scss" scoped>
.separator-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  cursor: ns-resize;
  background-color: white;
  border-top: 1px rgba(230, 230, 230) solid;
  transition: background-color var(--transition-fast) ease;
  color: #1c1c1c;

  &:hover,
  &:active {
    background-color: rgba(240, 240, 240); //var(--splitter-bg-hover);
  }
  &:hover .separator-center,
  &:active .separator-center {
    color: rgba(160, 160, 160); //var(--splitter-bg-hover);
  }

  & .separator-left {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 20px;

    & .separator-title {
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      color: #1c1c1c;    
    }
  }

  & .separator-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(230, 230, 230);
    transition: background-color var(--transition-fast) ease;
  }

  & .separator-rigth {
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 0 20px;
  }

  & .splitter-handle {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
