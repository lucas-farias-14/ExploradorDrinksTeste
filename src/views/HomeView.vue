
<script setup>
import { useDrinks } from '../composables/useDrinks'
import SearchBar from '../components/SearchBar.vue'
import Alphabet from '../components/Alphabet.vue'
import DrinksGrid from '../components/DrinksGrid.vue'

const { 
  filteredCategories, 
  isLoading, 
  allCategories,
  searchDrinks, 
  filterByLetter,
  resetLetterFilter,
  filterByCategory
} = useDrinks()

const handleLetterFilter = (letter) => {
  if (letter === null) {
    resetLetterFilter()
  } else {
    filterByLetter(letter);
  }
}

const handleCategoryChange = (category) => {
  filterByCategory(category)
}

</script>
<template>
  <div class="container">
   
    <SearchBar 
      :categories="allCategories"
      @search="searchDrinks" 
      @selectedCategory="handleCategoryChange" />
    <Alphabet @filter="handleLetterFilter" />
    <DrinksGrid 
      :categories="filteredCategories" 
      :isLoading="isLoading" 
      @drinkSelected="(drinkId) => $router.push({ name: 'drink', params: { id: drinkId } })"
      
    />
  </div>
</template>
