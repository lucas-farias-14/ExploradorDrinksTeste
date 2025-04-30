<script setup>
import { ref } from 'vue';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letters = alphabet.split('');
const activeLetter = ref(null);

const handleClick = (letter) => {
  if (activeLetter.value === letter) {
    activeLetter.value = null;
    emit('filter', null);
  } else {
  
    activeLetter.value = letter;
    emit('filter', letter);
  }
};

const emit = defineEmits(['filter']);
</script>


<template>
  <div class="alphabet-container">
    <span
      v-for="(letter, index) in letters" 
      :key="index"
      class="letter"
      :class="{ 'active': activeLetter === letter }"
      @click="() => handleClick(letter)"
    >
      {{ letter }}
    </span>
  </div>
</template>
    

<style scoped lang="scss">

.alphabet-container {
  font-size: 12px;
  letter-spacing: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  display: inline-block;

  margin-right: 5px;  

  &:hover {
    cursor: pointer;
    color: $accent-color;
  }
  
}

.letter.active {
  color: $accent-color;
  font-weight: bold;
}
</style>
    