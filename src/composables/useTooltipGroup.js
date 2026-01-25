import { ref } from 'vue';

const isAnyTooltipOpen = ref(false);
let globalTimer = null; // Used to manage the "Warm" window

export function useTooltipGroup() {
  const openWarmWindow = () => {
    if (globalTimer) clearTimeout(globalTimer);
    isAnyTooltipOpen.value = true;
  };

  const closeWarmWindow = () => {
    // Start a timer to turn off "Instant mode" after 400ms of inactivity
    if (globalTimer) clearTimeout(globalTimer);
    
    globalTimer = setTimeout(() => {
      isAnyTooltipOpen.value = false;
    }, 400); 
  };

  return { isAnyTooltipOpen, openWarmWindow, closeWarmWindow };
}