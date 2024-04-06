import axios from "axios"

export const getLivres = async () => {
    try {
        let result = await axios.get(`https://api.potterdb.com/v1/books`);
        return result.data.data;
    } catch (error) {
        throw new Error("Une erreur est survenue : " + error);
    }
}