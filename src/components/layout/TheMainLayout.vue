<script setup>
import { ref } from 'vue';
import LayoutHeader from '@/components/layout/TheHeaderLayout.vue'
import LayoutContent from '@/components/layout/TheContentLayout.vue'
import LayoutSeparator from '@/components/layout/TheSeparatorLayout.vue'
import LayoutFooter from '@/components/layout/TheFooterLayout.vue'

const isExtended = ref(false);
const isOpened = ref(false);
const separatorHeight = ref(200);
const separatorTitle = ref('');

</script>

<template>
  <div
    class="global-container" >
    <LayoutHeader
      v-model:isExtended="isExtended"
      v-model:isOpened="isOpened"
      v-model:separatorTitle="separatorTitle" />
    <LayoutContent />
    <LayoutSeparator
      :isExtended="isExtended"
      :separatorTitle="separatorTitle"
      v-model:separatorHeight="separatorHeight" />
    <LayoutFooter
      :isOpen="isOpened"
      :separatorHeight="separatorHeight" />
  </div>
</template>

<style lang="scss" scoped>
.global-container {
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  grid-template-columns: 1fr;
  overflow: hidden;
  height: 100%;
}
</style>



