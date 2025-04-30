import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteDrinks = ref([])

  const toggleFavorite = (drinkId) => {
    const index = favoriteDrinks.value.indexOf(drinkId)
    if (index === -1) {
      favoriteDrinks.value.push(drinkId)
    } else {
      favoriteDrinks.value.splice(index, 1)
    }
  }

  const isFavorite = (drinkId) => {
    return favoriteDrinks.value.includes(drinkId)
  }

  return {
    favoriteDrinks,
    toggleFavorite,
    isFavorite
  }
})