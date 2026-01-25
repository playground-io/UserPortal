import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Define the possible states
export const VIEW_STATES = {
  CLOSED: 'none',
  APPS: 'apps',
  SERVICES: 'services'
};

export const useLauncherStore = defineStore('launcher', () => {
  // --- STATE ---
  const activeView = ref(VIEW_STATES.CLOSED);

  // --- GETTERS (Computed) ---
  const isBackdropOpen = computed(() => activeView.value !== VIEW_STATES.CLOSED);
  const isAppsLauncherOpen = computed(() => activeView.value === VIEW_STATES.APPS);
  const isServicesMenuOpen = computed(() => activeView.value === VIEW_STATES.SERVICES);

  // --- ACTIONS (Methods) ---
  function openView(view) {
    activeView.value = view;
  }

  function closeAll() {
    activeView.value = VIEW_STATES.CLOSED;
  }

  function toggleAppsLauncher() {
    activeView.value = (activeView.value === VIEW_STATES.APPS) 
      ? VIEW_STATES.CLOSED 
      : VIEW_STATES.APPS;
  }

  function handleServiceClick(service) {
    closeAll();
    console.log('Pressed: ', service);
    // You could also handle router navigation here
  }

  return {
    // State/Getters
    activeView,
    isAppsLauncherOpen,
    isServicesMenuOpen,
    isBackdropOpen,
    
    // Actions
    openApps: () => openView(VIEW_STATES.APPS),
    openServices: () => openView(VIEW_STATES.SERVICES),
    closeAll,
    toggleAppsLauncher,
    handleServiceClick
  };
});