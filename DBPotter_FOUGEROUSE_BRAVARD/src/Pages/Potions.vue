<script setup>
import { ref, onMounted } from 'vue'
import { itemsPerPage, getPotions } from '../controllers/potionsController';

const list = ref([])
const pageNumber = ref(1)
const erreur = ref(0);
const totalItems = ref(168);
const totalPages = ref(Math.ceil(totalItems.value / itemsPerPage.value));
const defaultImageURL = new URL('../DefaultImg/potion.jpg', import.meta.url).href;
const searchQuery = ref('');
const errorMessage = ref("");

const fetchData = async () => {
  try {
    const query = searchQuery.value ? `&filter[name_cont]=${searchQuery.value}` : '';
    list.value = await getPotions(`?page[size]=${itemsPerPage.value}&page[number]=${pageNumber.value}${query}`);
    erreur.value = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    erreur.value = error.response.status;
  }
};

const nextPage = async () => {
  pageNumber.value++;
  fetchData();
  scrollToTop();
};

const previousPage = async () => {
  if (pageNumber.value > 1) {
    pageNumber.value--;
    fetchData();
    scrollToTop();
  }
};

const goToPage = () => {
  if (pageNumber.value <= totalPages.value) {
    fetchData();
    scrollToTop();
    errorMessage.value = "";
  } else {
    errorMessage.value = "Le numéro de page est trop élevé.";
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
  }
};

const setDefaultImage = (event) => {
  event.target.src = defaultImageURL;
};

const search = () => {
  pageNumber.value = 1; 
  fetchData();
  scrollToTop();
};

const reloadPage = () => {
  window.location.reload(); 
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(fetchData);
</script>

<template>
  <div v-if="erreur !== 0">{{ erreur }}</div>
  <div v-else>
    <div v-if="list.length === 0" class="no-results-message-container">
      <div class="no-results-message">
        Aucun résultat trouvé. Cliquez <a href="#" @click="reloadPage">ici</a> pour recharger la page.
      </div>
    </div>
    <div v-else>
      <div class="container">
        <h1>Potions</h1>
        <div class="search-bar">
          <input type="text" placeholder="Rechercher..." v-model="searchQuery" @keyup.enter="search">
          <button @click="search">Rechercher</button>
        </div>
        <div class="grid-container">
          <div v-for="item in list" :key="item.id" class="box">
            <h3>
              <router-link :to="item.attributes.wiki">{{ item.attributes.name || "N/A" }}</router-link>
            </h3>
            <div class="image-container">
              <img v-if="item.attributes.image" :src="item.attributes.image" :alt="'Image de ' + (item.attributes.name || 'la potion')" @error="setDefaultImage" />
              <img v-else :src="defaultImageURL" alt="Image par défaut" />
            </div>
            <div class="potions-details">
              <div class="description">
                <p class="item-details"><span>Difficulté : </span>{{ item.attributes.difficulty || "N/A"}}</p>
                <p class="item-details"><span>Ingrédients : </span> {{ item.attributes.ingredients || "N/A"}}</p>
                <p class="item-details"><span>Effet :</span> {{ item.attributes.effect || "N/A"}}</p>
              </div>
              <a :href="item.attributes.wiki" class="Wiki">En savoir plus avec le wiki</a>
            </div>
          </div>
        </div>
      </div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="pagination">
        <button class="btnChangePage" @click="previousPage">Page Précédente</button>
        <span class="paginationNumberOfPage">Page <input type="number" v-model.lazy="pageNumber" @keyup.enter="goToPage" class="inputPagination"> sur {{totalPages}}</span>
        <button class="btnChangePage" @click="nextPage">Page Suivante</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #4b0082; 
  font-size: 28px;
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  padding: 8px;
  margin-right: 10px;
}

.search-bar button {
  padding: 8px 16px;
  background-color: #4b0082; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.box {
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color: #f0f0f0;
}

.image-container img {
  width: 100%;
  border-radius: 8px;
}

.potions-details {
  margin-top: 10px;
}

.Wiki {
  display: block;
  background-color: #800080;
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
}

.Wiki:hover {
  background-color: #d9534f;
}

.pagination {
  margin-top: 20px;
}

.btnChangePage {
  padding: 8px 16px;
  background-color: #4b0082; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.paginationNumberOfPage {
  margin: 0 10px;
}

.inputPagination {
  padding: 8px;
  width: 50px;
  text-align: center;
}
</style>
