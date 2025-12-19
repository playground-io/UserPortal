<script setup>
import SvgToIcon from '@/components/core/SvgToIcon.vue';
import { useToolBarButtonStore } from '@/stores/useToolBarButtonStore';
import { useDrawerStore } from '@/stores/useDrawerStore';

const toolBarButtonStore = useToolBarButtonStore();
const drawerStore = useDrawerStore();

const props = defineProps({
  label: {
    type: String,
    default: "Label",
    required: true
  },
  tooltip: {
    type: String,
    default: "Tooltip"
  },
  mode: {
    type: String,
    default: "normal",
    validator: (value) => ['normal', 'toggle', 'tab'].includes(value)
  },
  iconName: {
    type: [String, null]
  }
});

const handleClick = () => {
  if (props.mode === 'toggle')
      toolBarButtonStore.setButton(props.label);
    else
      toolBarButtonStore.setTab(props.label);
  
  if (toolBarButtonStore.getPressed(props.label))
    drawerStore.openDrawer(props.tooltip);
  else
    drawerStore.closeDrawer();
}
</script>

<template>
  <button
    :class="{ [props.mode]: toolBarButtonStore.getPressed(props.label) }"
    @click="handleClick"
    >
    <div class=item-tooltip>
      {{ props.tooltip }}
    </div>
    <SvgToIcon :name=props.iconName :size=19 />
  </button>
</template>

<style scoped>
  button {
    position: relative;
    height: 100%;
    aspect-ratio: 1 / 1;
    padding: 0;
    border: none;
    background-color: var(--toolbar-btn-bg);;
    color: var(--toolbar-btn-txt);
    transition: background-color var(--transition-medium) ease;
  }

  /* --- Tooltip Styling --- */
  .item-tooltip {
    position: absolute;
    visibility:hidden;
    opacity: 0;
    transition: opacity var(--transition-medium) ease;
    padding: 5px 10px;
    border: 1px solid var(--toolbar-btn-border-tooltip);
    border-radius: 4px;
    white-space: nowrap;
    color: var(--toolbar-btn-txt-tooltip);
    background-color: var(--toolbar-btn-bg-tooltip);
    font-size: 1.2rem;
    left: 0;
    top: 85%;
    font-weight: 100;
    transform: translateX(-55%);
  }

  button:hover {
    background-color: var(--toolbar-btn-bg-hover);
    color: var(--toolbar-btn-txt-hover);
  }

  button:hover .button-item-tooltip {
    visibility: visible;
    opacity: 1;
  }
  
  button:active {
    background-color: var(--toolbar-btn-bg-active);
    color: var(--toolbar-btn-txt-active);
    transition: background-color 0s ease;
  }

  button:focus-visible {
    outline: 1px dashed rgba(255,255,255,1);
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
    outline: 1px dashed rgba(255,255,255,1);
    outline-offset:-1px;
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
  
  button.tab:focus-visible {
    outline: 1px dashed rgb(0, 0, 0);
    outline-offset:-1px;
  }
</style>