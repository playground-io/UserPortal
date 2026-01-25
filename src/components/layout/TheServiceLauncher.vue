<script setup>
  import { ref, computed, watch, nextTick } from 'vue';
  import { onKeyStroke } from '@vueuse/core';
  
  import Sortable from 'sortablejs'; // Using SortableJS https://github.com/SortableJS/Sortable?tab=readme-ov-file
  
  import { useLocalStoragePersist } from '@/composables/useLocalStoragePersist';
  import { SIDEBAR_MENU } from '@/config/menu.config';

  import { storeToRefs } from 'pinia';
  import { useToolbarButtonStore } from '@/stores/useToolbarButtonStore';
  
  // Initialize the Store
  const toolbarButtonStore = useToolbarButtonStore();
  // Destructure refs to use them directly in the template
  const { activeLauncher } = storeToRefs(toolbarButtonStore);
  // Use actions directly from the store
  const { closeAll, handleServiceClick } = toolbarButtonStore;

  watch(
  () => activeLauncher === 'btnB', // Getter function
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      initSortable();
      console.log('Services Menu opened, Sortable initialized.');
    }
  }
);

  onKeyStroke('Escape', () => closeAll());

  const initialMenu = ref(SIDEBAR_MENU);
  const { items: sidebarMenu, persistOrder } = useLocalStoragePersist( initialMenu, 'sidebarMenuOrderId');

  // Logical Split
  const staticItems = computed(() => sidebarMenu.value.filter(item => !item.canDrag));
  const draggableItems = computed(() => sidebarMenu.value.filter(item => item.canDrag));

  const scrollAreaRef = ref(null);
  const isDragging = ref(false);
  let sortableInstance = null; // Store the instance to clean it up

const initSortable = () => {
  if (scrollAreaRef.value) {
    // Destroy existing instance if it exists to prevent memory leaks
    if (sortableInstance) sortableInstance.destroy();

    sortableInstance = Sortable.create(scrollAreaRef.value, {
      group: "sidebarMenuOrder",
      store: {
        //get: function (sortable) {
        //  const order = localStorage.getItem(sortable.options.group.name);
        //  return order ? order.split(',') : [];
        //},
        //set: function (sortable) {
        //  const order = sortable.toArray(); // Returns array of data-id attributes
        //  localStorage.setItem(sortable.options.group.name, order.join(','));
          // api.saveOrder(order);
        //}
      },
      animation: 150,
      easing: "cubic-bezier(1, 0, 0, 1)",
      handle: '.sidebar-drag-handle', // Users grab the handle to move
      ghostClass: 'sidebar-ghost',    // Style for the drop placeholder
      chosenClass: 'sidebar-chosen',  // Style for the element being moved
      fallbackOnBody: true, // Better rendering for deep nested items
      swapThreshold: 0.1,  // Makes dropping feel "snappier"
      onStart: () => { isDragging.value = true; },
      onEnd: (evt) => {
        isDragging.value = false;
        // Get the current draggable list
        const newDraggableItems = [...draggableItems.value];
        // Move the item in the array
        const [movedItem] = newDraggableItems.splice(evt.oldIndex, 1);
        newDraggableItems.splice(evt.newIndex, 0, movedItem);
        // Update the full menu state
        sidebarMenu.value = [ ...staticItems.value, ...newDraggableItems ];
        persistOrder();
      }
    });
  }
};

</script>

<template>
  <Teleport to="body">
    <Transition name="sidebar-slide">
      <aside
        v-if="activeLauncher === 'btnB'"
        class="sidebar"
        :class="{ 'is-currently-dragging': isDragging }"
      >
        <!-- SIDEBAR HEADER -->
        <div class="sidebar-header"
          @click="closeAll()"
        >
          <div class="sidebar-brand">
            <div class="sidebar-menubtn">
              <div></div>
              <div></div>
            </div>
            <span class="sidebar-brand-text">Axians <strong>Velastic</strong></span>
          </div>
        </div>

        <!-- SIDEBAR STATIC AREA -->
        <div class="sidebar-static-area">
          <div class="sidebar-static-row"
            v-for="(item, index) in staticItems"
            :key="item.id"
          >
            <div class="sidebar-item"
              @click="handleServiceClick(item)"
            >
              <div class="sidebar-item-text">
                <span class="sidebar-icon">{{ item.icon }}</span>
                <span class="sidebar-label">{{ index }} {{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      
        <div class="sidebar-section-divider">
          <span class="sidebar-divider-text">Services</span>
        </div>
      
        <!-- SIDEBAR SCROLL AREA -->
        <div ref="scrollAreaRef"
          class="sidebar-scroll-area"
        >
          <div v-for="(item, index) in draggableItems"
            class="sidebar-scroll-row"
            :key="item.id"
            :data-id="item.id"
          >
            <div class="sidebar-item"
              @click="handleServiceClick(item)"
            >
              <div class="sidebar-item-text">
                <span class="sidebar-icon">{{ item.icon }}</span>
                <span class="sidebar-label">{{ index }} {{ item.id }} {{ item.label }}</span>
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
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar {
  position: fixed; top: 0; left: 0; bottom: 0;
  display: flex; flex-direction: column;
  width: 225px;
  background: var(--sidebar-bg);
  color: var(--text-primary);
  user-select: none;
  z-index: 1020;
}

/* Transition Classes */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform var(--transition-fast) ease-in;
}

/* The "Hidden" state */
.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}

