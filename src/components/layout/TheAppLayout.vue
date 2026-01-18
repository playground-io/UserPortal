<script setup>
import { ref } from 'vue';
import TheHeaderLayout from '@/components/layout/TheHeaderLayout.vue';
import TheContentLayout from '@/components/layout/TheContentLayout.vue';
import TheSeparatorLayout from '@/components/layout/TheSeparatorLayout.vue';
import TheFooterLayout from '@/components/layout/TheFooterLayout.vue';

const isExtended = ref(false);
const isOpened = ref(false);
const separatorHeight = ref(200);
const separatorTitle = ref('');

</script>

<template>
  <div class="app-container" >
    <TheHeaderLayout fa:
      v-model:isExtended="isExtended"
      v-model:isOpened="isOpened"
      v-model:separatorTitle="separatorTitle" />
<!--    <TheContentLayout />
    <TheSeparatorLayout
      :isExtended="isExtended"
      :separatorTitle="separatorTitle"
      v-model:separatorHeight="separatorHeight" />
    <TheFooterLayout
      :isOpen="isOpened"
      :separatorHeight="separatorHeight" /> -->
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  grid-template-columns: 1fr;
  overflow: hidden;
  height: 100%;
}
</style>