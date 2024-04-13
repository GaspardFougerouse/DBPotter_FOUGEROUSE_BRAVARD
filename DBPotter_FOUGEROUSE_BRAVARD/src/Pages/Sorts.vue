<script setup>
import { ref, onMounted } from 'vue';
import { itemsPerPage, getSorts } from '../controllers/sortsController';

const list = ref([]);
const pageNumber = ref(1);
const totalItems = ref(315);
const totalPages = ref(Math.ceil(totalItems.value / itemsPerPage.value));
const erreur = ref(0);
const defaultImageURL = new URL('../DefaultImg/sort.jpg', import.meta.url).href;
const searchQuery = ref('');
const errorMessage = ref("");

const fetchData = async () => {
  try {
    const query = searchQuery.value ? `&filter[name_cont]=${searchQuery.value}` : '';
    list.value = await getSorts(`?page[size]=${itemsPerPage}&page[number]=${pageNumber.value}${query}`);
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

const searchSpells = () => {
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
        <h1 style="color: #800080;"> Encyclopédie des Sortilèges </h1>
        <div class="search-bar">
          <input type="text" placeholder="Rechercher..." v-model="searchQuery" @keyup.enter="search">
          <button @click="search">Rechercher</button>
        </div>
        <div class="spells-list">
          <div v-for="item in list" :key="item.id" class="spells-item">
            <img v-if="item.attributes.image" :src="item.attributes.image" alt="Image du sort" @error="setDefaultImage" />
            <img v-else :src="defaultImageURL" alt="Image par défaut" />
            <div class="spells-details">
              <p class="item-details"><span style="color: #800080;">Nom : </span>{{ item.attributes.name || "N/A"}}</p>
              <p class="item-details"><span style="color: #800080;">Difficulté : </span>{{ item.attributes.difficulty || "N/A"}}</p>
              <p class="item-details"><span style="color: #800080;">Type : </span> {{ item.attributes.type || "N/A"}}</p>
              <p><span style="color: #800080;">Effet : </span>{{ item.attributes.effect || "N/A"}}</p>
              <a :href="item.attributes.wiki">
                <p class="Wiki">En savoir plus avec le wiki</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="pagination">
        <button class="btnChangePage" @click="previousPage">Page Précédente</button>
        <span class="paginationNumberOfPage">Page <input type="number" v-model.lazy="pageNumber" @keyup.enter="goToPage" class="inputPagination"> sur {{ totalPages}}</span>
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
  color: #800080;
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
  background-color: #800080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.spells-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}

.spells-item {
  text-align: center;
}

.spells-item img {
  width: 100%;
  border-radius: 8px;
}

.spells-details {
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.spells-details p {
  margin: 5px 0;
}

.Wiki {
  background-color: #800080;
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.Wiki:hover {
  background-color: #d9534f;
}

.pagination {
  margin-top: 20px;
}

.btnChangePage {
  padding: 8px 16px;
  background-color: #800080;
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
