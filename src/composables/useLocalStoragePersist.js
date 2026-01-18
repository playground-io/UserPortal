import { ref, onMounted } from 'vue'

export function useLocalStoragePersist(menuItems, storageKey) {
  const items = ref(JSON.parse(JSON.stringify(menuItems.value)));

  const persistOrder = () => {
    if (!storageKey) return;
    try {
      const idOrder = items.value.map(item => item.id);
      localStorage.setItem(storageKey, JSON.stringify(idOrder));
    } catch (e) { console.warn("Menu Items Sync Error", e); }
    console.log(items.value)
  };

  const loadFromStorage = () => {
    if (!storageKey) return;
    const savedOrder = localStorage.getItem(storageKey);
    if (!savedOrder) return;
    try {
      const orderedIds = JSON.parse(savedOrder);
      const currentMap = new Map(items.value.map(item => [item.id, item]));
      const sorted = orderedIds.map(id => currentMap.get(id)).filter(Boolean);
      const newItems = items.value.filter(item => !orderedIds.includes(item.id));
      items.value = [...sorted, ...newItems];
    } catch (e) {}
  };

  onMounted(loadFromStorage);

  return { 
    items,
    persistOrder
  };
}