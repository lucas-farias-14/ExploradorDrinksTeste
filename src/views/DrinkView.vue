<script setup>
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import axios from 'axios'
import { reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const drinkId = route.params.id

const state = reactive({
  drink: {},
  isLoading: true,
})

const ingredients = computed(() => {
  if (!state.drink) return []
  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = state.drink[`strIngredient${i}`]
    const measure = state.drink[`strMeasure${i}`]
    
    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure || ''
      })
    }
  }
  return ingredients
})

onMounted(async () => {
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    state.drink = response.data.drinks[0]
  } catch (error) {
    console.error('Error fetching drink details:', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <div class="return-button-container">
    <button @click="$router.push({ name: 'home' })" class="return-button">Retornar a lista de drinks</button>
  </div>
  <div v-if="state.isLoading" class="loading-container">
    <RingLoader color="#FFA726"/>
  </div>
  <div v-else class="drink-details-container">
    <div class="drink-details">
      <div class="img-container">
        <img :src="state.drink.strDrinkThumb" alt="Drink Image" class="drink-image" />
      </div>
      
      <h2 class="drink-name">{{ state.drink.strDrink }}</h2>
      
      <div class="ingredients-section">
        <h3>Ingredients:</h3>
        <ul class="ingredients-list">
          <li v-for="(item, index) in ingredients" :key="index">
            {{ item.measure }} {{ item.name }}
          </li>
        </ul>
      </div>
      
      <div class="instructions-section">
        <h3>Instructions:</h3>
        <p class="drink-instructions">{{ state.drink.strInstructions }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.return-button {
    background-color: $accent-color-light;
    color: $secondary-text;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.return-button-container {
  display: flex;
  justify-content: left;

  padding: 1rem;
}

.drink-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: $container-bg;
}

.drink-image {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.img-container{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.drink-name {
  color: $accent-color;
  margin-bottom: 1.5rem;
}

.ingredients-section {
  margin: 2rem 0;
}


</style>