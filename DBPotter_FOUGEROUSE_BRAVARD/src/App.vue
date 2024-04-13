<script setup>
import { ref } from 'vue'

const liens = ref([
  { title: 'Livres', route: '/Livres' },
  { title: 'Potions', route: '/Potions' },
  { title: 'Sorts', route: '/Sorts' },
  { title: 'Personnages', route: '/Personnages' }
])

const accueil = ref({ title: 'Accueil', route: '/' })
</script>

<template>
  <div>
    <header>
      <div><router-link :to='accueil.route'>{{ accueil.title }}</router-link></div>

      <ul>
        <li v-for="(lien, index) in liens" :key="index">
          <router-link :to='lien.route'>{{ lien.title }}</router-link>
        </li>
      </ul>
    </header>

    <!-- Contenu de la page -->
    <router-view />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  padding: 1rem 2rem;
  background-color: var(--header-background, #cfc8c8);
  z-index: 1;
}

header div,
header ul {
  display: flex;
}

header div {
  margin-right: auto;
}

ul {
  list-style-type: none;
  margin: 0;
  margin-right: 60px;
}

ul li {
  margin-left: 1rem;
}

a {
  color: var(--link-color, #646cff);
  text-decoration: none;
  transition: color 0.3s;
  border: none;
}

a:hover {
  color: var(--link-hover-color, #535bf2);
}

.header ul li a {
  border: none; 
}

</style>
