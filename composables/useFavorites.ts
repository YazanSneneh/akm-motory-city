export const useFavorites = () => {
  const favorites = useCookie<number[]>('favoriteCars', {
    default: () => [],
    watch: true
  })

  const isFavorite = (id: number): boolean => {
    return Array.isArray(favorites.value) && favorites.value.includes(id)
  }

  const toggleFavorite = (id: number) => {
    if (!Array.isArray(favorites.value)) {
      favorites.value = []
    }
    const idx = favorites.value.indexOf(id)
    if (idx > -1) {
      favorites.value = favorites.value.filter(item => item !== id)
    } else {
      favorites.value = [...favorites.value, id]
    }
  }

  const clearFavorites = () => {
    favorites.value = []
  }

  const count = computed(() => (Array.isArray(favorites.value) ? favorites.value.length : 0))

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    count
  }
}

