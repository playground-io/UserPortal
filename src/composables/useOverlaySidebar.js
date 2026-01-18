import { ref } from 'vue';

const isOpen = ref(false);

export function useOverlaySidebar() {

  const sidebarOpen = () => {
    isOpen.value = true;
  };

  const sidebarClose = () => {
    isOpen.value = false;
  };

  const handleItemClick = (item) => {
    sidebarClose();
    console.log('Pressed: ', item.label);
  };

  return {
    isOpen,
    sidebarOpen,
    sidebarClose,
    handleItemClick
  };
};