<script setup>
import { storeToRefs } from 'pinia';
import { useToolbarButtonStore } from '@/stores/useToolbarButtonStore';
import VelasticLogo from '@/assets/images/velastic-logo.svg'

// Initialize the Store
const toolbarButtonStore = useToolbarButtonStore();
// Use actions directly from the store
const { closeAll } = toolbarButtonStore;
// Destructure refs to use them directly in the template
const { isBackdropOpen } = storeToRefs(toolbarButtonStore);
</script>

<template>
  <Transition name="backdrop-fade">
    <div 
      v-if="isBackdropOpen"
      class="overlay-backdrop"
      @click="closeAll()"
    >
      <VelasticLogo class="overlay-logo" />
      <span>{{ $t('backdrop.overlay.branding') }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-backdrop {
  position: fixed; top: 0;
  display: flex; align-items: center; justify-content: center; flex-direction: column;
  gap: 20px;
  font-size: 3rem;
  color: var(--text-dim);
  width: 100%; height: 100%;
  background: var(--backdrop-color);
  backdrop-filter: blur(2px) saturate(50%) contrast(50%);
  -webkit-backdrop-filter: blur(2px) saturate(50%) contrast(50%);
  user-select: none;
  z-index: 1000;
}

.overlay-logo {
  width: 150px; height: 150px;
  color: white;
}

.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity var(--transition-medium) ease;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}
</style>