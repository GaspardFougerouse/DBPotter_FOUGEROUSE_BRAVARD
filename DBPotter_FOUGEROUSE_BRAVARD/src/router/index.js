// fichier router/index.js ou un nom similaire
import { createRouter, createWebHistory } from 'vue-router';

import Accueil from '../Pages/Accueil.vue';
import Potions from '../Pages/Potions.vue';
import Personnages from '../Pages/Personnages.vue';
import Livres from '../Pages/Livres.vue';
import Sorts from '../Pages/Sorts.vue';



const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/Potions',
    name: 'Potions',
    component: Potions,
  },
  {
    path: '/Personnages',
    name: 'Personnages',
    component: Personnages,
  },
  {
    path: '/Livres',
    name: 'Livres',
    component: Livres,
  },
  {
    path: '/Sorts',
    name: 'Sorts',
    component: Sorts,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
