<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="characters-item">
        <img v-if="item.attributes.cover" :src="item.attributes.cover" alt="Image du livre" class="book-cover"/>
        <div class="characters-details">
            <p class="item-details"><strong>Nom :</strong> {{ item.attributes.title || "N/A" }}</p>
            <p class="item-details"><strong>Nombre de pages :</strong> {{ item.attributes.pages || "N/A" }}</p>
            <p class="item-details"><strong>Date de sortie :</strong> {{ new Date(item.attributes.release_date).toLocaleDateString('fr-FR') || "N/A" }}</p>
            <p class="item-details"><strong>Créateur :</strong> {{ item.attributes.author || "N/A" }}</p>
            <p class="item-details" id="resume"><strong>Résumé :</strong> {{ item.attributes.summary || "N/A" }}</p>
            <a :href="item.attributes.wiki">
                <p class="Wiki">En savoir plus avec le wiki</p>
            </a>
        </div>
    </div>
</template>

<style scoped>
.characters-item {
    width: 100%;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
}

.book-cover {
    width: 100%; 
    height: auto; 
}


.characters-details {
    padding: 20px;
}

.characters-details p {
    margin: 10px 0;
}

.characters-details #resume {
    text-align: justify;
}

.characters-details .Wiki {
    background-color: #800080;
    color: white;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

.characters-details .Wiki:hover {
    background-color: #6a006a;
}
</style>
