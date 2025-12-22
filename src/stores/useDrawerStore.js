// Store Global WebApp Layout
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  // STATES
  const isExtended = ref(false)
  const separatorTitle = ref('')
  const isOpen = ref(false)

  // ACTIONS
  const openDrawer = (title) => {
    isExtended.value = true
    // 1. If drawer is currently open, we must close it first
    if (isOpen.value) {
      isOpen.value = false // Trigger close animation

      // 2. Wait for the CSS transition to finish (e.g., 300ms)
      // This creates the "Close -> Open" visual effect
      setTimeout(() => {
        separatorTitle.value = title
        isOpen.value = true
      }, 350) // Slightly longer than the CSS transition time
    } else {
      // 3. If closed, just open it immediately
      separatorTitle.value = title
      isOpen.value = true
    }
  }

  const closeDrawer = () => {
    isOpen.value = false
    setTimeout(() => {
      separatorTitle.value = null
    }, 300)
    isExtended.value = false
  }

  // GETTERS
  const getLayout = () => {
    return isExtended.value
  }

  const getTitle = () => {
    return separatorTitle.value
  }

  // RETURN
  return {
    getLayout,
    getTitle,
    openDrawer,
    closeDrawer,

    isOpen,
  }
})
