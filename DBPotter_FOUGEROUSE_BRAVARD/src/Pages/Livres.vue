<script setup>
import { ref, onMounted } from 'vue';
import { getLivres } from '../controllers/livresController';
import LivreComponent from '../components/livreComponent.vue'; // Assurez-vous de l'importer correctement

const list = ref([]);
const erreur = ref(0);

const fetchData = async () => {
  try {
    list.value = await getLivres();
    erreur.value = 0;
  } catch (error) {
    erreur.value = error.response.status;
  }
}

onMounted(fetchData)
</script>

<template>
  <div v-if="erreur !== 0">{{ erreur }}</div>
  <section v-else>
    <h1>Collection de Livres Anciens</h1>
    <div class="characters-list">
      <LivreComponent v-for="item in list" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
h1 {
  color: #800080;
  font-size: 28px;
  margin-bottom: 20px;
}

.characters-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}
</style>
