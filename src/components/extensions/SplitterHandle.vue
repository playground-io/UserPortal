<script setup>
import { ref, onUnmounted } from 'vue'
import { useSplitterStore } from '@/stores/useSplitterStore'

const splitterStore = useSplitterStore()
const separatorHeight = defineModel('separatorHeight');

// --- Snap Configuration ---
const SNAP_OFFSET = 50 // Pixels distance to snap
const SNAP_POINTS = [
  0, 100, 300,
  //window.innerHeight * 0.5,
  //window.innerHeight * 0.9
]
// -------------------------

const appElement = document.getElementById('app')
if (appElement) {
  // Add the class to the root element's class list
  console.log("Class 'resizing' added to #app.")
} else {
  console.error("Element with ID 'app' not found in the DOM.")
}

// Internal State
const isDragging = ref(false)
const startY = ref(0)
const startHeight = ref(0)

const startDrag = (e) => {
  isDragging.value = true
  startY.value = e.clientY
  startHeight.value = separatorHeight.value //splitterStore.bottomHeight
  console.log(startY.value, isDragging.value, startHeight.value)
  // Add styling to body to prevent text selection
  appElement.classList.add('resizing')

  //  document.body.classList.add('resizing');

  // Attach global listeners
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  //emit('dragStart');
}

/*  const onDrag = (e) => {
    if (!isDragging.value) return;

    // Calculate delta (Movement UP means positive delta for bottom height)
    const deltaY = startY.value - e.clientY;
    const newHeight = startHeight.value + deltaY;

    // Constraints (Min 100px, Max 80% of window height)
    const minHeight = 100;
    const maxHeight = window.innerHeight * 0.8;
    
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      emit('update:modelValue', newHeight);
      store.bottomHeight = newHeight;
      
    }
  };*/

const onDrag = (e) => {
  if (!isDragging.value) return
  const deltaY = startY.value - e.clientY
  let newHeight = startHeight.value + deltaY // Changed to 'let'
  // 1. Apply Snap Logic
  for (const snapPoint of SNAP_POINTS) {
    if (Math.abs(newHeight - snapPoint) <= SNAP_OFFSET) {
      newHeight = snapPoint // Snap to the exact point
      break
    }
  }
  // 2. Apply Hard Constraints
  const minHeight = 0
  const maxHeight = 600 //window.innerHeight * 0.8;

  // Ensure newHeight respects hard min/max constraints
  const finalHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))
  // 3. Update Model
  //if (props.modelValue !== finalHeight) {
  //if (splitterStore.getBottomHeight !== finalHeight) {
  if (separatorHeight.value !== finalHeight) {
    //emit('update:modelValue', finalHeight);
    //splitterStore.setBottomHeight(finalHeight)
    separatorHeight.value = finalHeight;
  }
  console.log('log', separatorHeight.value)
}

const stopDrag = () => {
  if (isDragging.value) {
    isDragging.value = false
    //document.body.classList.remove('resizing');
    appElement.classList.remove('resizing')
    //emit('dragEnd');
  }

  // Clean up listeners
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div @mousedown="startDrag"></div>
</template>

<style scoped></style>
