import { ref } from 'vue';

const isOpen = ref(false);

export function useOverlayServices() {

  const servicesOpen = () => {
    isOpen.value = true;
  };

  const servicesClose = () => {
    isOpen.value = false;
  };

  const handleServiceClick = (service) => {
    servicesClose();
    console.log('Pressed: ', service.label);
  };

  return {
    isOpen,
    servicesOpen,
    servicesClose,
    handleServiceClick
  };
};