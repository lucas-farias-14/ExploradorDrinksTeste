
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export function useDrinks() {
    const allDrinks = ref([])
    const categories = ref([])
    const isLoading = ref(true)
    const searchTerm = ref('')
    const letterFilter = ref('')
    const categoryFilter = ref('')
    const isLetterFilterActive = ref(false)

    const allCategories = ref([])

    const filteredCategories = computed(() => {
    
      let result = categories.value
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase()
        result = result.map(category => ({
          drinks: category.drinks.filter(drink => 
            drink.strDrink.toLowerCase().includes(term)),
          name: category.name
        })).filter(category => category.drinks.length > 0)
      }
  
     
      if (categoryFilter.value) {
        result = result.filter(category => 
          category.name === categoryFilter.value
        )
      }
  
      return result
    })

  const fetchDrinks = async () => {
    try {
      const categoriesResponse = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
      )
      
      categories.value = categoriesResponse.data.drinks.map(category => ({
        name: category.strCategory,
        drinks: []
      }))
      
      allCategories.value = categoriesResponse.data.drinks.map(category => ({
        name: category.strCategory,
        drinks: []
      }))

      const fetchPromises = categories.value.map(async category => {
        const drinksResponse = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.name}`
        )
        category.drinks = drinksResponse.data.drinks || []
        allDrinks.value = [...allDrinks.value, ...category.drinks]
      })
      
      await Promise.all(fetchPromises)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      isLoading.value = false
    }
  }

  const filterByCategory = (category) => {
    categoryFilter.value = category
   
    isLetterFilterActive.value = false
  }




  const searchDrinks = (term) => {
    searchTerm.value = term
  }

  const resetLetterFilter = (term) => {
    fetchDrinks()
    letterFilter.value = term

    isLetterFilterActive.value = false
  
  }

  const filterByLetter = async (letter) => {
    isLoading.value = true
    try {
      const { data } = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
      )
      const filteredDrinks = data.drinks || []
      
      categories.value.forEach(category => {
        category.drinks = filteredDrinks.filter(drink => 
          drink.strCategory === category.name)
      })
      
  
    } catch (error) {
      console.error('Filter error:', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchDrinks)

  return {
    categories,
    filteredCategories,
    allCategories,
    isLoading,
    searchDrinks,
    filterByLetter,
    filterByCategory, 

    resetLetterFilter
  }
}