import { ref, computed } from 'vue';

// Define the possible states
const VIEW_STATES = {
  CLOSED: 'none',
  APPS: 'apps',
  SERVICES: 'services'
};

const activeView = ref(VIEW_STATES.CLOSED);

export function useToolbarControl() {
  
  // Computed booleans for the UI to consume
  const isBackdropOpen = computed(() => activeView.value !== VIEW_STATES.CLOSED);
  const isAppsLauncherOpen = computed(() => activeView.value === VIEW_STATES.APPS);
  const isServicesMenuOpen = computed(() => activeView.value === VIEW_STATES.SERVICES);

  // Unified toggle/set function
  const openView = (view) => {
    activeView.value = view;
  };

  const closeAll = () => {
    activeView.value = VIEW_STATES.CLOSED;
  };

  const toggleAppsLauncher = () => {
    activeView.value = (activeView.value === VIEW_STATES.APPS) 
      ? VIEW_STATES.CLOSED 
      : VIEW_STATES.APPS;
  };

  const handleServiceClick = (service) => {
    closeAll();
    console.log('Pressed: ', service);
  };

  return {
    // States
    isAppsLauncherOpen,
    isServicesMenuOpen,
    isBackdropOpen,
    
    // Actions
    appsLauncherOpen: () => openView(VIEW_STATES.APPS),
    appsLauncherClose: closeAll,
    servicesMenuOpen: () => openView(VIEW_STATES.SERVICES),
    servicesMenuClose: closeAll,
    backdropClose: closeAll,
    toggleAppsLauncher,
    handleServiceClick
  };
}