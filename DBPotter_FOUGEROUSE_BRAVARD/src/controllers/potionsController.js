import axios from "axios"
import { ref } from "vue";

export const itemsPerPage = ref(10);

export const getPotions = async (pageNumber) => {
    try {
        let result = await axios.get(`https://api.potterdb.com/v1/potions?page[size]=${itemsPerPage.value}&page[number]=${pageNumber}`);
        return result.data.data;
    } catch (error) {
        throw new Error("Une erreur est survenue : " + error);
    }
}
