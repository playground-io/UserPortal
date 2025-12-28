import { ref, onMounted, onUnmounted, watch } from 'vue'

const isOpen = ref(false)

export function useSidebar() {
  const toggle = () => (isOpen.value = !isOpen.value)
  const close = () => (isOpen.value = false)

  // Optimization: Handle Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') close()
  }

  // Optimization: Body Scroll Lock when open
  watch(isOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
  })

  onMounted(() => window.addEventListener('keydown', handleKeyDown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))

  return { isOpen, toggle, close }
}