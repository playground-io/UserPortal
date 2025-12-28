<script setup>
import { useResizable } from '@/composables/useResizable';

const drawerHeight = defineModel('separatorHeight');

const { isDragging, startDrag } = useResizable(drawerHeight, {
  axis: 'y',
  min: 100,
  max: 300,
  snapPoints: [100, 300],
  inverted: false // Useful if resizing from the right edge of the sidebar
});
</script>

<template>
  <div 
    class="drawer-handle" 
    :class="{ 'dragging': isDragging }"
    @pointerdown="startDrag">
    <div class="visual-affordance"></div>
  </div>
</template>

<style scoped>
.drawer-handle {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: row-resize;
  touch-action: none;
}

.visual-affordance {
  width: 30px;
  height: 2px;
  background: rgba(210, 210, 210);
  align-self: center;
  border-radius: 2px;
}

.dragging .visual-affordance {
  background: rgba(180, 180, 180);
  transform: scaleY(2);
}
</style>

<style>
/* Global Resizing Class */
.resizing-active {
  cursor: var(--resizer-cursor) !important;
  user-select: none !important;
}
</style>