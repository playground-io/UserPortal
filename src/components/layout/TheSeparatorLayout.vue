<script setup>
import SplitterHandle from '@/components/extensions/SplitterHandle.vue'

const separatorHeight = defineModel('separatorHeight');
const props = defineProps(['isExtended', 'separatorTitle']);
</script>

<template>
  <div class="separator-element">
    <div v-if="props.isExtended" class="separator-container">
      <div class="separator-left">
        <div class="separator-title">
          {{ separatorTitle }}
        </div>
      </div>
      <div class="separator-center"></div>
      <div class="separator-right"></div>
      <SplitterHandle
        v-model:separatorHeight="separatorHeight" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.separator-element {
  position: relative;

  & .separator-container {
    display: flex;
    justify-content: space-between;
    background-color: rgba(245, 245, 245);
    border-top: 1px rgba(230, 230, 230) solid;
    transition: background-color var(--transition-fast) ease;
    color: #1c1c1c;

    &:hover,
    &:active {
      background-color: rgba(240, 240, 240); //var(--splitter-bg-hover);
    }

    & .separator-left {
      display: flex;
      justify-content: left;
      align-items: center;
      padding: 0 20px;

      & .separator-title {
        font-size: 1.4rem;
        font-weight: 600;
        text-transform: uppercase;
      }
    }

    & .separator-center {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
    }

    & .separator-right {
      display: flex;
      justify-content: right;
      align-items: center;
      padding: 0 20px;
    }
  }
}
</style>
