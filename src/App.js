const url = "https://pokeapi.co/api/v2/pokemon/"
import spinner from './components/spinner.js';
import button from './components/button.js';
import card from './components/card.js';
import { store } from './store/store.js'
import notresult from './components/notresult.js';

const app =  Vue.createApp({
  
  setup() {
    return { store };
  },
  data() {
    return {
      welcome: {
        title: 'Welcome to Pokédex',
        info: 'The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.'
      },
      error: {
        title: 'Uh-oh!',
        msg: 'You look lost on your journey!'
      },
      havent: {
        title: 'Oh-no!',
        msg: "You doesn't have any favorite pokemon!"
      },
      display: false,
      displaySpinner: false,
      searchInput: '',
      results: [],
      favorites: [],
      displaySearch: true,
      displayFavorites: false,
      modal: false,
      pokemon: []
    };
  },
  methods: {
    setDisplay(result) {
      this.displaySpinner = true;
      setTimeout(() => {
        this.displaySpinner = false;
        this.display = result;
        this.clearSearch();
      }, 1900);
    },
    async displayModal(pokemon,idx){
      const response = await fetch(pokemon.url);
      this.pokemon = await response.json();
      this.pokemon.idx = idx;
      this.pokemon.favorite = pokemon.favorite != '' ? pokemon.favorite : '';
      this.modal = true;
    },
    markFavorites(){
      for (let i = 0; i < this.results.length; i++) {
        for (let j = 0; j < this.store.favorites.length; j++) {
          if(this.results[i].name === this.store.favorites[j].name){
            this.results[i].favorite = 'true';
          }
        }
      }
    },
    async getPokemons() {
      try {
        const response = await fetch(url);
        let result = await response.json();
        this.results = this.sortAlphabetically(result.results);
        this.markFavorites();
      } catch (error) {
        this.results = [];
      }
    },
    async search() {
      await this.getPokemons()
      this.store.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let filteredResults = [];
      this.markFavorites();

      if(this.displaySearch){
        if (this.results.length) {
          filteredResults = this.results.filter(item => {
            const itemName = item.name.toLowerCase().trim();
            const input = this.searchInput.toLowerCase().trim();
            return itemName.includes(input);
          });
          if(!filteredResults.length){
            filteredResults = []
            this.store.favorites = false
          }
        } else {
          this.results = [];
        }
        this.results = filteredResults;
      }else {
        if (Array.isArray(this.store.favorites)) {
          filteredResults = this.store.favorites.filter(item => {
            const itemName = item.name.toLowerCase().trim();
            const input = this.searchInput.toLowerCase().trim();
            return itemName.includes(input);
          });
          if(!filteredResults.length){
            if(this.searchInput.toLowerCase().trim() == ''){
              await this.getPokemons()
              filteredResults = []
              return this.store.favorites = filteredResults  
            }
            this.results = []
            filteredResults = false
          }
          this.store.favorites = filteredResults    
        }else{
          this.store.favorites = false
        }
      }       
    },
    sortAlphabetically(array){
      return array.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      
    },
    addOrDeleteFavorites(idx){
      if(this.results[idx].favorite === 'true'){
        this.store.favorites = this.store.favorites.filter(item => {
          return item.name !== this.results[idx].name;
        });
        return this.results[idx].favorite = 'false';
      }
      this.results[idx].favorite = 'true';
      this.results[idx].idx = idx;
      this.store.favorites.push(this.results[idx]);
      this.store.updateLocalStorage();
      return this.sortAlphabetically(this.store.favorites);
    },
    deleteFavorites(pokemon){
      if (this.results[pokemon.idx].favorite === 'true') {
        this.store.favorites = this.store.favorites.filter(item => {
          return item.name !== this.results[pokemon.idx].name;
        });
        this.store.updateLocalStorage();
        return this.results[pokemon.idx].favorite = 'false';
      }
    },
    async clearSearch(){
      await this.getPokemons()
      this.store.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.searchInput = ''
    }
  },
  mounted() {
    this.getPokemons();
  },
 
});


app.component('spinner', spinner);
app.component('button-custom', button);
app.component('card', card);
app.component('notresult', notresult)


app.mount('#app');