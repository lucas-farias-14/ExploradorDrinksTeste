
<script setup>
import { defineProps } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: true,
  }
})

const favoritesStore = useFavoritesStore()

const toggleFavorite = (drinkId) => {
  favoritesStore.toggleFavorite(drinkId)
}

const isFavorite = (drinkId) => {
  return favoritesStore.isFavorite(drinkId)
}
</script>

<template>
  <div v-if="isLoading" class="loading-container">
    <RingLoader color="#FFA726"/>
  </div>

  <div v-else v-for="(categorie, index) in categories" :key="index">
    <div v-if="categorie.drinks.length > 0" class="drink-category">
      {{ categorie.name }}
    </div> 
    <TransitionGroup 
    name="staggered-fade"
    tag="div"
    class="drink-grid"
    appear
  >
      <div 
        class="drink-card" 
        v-for="(drink, index) in categorie.drinks" 
        :key="index" 
        :value="drink.idDrink"
        
      >
        <RouterLink :to="'/drinks/' +drink.idDrink" class="router-link-custom">
            <img :src="drink.strDrinkThumb" alt="Drink Image" class="drink-image" />
            <h3 class="drink-name">{{ drink.strDrink }}</h3>
        </RouterLink>
        <button 
            class="favorite-button"
            :class="{ 'favorited': isFavorite(drink.idDrink) }"
            @click.stop="toggleFavorite(drink.idDrink)"
        >
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path 
                    fill="currentColor"
                    :class="{ 'favorited': isFavorite(drink.idDrink) }"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
            </svg>
        </button>
      
      </div>
    </TransitionGroup>
  </div>
</template>


<style scoped lang="scss">

.router-link-custom {
  text-decoration: none;
  color: inherit;
  display: inline-block;

  &:focus {
    outline: none;
  }
}


.staggered-fade-move,
.staggered-fade-enter-active,
.staggered-fade-leave-active {
  transition: all 0.5s ease;
}

.staggered-fade-enter-from,
.staggered-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.staggered-fade-enter-active {
  transition-delay: var(--delay);
}


.drink-category {
  display: grid;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 20px;
  padding: 10px;
  font-size: 24px;
}

.drink-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.drink-card {
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.5s ease var(--delay);
  border-radius: 10px;
  padding: 10px;
  
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0,0,0,0.4);
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
}

.favorite-button {
  color: $favourite-uncheked-color;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;

  svg {
   transition: all 0.3s ease;
  } 
}

.favorite-button.favorited {
  color: $favourite-checked-color; 
}


</style>