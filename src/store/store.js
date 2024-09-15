export const store = Vue.reactive({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    updateLocalStorage(){
        localStorage.setItem('favorites', JSON.stringify(store.favorites));
    }
});
