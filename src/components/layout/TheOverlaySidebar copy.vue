<script>
  const velasticLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    <linearGradient id="c"><stop offset="0" stop-color="#42D392"></stop><stop offset="1" stop-color="#0F5A3E"></stop></linearGradient>
    <linearGradient id="b"><stop offset="0" stop-opacity="60%"></stop><stop offset="0.1" stop-opacity="60%"></stop><stop offset="0.3" stop-opacity="60%"></stop><stop offset="0.6" stop-opacity="65%"></stop><stop offset="1" stop-opacity="60%"></stop></linearGradient>
    <linearGradient id="a"><stop offset="0" stop-color="#64FFDA"></stop><stop offset="1" stop-color="#42D392"></stop></linearGradient>
    <path d="M 269.177 -2.312 L 505.682 -2.312 L 260.165 770.417 C 258.908 774.365 257.083 778.078 254.748 781.427 C 252.421 784.779 249.614 787.717 246.427 790.146 C 243.239 792.575 239.722 794.462 235.986 795.736 C 232.249 797.009 228.352 797.666 224.436 797.666 L 40.374 797.666 C 34.4 797.666 28.504 796.159 23.189 793.254 C 17.868 790.356 13.275 786.153 9.792 780.992 C 6.305 775.832 4.024 769.866 3.137 763.586 C 2.248 757.307 2.786 750.889 4.696 744.874 L 233.437 24.916 C 234.687 20.972 236.514 17.259 238.853 13.907 C 241.181 10.554 243.998 7.617 247.176 5.188 C 250.363 2.759 253.88 0.871 257.617 -0.402 C 261.353 -1.675 265.25 -2.333 269.166 -2.333 L 269.166 -2.322 L 269.177 -2.312 Z" fill="url(#a)" style="transform-origin: 400px 400px;" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
    <path d="M 506.6 -2.316 L 260.333 769.68 C 259.153 773.245 257.535 776.629 255.518 779.736 C 251.471 785.988 245.94 790.991 239.482 794.236 C 236.266 795.851 232.862 797.003 229.359 797.662 L 40.548 797.662 C 34.518 797.683 28.558 796.155 23.198 793.207 C 12.308 787.228 4.848 775.992 3.198 763.094 C 2.388 756.736 3.028 750.265 5.068 744.223 L 233.436 25.454 C 234.625 21.434 236.412 17.647 238.732 14.232 C 241.04 10.816 243.857 7.804 247.055 5.321 C 250.252 2.84 253.808 0.909 257.575 -0.384 C 261.341 -1.679 265.289 -2.337 269.255 -2.316 L 506.61 -2.316 L 506.6 -2.316 Z" fill="url(#b)" style="transform-origin: 400px 400px;" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
    <path d="M 800.738 744.876 C 802.646 750.894 803.185 757.307 802.307 763.588 C 801.417 769.866 799.14 775.83 795.662 780.993 C 788.592 791.456 777.207 797.662 765.078 797.668 L 574.557 797.668 C 560.848 794.502 556.629 789.632 552.659 784.161 C 548.689 778.69 543.706 765.639 541.314 758.094 C 538.921 750.548 539.084 750.891 537.175 744.876 L 308.423 24.897 C 305.905 16.967 301.107 10.075 294.705 5.19 C 291.527 2.761 288.011 0.883 284.284 -0.39 C 280.557 -1.662 276.661 -2.31 272.755 -2.31 L 536.336 -2.31 C 540.252 -2.31 544.138 -1.662 547.876 -0.39 C 551.602 0.883 555.12 2.771 558.307 5.19 C 561.484 7.618 564.292 10.556 566.619 13.898 C 568.947 17.239 570.766 20.952 572.025 24.897 L 800.778 744.876 L 800.738 744.876 Z" fill="url(#c)" style="transform-origin: 400px 400px;" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
  </svg>`;
</script>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import Sortable from 'sortablejs';
  import { useOverlaySidebar } from '@/composables/useOverlaySidebar';
  import { useLocalStoragePersist } from '@/composables/useLocalStoragePersist';

  const initialMenu = ref([
    { id: 1, icon: '🏠', label: 'Home', canDrag: false, callModule: 'link' },
    { id: 2, icon: '📊', label: 'Dashboard', canDrag: false, callModule: 'link' },
    { id: 3, icon: '🛠️', label: 'All Services', canDrag: false, callModule: 'link' },
    { id: 4, icon: '📦', label: 'All Resources', canDrag: true, callModule: 'link' },
    { id: 5, icon: '💳', label: 'Subscriptions', canDrag: true, callModule: 'link' },
    { id: 6, icon: '💻', label: 'Virtual Machines', canDrag: true, callModule: 'link' },
    { id: 7, icon: '💾', label: 'Storage', canDrag: true, callModule: 'link' },
    { id: 8, icon: '🌐', label: 'Networks', canDrag: true, callModule: 'link' },
    { id: 10, icon: '🎧', label: 'Support', canDrag: true, callModule: 'link' }
  ]);

  const { isOpen, sidebarClose, handleItemClick } = useOverlaySidebar();
  const { items: sidebarMenu, persistOrder } = useLocalStoragePersist(initialMenu, 'sidebarMenuOrderId');

  // Split logic
  const staticItems = computed(() => sidebarMenu.value.filter(item => !item.canDrag));
  const draggableItems = computed(() => sidebarMenu.value.filter(item => item.canDrag));

  const scrollAreaRef = ref(null);
  const isDragging = ref(false);

  onMounted(() => {
    if (scrollAreaRef.value) {
      Sortable.create(scrollAreaRef.value, {
        animation: 200,
        handle: '.sidebar-drag-handle', // Users grab the handle to move
        ghostClass: 'sidebar-ghost',    // Style for the drop placeholder
        chosenClass: 'sidebar-chosen',  // Style for the element being moved
        onStart: () => { 
          isDragging.value = true; 
        },
        onEnd: (evt) => {
          isDragging.value = false;
          
          // Reorder the local array based on Sortable indices
          const newDraggableOrder = [...draggableItems.value];
          const [movedItem] = newDraggableOrder.splice(evt.oldIndex, 1);
          newDraggableOrder.splice(evt.newIndex, 0, movedItem);

          // Update the main menu and persist
          sidebarMenu.value = [
            ...staticItems.value,
            ...newDraggableOrder
          ];
          persistOrder();
        }
      });
    }
  });
</script>

<template>
  <Transition name="backdrop-fade">
    <div v-if="isOpen" class="overlay-backdrop" @click="sidebarClose()">
      <div class="overlay-logo" v-html="velasticLogo"></div>
    </div>
  </Transition>

  <aside class="sidebar" :class="{ 'is-open': isOpen, 'is-currently-dragging': isDragging }">
    <div class="sidebar-header" @click="sidebarClose()">
      <div class="sidebar-brand">
        <div class="sidebar-menubtn">
          <div></div>
          <div></div>
        </div>
        <span class="sidebar-brand-text">Axians <strong>Velastic</strong></span>
      </div>
    </div>
    
    <div class="sidebar-static-area">
      <div v-for="item in staticItems" :key="item.id" class="sidebar-static-row">
        <div class="sidebar-item" @click="handleItemClick(item)">
          <div class="sidebar-item-text">
            <span class="sidebar-icon">{{ item.icon }}</span>
            <span class="sidebar-label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section-divider">
      <span class="sidebar-divider-text">Services</span>
    </div>

    <div ref="scrollAreaRef" class="sidebar-scroll-area">
      <div v-for="item in draggableItems" :key="item.id" class="sidebar-scroll-row">
        <div class="sidebar-item" @click="handleItemClick(item)">
          <div class="sidebar-item-text">
            <span class="sidebar-icon">{{ item.icon }}</span>
            <span class="sidebar-label">{{ item.label }}</span>
          </div>
          <div class="sidebar-drag-handle">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.overlay-backdrop {
  position: fixed; top: 0;
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
  background: var(--backdrop-color);
  backdrop-filter: blur(2px) saturate(50%) contrast(50%);
  -webkit-backdrop-filter: blur(2px) saturate(50%) contrast(50%);
  z-index: 1000;
}

.overlay-logo { width: 150px; height: 150px; }

.backdrop-fade-enter-active, .backdrop-fade-leave-active { transition: opacity var(--transition-medium) ease; }
.backdrop-fade-enter-from, .backdrop-fade-leave-to { opacity: 0; }

.sidebar {
  position: fixed; top: 0; left: 0; bottom: 0;
  display: flex; flex-direction: column;
  width: 225px;
  background: var(--sidebar-bg);
  color: var(--text-primary);
  user-select: none;
  transform: translateX(-100%);
  transition: transform var(--transition-fast) ease-in;
  z-index: 1001;
}

.sidebar.is-open { transform: translateX(0); }

.sidebar-header { min-height: 60px; cursor: pointer; }
.sidebar-header:hover { background: var(--sidebar-hover); }

.sidebar-brand { display: flex; align-items: center; height: 100%; }
.sidebar-menubtn { position: relative; padding-left: 15px; }
.sidebar-menubtn div:nth-child(1) { position: absolute; top: 0; width: 18px; height: 2px; background-color: var(--text-primary); transform: rotate(45deg); }
.sidebar-menubtn div:nth-child(2) { position: absolute; top: 0; width: 18px; height: 2px; background-color: var(--text-primary); transform: rotate(-45deg); }

.sidebar-brand-text { font-size: 1.7rem; color: var(--text-primary); padding-left: 40px; }
.sidebar-brand-text strong { color: var(--green-velastic); font-weight: 600; }

.sidebar-static-area { padding-top: 30px; padding-bottom: 20px; }
.sidebar-scroll-area { flex: 1; padding-top: 20px; overflow-y: auto; overflow-x: hidden; position: relative; }

.sidebar-section-divider { display: flex; align-items: center; padding-left: 12px; }
.sidebar-section-divider::after { content: ""; background: var(--sidebar-divider); flex: 1; height: 1px; margin: 0 10px; }
.sidebar-divider-text { font-size: 1.1rem; color: var(--text-dim); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05rem; }

.sidebar-item {
  display: flex; align-items: center; justify-content: space-between;
  height: 32px;
  border-left: 5px solid transparent;
  transition: background-color var(--transition-fast) ease;
}

.sidebar-item-text { display: flex; align-items: center; width: 100%; height: 100%; gap: 15px; cursor: pointer; }
.sidebar-icon { padding-left: 15px; font-size: 1.5rem; }
.sidebar-label { font-size: 1.3rem; }

.sidebar-drag-handle {
  display: flex; align-items: center; justify-content: center; flex-direction: column;
  height: 100%; aspect-ratio: 1/1;
  opacity: 0; gap: 4px; cursor: grab;
}

.sidebar-drag-handle div { width: 2px; height: 2px; background-color: var(--text-dim); }
.sidebar-item:hover .sidebar-drag-handle { opacity: 1; }
.sidebar-drag-handle:active { cursor: grabbing; }

/* SortableJS Classes */
.sidebar-ghost {
  opacity: 0.4;
  background-color: var(--sidebar-gap-bg) !important;
  border: 1px dashed var(--green-velastic);
}

.sidebar-chosen {
  background-color: var(--sidebar-hover);
}

.sidebar:not(.is-currently-dragging) .sidebar-item:hover { background: var(--sidebar-hover); }

/* Scrollbar Styling */
.sidebar-scroll-area::-webkit-scrollbar { width: 8px; }
.sidebar-scroll-area::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 4px; }
.sidebar-scroll-area:hover::-webkit-scrollbar-thumb { background-color: var(--sidebar-hover); }
</style>