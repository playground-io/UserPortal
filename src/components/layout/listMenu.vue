<template>
  <div class="list-container" @dragover.prevent>
    <div 
      v-for="(item, index) in items" 
      :key="item.id"
      class="item-wrapper"
    >
      <div 
        class="drop-gap" 
        :class="{ 'is-active': shouldShowGap(index) }"
        @dragenter="placeholderIndex = index"
        @drop="onDrop(index)"
      ></div>

      <div
        draggable="true"
        class="list-item"
        :class="{ 'is-dragging': dragIndex === index }"
        @dragstart="onDragStart(index)"
        @dragend="onDragEnd"
      >
        {{ item.text }}
      </div>
    </div>

    <div 
      class="drop-gap" 
      :class="{ 'is-active': shouldShowGap(items.length) }"
      @dragenter="placeholderIndex = items.length"
      @drop="onDrop(items.length)"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 1, text: 'Phase 1: Research' },
  { id: 2, text: 'Phase 2: Design' },
  { id: 3, text: 'Phase 3: Development' },
]);

const dragIndex = ref(null);
const placeholderIndex = ref(null);

const onDragStart = (index) => {
  dragIndex.value = index;
};

// Logic to determine if the gap should visually open
const shouldShowGap = (index) => {
  if (dragIndex.value === null || placeholderIndex.value === null) return false;
  
  // 1. Must be the current hovered gap
  if (placeholderIndex.value !== index) return false;

  // 2. Hide gap if it's directly ABOVE the dragging item
  if (index === dragIndex.value) return false;

  // 3. Hide gap if it's directly BELOW the dragging item
  if (index === dragIndex.value + 1) return false;

  return true;
};

const onDragEnd = () => {
  dragIndex.value = null;
  placeholderIndex.value = null;
};

const onDrop = (targetIndex) => {
  if (dragIndex.value === null) return;

  const itemToMove = items.value[dragIndex.value];
  const newItems = [...items.value];
  
  // Remove from old position
  newItems.splice(dragIndex.value, 1);
  
  // Adjust insertion index
  let insertAt = targetIndex;
  if (targetIndex > dragIndex.value) {
    insertAt = targetIndex - 1;
  }
  
  newItems.splice(insertAt, 0, itemToMove);
  items.value = newItems;
  
  onDragEnd();
};
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  user-select: none;
}

.list-item {
  padding: 16px;
  background: #2c3e50;
  color: white;
  border-radius: 6px;
  cursor: grab;
}

.list-item:active {
  background: #2c3e50;
  opacity: 1;
}

.is-dragging {
  opacity: 0.1; /* Make it very faint so the gap is the focus */
}

.drop-gap {
  height: 8px; /* Small buffer to catch the dragEnter event */
  transition: all 0.2s ease-in-out;
}

.drop-gap.is-active {
  height: 150px; /* The "Open" space */
  background: rgba(74, 144, 226, 0.1);
  border: 2px dashed #2a8eff;
  border-radius: 6px;
  margin: 4px 0;
}

</style>