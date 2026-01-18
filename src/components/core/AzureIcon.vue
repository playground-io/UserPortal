<script setup>
/**
 * Centralized Azure Icon Library
 * Sourced from official Azure Architecture Icons
 */
defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 18 }
});

// Paths optimized for 18x18 or 20x20 viewing
const icons = {
  'home': 'M16 16h-3.5V9.5h-5V16H4V7.5L10 3l6 4.5V16z',
  'dashboard': 'M3 3h6v8H3V3zm8 0h6v5h-6V3zm0 7h6v4h-6v-4zM3 13h6v1h-6v-1z',
  'all-services': 'M3 3h4v4H3V3zm7 0h4v4h-4V3zm7 0h4v4h-4V3zM3 10h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4zM3 17h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4z',
  'subscriptions': 'M17 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H3V7h14v10zM5 14h6v2H5v-2zm8-4h2v6h-2v-6zm-8 0h6v2H5v-2z',
  'all-resources': 'M10 2L3 6v12l7 4 7-4V6l-7-4zM5.5 7.5L10 5l4.5 2.5v7L10 17l-4.5-2.5v-7z',
  'virtual-machine': 'M15.5 15.5H2.5V2.5h13v13z M14 14H4V4h10v10z M6 6h6v6H6z', // Simplified for clarity
  'storage': 'M17 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4V5h12v14zM6 7h8v2H6V7zm0 4h8v2H6v-4zm0 4h5v2H6v-2z',
  'networks': 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z',
  'support': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
  'cost': 'M11.8 2.1c-3.5.5-6.2 3.2-6.7 6.7H2v2h3.1c.5 3.5 3.2 6.2 6.7 6.7V21h2v-3.5c3.5-.5 6.2-3.2 6.7-6.7H22v-2h-3.1c-.5-3.5-3.2-6.2-6.7-6.7V2h-2v.1zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'
};

const colors = {
  'virtual-machine': '#0078d4',
  'storage': '#5ea0ef',
  'networks': '#32bedd',
  'cost': '#57a300',
  'all-services': '#fcd116',
  'default': '#0078d4'
};
</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24"
    class="az-svg-icon"
  >
    <path 
      :d="icons[name] || icons['all-resources']" 
      :fill="colors[name] || colors['default']" 
    />
  </svg>
</template>

<style scoped>
.az-svg-icon {
  flex-shrink: 0;
  display: block;
}
</style>