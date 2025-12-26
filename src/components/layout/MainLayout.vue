<script setup>
import { ref } from 'vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutContent from '@/components/layout/LayoutContent.vue'
import LayoutSeparator from '@/components/layout/LayoutSeparator.vue'
import LayoutFooter from '@/components/layout/LayoutFooter.vue'

const isExtended = ref(false);
const isOpened = ref(false);
const separatorHeight = ref(0);
const separatorTitle = ref('');

</script>

<template>
  <div
    class="global-container" 
    :class="{ extended: isExtended }">
    <LayoutHeader
      v-model:isExtended="isExtended"
      v-model:isOpened="isOpened"
      v-model:separatorTitle="separatorTitle" />
    <LayoutContent />
    <LayoutSeparator
      v-if="isExtended"
      v-model:separatorHeight="separatorHeight"
      v-model:separatorTitle="separatorTitle" />
    <LayoutFooter
      :isOpen="isOpened"
      :separatorHeight="separatorHeight" />
  </div>
</template>

<style lang="scss" scoped>
.global-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  overflow: hidden;
  height: 100%;

  &.extended {
    grid-template-rows: auto 1fr auto auto;
  }
}
</style>