<script setup>
  import { ref, defineEmits, defineProps } from 'vue'

  const search = ref('')
  const selectedCategory = ref('')
  const emit = defineEmits(['search', 'filterCategory'])

  defineProps({
    categories: {
      type: Array,
      default: () => []
    },
    
  })


</script>

<template>
  <div class="search-container">
    <input 
      type="text" 
      v-model="search" 
      placeholder="Buscar drink pelo nome..." 
      @input="$emit('search', search)"
    />
    <span
      @click="$emit('search', search)"
      class="search-icon"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </span>
    <div class="category-filter">
      <select 
        v-model="selectedCategory"
        @change="$emit('selectedCategory', selectedCategory)"
        class="category-select"
      >
        <option value="" selected>Todas as categorias</option>
        <option 
          v-for="category in categories" 
          :key="category.name"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
  </div>
</template>

  
<style scoped lang="scss">
.search-container{
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  margin: auto;

  input {
    padding: 1rem 15rem 1rem 0.5rem; 
    border: $input-border;
    background-color: $input-bg;
    border-radius: 10px;
    color: $primary-text;
    max-width: 600px; 
    
    @media (max-width: 768px) {
      padding: 1rem 5rem 1rem 0.5rem;
    }
  }
}


.search-icon {
  &:hover {
    cursor: pointer;
    color: $accent-color;
  }

  @media (max-width: 760px) {
    display: none;
  }
}

.category-filter {
  position: relative;
}

.category-select {
  padding: 1rem;
  border: $input-border;
  background-color: $input-bg;
  border-radius: 10px;
  color: $primary-text;
  cursor: pointer;
  appearance: none;
  padding-right: 2.5rem;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: $accent-color;
  }

  option {
    background-color: $dark-bg;
    color: $primary-text; 
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .category-select {
    width: 100%;
  }
}

</style>
  