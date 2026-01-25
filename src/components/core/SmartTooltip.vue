<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

const props = defineProps({
  text: String,
  active: Boolean
});

const referenceEl = ref(null); // The button
const floatingEl = ref(null);  // The tooltip
const arrowEl = ref(null);     // The little triangle

const updatePosition = () => {
  if (!referenceEl.value || !floatingEl.value) return;

  computePosition(referenceEl.value, floatingEl.value, {
    placement: 'bottom', // Default placement
    middleware: [
      offset(2),       // Space between button and tooltip
      flip(),         // If it hits the screen edge, flip to the other side
      shift({ padding: 5 }), // If it hits the corner, slide it slightly to stay visible
      arrow({ element: arrowEl.value }), // Handle the arrow position
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    // Apply styles to the tooltip
    Object.assign(floatingEl.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    // Handle the arrow position
    const { x: ax, y: ay } = middlewareData.arrow;
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];

    Object.assign(arrowEl.value.style, {
      left: ax != null ? `${ax}px` : '',
      top: ay != null ? `${ay}px` : '',
      [staticSide]: '-4px', // Offset arrow to sit on the edge
    });
  });
};

// Update position whenever the "active" state changes or window resizes
watchEffect(() => {
  if (props.active) {
    setTimeout(updatePosition, 0); // Wait for DOM render
  }
});

onMounted(() => {
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition);
});
</script>

<template>
  <div class="tooltip-container">
    <div ref="referenceEl" class="trigger">
      <slot></slot>
    </div>

    <Transition name="tooltip-fade">
      <div 
        v-if="active" 
        ref="floatingEl" 
        class="floating-tooltip"
      >
        {{ text }}
        <div ref="arrowEl" class="tooltip-arrow"></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-container {
  display: inline-block;
}

.floating-tooltip {
  position: fixed;
  padding: 2px 5px;
  border: 1px solid var(--toolbar-btn-border-tooltip);
  border-radius: 8px;
  white-space: nowrap;
  color: var(--toolbar-btn-txt-tooltip);
  background-color: var(--toolbar-btn-bg-tooltip);
  font-size: 1.2rem;
  font-weight: 100;
  pointer-events: none;
  z-index: 1000;
}

.tooltip-arrow {
  position: absolute;
  background: var(--toolbar-btn-bg-tooltip);
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity var(--transition-fast) ease, var(--transition-fast) ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95); /* Slight "pop" effect */
}
</style>