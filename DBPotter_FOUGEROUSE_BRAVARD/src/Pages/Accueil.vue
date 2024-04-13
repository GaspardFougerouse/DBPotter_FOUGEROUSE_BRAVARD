<script setup>
import { ref } from 'vue'
import axios from 'axios'

const boxes = ref([])

const getImageBook = (response) => {
  return response.data.data[0].attributes.cover
}

const getImage = (response, title) => {
  if (title === 'Personnages') {
    return response.data.data[2].attributes.image;
  } else {
    return response.data.data[0].attributes.image; 
  }
}

const getBoxClass = (title) => {
  switch (title) {
    case 'Livres':
      return 'box book';
    case 'Personnages':
      return 'box character';
    case 'Potions':
      return 'box potion';
    case 'Sorts':
      return 'box spell';
    default:
      return 'box';
  }
}

axios.all([
  axios.get('https://api.potterdb.com/v1/books'),
  axios.get('https://api.potterdb.com/v1/potions'),
  axios.get('https://api.potterdb.com/v1/spells'),
  axios.get('https://api.potterdb.com/v1/characters')
]).then(axios.spread((booksResponse, potionsResponse, spellsResponse, charactersResponse) => {
  const imageUrlBook = getImageBook(booksResponse)
  boxes.value.push({ title: 'Livres', items: [imageUrlBook], order: 1 })

  const imageUrlPotions = getImage(potionsResponse, 'Potions')
  boxes.value.push({ title: 'Potions', items: [imageUrlPotions], order: 2 })

  const imageUrlSpells = getImage(spellsResponse, 'Sorts')
  boxes.value.push({ title: 'Sorts', items: [imageUrlSpells], order: 3 })

  const imageUrlCharacters = getImage(charactersResponse, 'Personnages')
  boxes.value.push({ title: 'Personnages', items: [imageUrlCharacters], order: 4 })

  sortBoxes();
}))

const sortBoxes = () => {
  boxes.value.sort((a, b) => a.order - b.order);
}
</script>


<template>
  <div class="container">
    <h1> Encyclopédie sur l'univers de Harry Potter </h1>
    <p class="TextPresentation">Bienvenue dans l'univers de Harry Potter, vous êtes ici sur 
       une encyclopédie exhaustive qui va vous plonger profondément dans le monde magique créé par J.K. Rowling. 
       Cet univers captivant né en 1997 a ensorcelé des millions de lecteurs à travers le monde. 
       Cette encyclopédie est un guide complet pour les passionnés de magie, de potions, de sorts et d'aventures épiques.</p>
    <div class="grid-container">
      <router-link v-for="(box, index) in boxes" :key="index" :to="box.title.toLowerCase()" class="box-container">
        <div :class="getBoxClass(box.title)">
          <h3>{{ box.title }}</h3>
          <div class="image-container">
            <img :src="box.items[0]" :alt="'Image de ' + box.title" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  color: #e272f6;
  text-align: center;
  font-size: 2.5rem;
}

a {
  color: #000000;
  font-weight: bold;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  width: 100%;
  margin-top: 30px;
}

.box {
  background-color: rgba(223, 223, 223, 0.8);
  border-radius: 20px;
  min-height: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
}

.box:hover {
  transform: scale(1.05);
}

h3 {
  text-align: center;
  margin-bottom: 10px;
}

.TextPresentation {
  color: #000000;
  background-color: rgba(255, 255, 255, 0.9);
  width: 85%;
  border: 1px solid #252525;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 30px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

img {
  border-radius: 15px;
  max-width: 100%;
}

</style>
