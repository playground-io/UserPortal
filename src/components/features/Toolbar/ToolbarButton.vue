<script setup>
  import { ref, computed, onUnmounted } from 'vue';
  import spriteUrl from '@/assets/icons/icons.svg?url3'
  import SmartTooltip from '@/components/core/SmartTooltip.vue'
  import { useTooltipGroup } from '@/composables/useTooltipGroup';

  const { isAnyTooltipOpen, openWarmWindow, closeWarmWindow } = useTooltipGroup();

  const props = defineProps({
    btnLabel: {
      type: [String, null]
    },
    btnPressed: {
      type: [Boolean, null]
    },
    btnTooltip: {
      type: [String, null]
    },
    iconName: {
      type: [String, null]
    },
    btnMode: {
      type: String,
      default: 'normal',
      validator: (value) => ['normal', 'toggle', 'tab'].includes(value)
    }
  });

  // Local state to control when the floating UI is active
  const isHovered = ref(false);
  let localTimer = null;
  
  
  const handleMouseEnter = () => {
    if (isAnyTooltipOpen.value) {
      // Instant Mode
      isHovered.value = true;
      openWarmWindow(); // Pings the global state to keep it "Warm"
    } else {
      // Delayed Mode
      localTimer = setTimeout(() => {
        isHovered.value = true;
        openWarmWindow(); // Turns on "Warm" mode for everyone
      }, 600);
    }
  };
  
  const handleMouseLeave = () => {
    if (localTimer) clearTimeout(localTimer);
    isHovered.value = false;
    
    // Tell the global system we are no longer hovering this button
    // It will wait 400ms before turning off "Instant mode"
    closeWarmWindow(); 
  };

  const getIcon = (iconName) => {
    return `${spriteUrl}#${iconName}`;
  }
  
  const isPressed = computed(() => props.btnMode !== 'normal' && props.btnLabel === props.btnPressed);

  onUnmounted(() => {
    if (localTimer) clearTimeout(localTimer);
  });

</script>

<template>
  <SmartTooltip 
    :text="props.btnTooltip" 
    :active="isHovered"
  >
    <button
      :class="{ [props.btnMode]: btnPressed }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <svg class="svg-icon">
        <use :href="getIcon(`${props.iconName}`)" />
      </svg>
    </button>
  </SmartTooltip>
</template>

<style scoped>
button {
  height: 40px;
  width: 48px;
  padding: 0;
  border: none;
  background-color: var(--toolbar-btn-bg);
  color: var(--toolbar-btn-txt);
  transition: background-color var(--transition-medium) ease;
  cursor: pointer;
}

.svg-icon {
  display: block;
  margin: auto;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  stroke: currentColor;
  vector-effect: non-scaling-stroke;
  stroke-width: 1.5;
  width: 16px;
  height: 16px;
}

button:hover {
  background-color: var(--toolbar-btn-bg-hover);
  color: var(--toolbar-btn-txt-hover);
}

button:hover .item-tooltip {
  visibility: visible;
  opacity: 1;
}

button:active {
  background-color: var(--toolbar-btn-bg-active);
  color: var(--toolbar-btn-txt-active);
  transition: background-color 0s ease;
}

button:focus-visible {
  outline: 1px dashed rgba(255, 255, 255, 1);
  outline-offset: -1px;
}

button.toggle {
  background-color: var(--toolbar-btn-bg-toggle);
  color: var(--toolbar-btn-txt-toggle);
}

button.toggle:hover {
  background-color: var(--toolbar-btn-bg-toggle-hover);
  color: var(--toolbar-btn-txt-toggle-hover);
}

button.toggle:active {
  background-color: var(--toolbar-btn-bg-toggle-active);
  color: var(--toolbar-btn-txt-toggle-active);
  transition: background-color 0s ease;
}

button.toggle:focus-visible {
  outline: 1px dashed rgba(255, 255, 255, 1);
  outline-offset: -1px;
}

button.tab {
  background-color: var(--toolbar-btn-bg-tab);
  color: var(--toolbar-btn-txt-tab);
}

button.tab:hover {
  background-color: var(--toolbar-btn-bg-tab-hover);
  color: var(--toolbar-btn-txt-tab-hover);
}

button.tab:active {
  background-color: var(--toolbar-btn-bg-tab-active);
  color: var(--toolbar-btn-txt-tab-active);
  transition: background-color 0s ease;
}

button.tab .svg-icon {
  stroke-width: 1;
}

button.tab:focus-visible {
  outline: 1px dashed rgb(0, 0, 0);
  outline-offset: -1px;
}
</style>
