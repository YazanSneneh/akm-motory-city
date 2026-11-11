export const useCompare = () => {
  const compareList = useCookie<number[]>('compareCars', {
    default: () => [],
    watch: true
  })

  const isDrawerOpen = useState('compare_drawer_open', () => false)
  const isModalOpen = useState('compare_modal_open', () => false)

  const isComparing = (id: number): boolean => {
    return Array.isArray(compareList.value) && compareList.value.includes(id)
  }

  const addToCompare = (id: number): boolean => {
    if (!Array.isArray(compareList.value)) {
      compareList.value = []
    }
    if (compareList.value.includes(id)) return true
    if (compareList.value.length >= 3) {
      return false
    }
    compareList.value = [...compareList.value, id]
    isDrawerOpen.value = true
    return true
  }

  const removeFromCompare = (id: number) => {
    if (!Array.isArray(compareList.value)) return
    compareList.value = compareList.value.filter(item => item !== id)
    if (compareList.value.length === 0) {
      isDrawerOpen.value = false
      isModalOpen.value = false
    }
  }

  const toggleCompare = (id: number) => {
    if (isComparing(id)) {
      removeFromCompare(id)
    } else {
      addToCompare(id)
    }
  }

  const clearCompare = () => {
    compareList.value = []
    isDrawerOpen.value = false
    isModalOpen.value = false
  }

  const count = computed(() => (Array.isArray(compareList.value) ? compareList.value.length : 0))

  return {
    compareList,
    isComparing,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    count,
    isDrawerOpen,
    isModalOpen
  }
}

