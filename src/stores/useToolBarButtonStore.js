// Store Global WebApp Layout
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToolBarButtonStore = defineStore('toolbar', () => {
  // BUTTONS STATE
  const activeButton = ref(null)
  const activeTab = ref(null)

  // ACTIONS
  // 1. TOGGLE BUTTONS
  const setButton = (button) => {
    if (activeButton.value === button) {
      activeButton.value = null // Unselect the button
      return
    }

    activeButton.value = button
  }

  // 1. TOGGLE TABS
  const setTab = (tab) => {
    if (activeTab.value === tab) {
      activeTab.value = null // Unselect the button
      return
    }

    activeTab.value = tab
  }

  // GETTERS
  const getPressed = (button) => {
    return [activeButton.value, activeTab.value].includes(button)
  }

  // RETURN
  return {
    setButton,
    setTab,
    getPressed,
  }
})
