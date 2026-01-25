import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useToolbarButtonStore = defineStore('toolbarButton', () => {
  // --- STATE ---
  const activeLauncher = ref(null);
  const activeDrawer = ref(null); 
  const activeSidebar = ref(null);

  // --- GETTERS ---
  const isBackdropOpen = computed(() => activeLauncher.value !== null);

  // --- ACTIONS ---
  function closeAll() {
    activeLauncher.value = null;
  }

  // Toggle Launcher Group buttons
  function toggleLauncher(btnId) {
    // Toggle the button logic within the group
    activeLauncher.value = activeLauncher.value === btnId ? null : btnId;
  }

  // Toggle Drawer Group buttons
  function toggleDrawer(btnId) {
    // Close the Launcher/Backdrop if they are open
    closeAll();
    // Toggle the button logic within the group
    activeDrawer.value = activeDrawer.value === btnId ? null : btnId;
  }

  // Toggle Sidebar Group buttons
  function toggleSidebar(btnId) {
    // Close the Launcher/Backdrop if they are open
    closeAll();
    // Toggle the button logic within the group
    activeSidebar.value = activeSidebar.value === btnId ? null : btnId;
  }

  function handleServiceClick(service) {
    closeAll();
    console.log('Pressed: ', service);
    // You could also handle router navigation here
  }
  
  return {
    activeLauncher,
    activeDrawer,
    activeSidebar,
    isBackdropOpen,
    closeAll,
    toggleLauncher,
    toggleDrawer,
    toggleSidebar,
    handleServiceClick
  };
});