/* The "Open" state */
.sidebar-slide-enter-to,
.sidebar-slide-leave-from {
  transform: translateX(0);
}

.sidebar-header {
  min-height: 60px;
}

.sidebar-header:hover {
  background: var(--sidebar-hover);
}

.sidebar-brand {
  display: flex; align-items: center;
  user-select: none;
  height: 100%;
}

.sidebar-menubtn {
  position: relative;
  padding-left: 15px;
}

.sidebar-menubtn div:nth-child(1) {
  position: absolute;
  top: 0;
  width: 16px;
  height: 1.5px;
  background-color: var(--text-primary);
  transform: rotate(45deg);
}

.sidebar-menubtn div:nth-child(2) {
  position: absolute;
  top: 0;
  width: 16px;
  height: 1.5px;
  background-color: var(--text-primary);
  transform: rotate(-45deg);
}

.sidebar-brand-text {
  font-size: 1.7rem;
  color: var(--text-primary);
  padding-left: 35px;
}

.sidebar-brand-text strong {
  color: var(--green-velastic);
  font-weight: 600;
}

.sidebar-static-area {
  padding-top: 30px;
  padding-bottom: 20px;
}

.sidebar-scroll-area {
  flex: 1;
  padding-top: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-static-row {
  padding-top: 4px;
}

.sidebar-section-divider {
  display: flex; align-items: center;
  padding-left: 12px;
}

.sidebar-section-divider::after {
  content: "";
  background: var(--sidebar-divider);
  flex: 1;
  height: 1px;
  margin: 0 10px;
}

.sidebar-divider-text {
  font-size: 1.1rem;
  color: var(--text-dim);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05rem;
}

.sidebar-scroll-row {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  display: flex; align-items: center; justify-content: space-between;
  height: 32px;
  border-left: 5px solid transparent;
  transition: background-color var(--transition-fast) ease;
}

.sidebar-item-text {
  display: flex; align-items: center;
  width: 100%; height: 100%;
  gap: 15px;
  cursor: pointer;
}

.sidebar-icon {
  padding-left: 15px;
  font-size: 1.5rem;
}

.sidebar-label {
  font-size: 1.3rem;
}

.sidebar-drag-handle {
  display: flex; align-items: center; justify-content: center; flex-direction: column;
  height: 100%; aspect-ratio: 1/1;
  opacity: 0;
  gap: 4px;
  cursor: grab;
}

.sidebar-drag-handle div:nth-child(n) {
  width: 2px; height: 2px;
  background-color: var(--text-dim);
}

.sidebar-drag-handle:hover div:nth-child(n) {
  background-color: var(--green-velastic);
}

.sidebar-drag-handle:active {
  cursor: grabbing;
}

.sidebar-item:hover .sidebar-drag-handle {
  opacity: 1;
}

/* Only allow the hover background if NO drag is in progress */
.sidebar-item:hover {
  background: var(--sidebar-hover);
}

/* Prevent the "neighbor" from showing the handle or border when it slides under the mouse */
.sidebar.is-currently-dragging .sidebar-item:not(.is-dragging) {
  pointer-events: none; /* This stops the neighbor from reacting to the mouse at all */
}

.sidebar-item:has(.sidebar-item-text:active) {
  border-left-color: var(--green-velastic);
  opacity: 0.5;
}

.sidebar-scroll-area {
  /*scrollbar-gutter: stable;*/
  /* Only apply to Firefox */
  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
}

.sidebar-scroll-area:hover {
  @supports not selector(::-webkit-scrollbar) {
    scrollbar-color: var(--sidebar-hover) transparent;
  }
}

.sidebar-scroll-area::-webkit-scrollbar {
  width: 8px;
}

.sidebar-scroll-area::-webkit-scrollbar-thumb {
  background-color: transparent; /* Start hidden */
  border-radius: 4px;
}

.sidebar-scroll-area:hover::-webkit-scrollbar-thumb {
  background-color: var(--sidebar-hover) !important;
}

.sidebar-scroll-area::-webkit-scrollbar-thumb:hover {
  background-color: var(--green-velastic) !important;
}

/* This handles the smooth sliding of items */
.item-transition-move {
  transition: all var(--transition-slow) cubic-bezier(0.55, 0, 0.1, 1);
}

/* SortableJS Classes */
.sidebar-ghost {
  opacity: 0.4;
  background-color: var(--sidebar-gap-bg) !important;
  border: 1px dashed var(--green-velastic);
}

.sidebar-chosen {
  background-color: var(--sidebar-hover);
}
</style>