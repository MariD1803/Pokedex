
import { reactive } from 'vue'
export const store = reactive({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    updateLocalStorage(){
        localStorage.setItem('favorites', JSON.stringify(store.favorites));
    }
});
