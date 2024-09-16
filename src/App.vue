<template>
  <div class="spinner" :class="!displaySpinner ? 'hidden' : 'active'">
                <div >
                  <img src="../src/assets/img/loader.png"/> 
                </div>
            </div>

            <div  v-if="!display" class="section-welcome animation-move-up">
                <div class="container-pikachu">
                    <img src="../src/assets/img/pikachu.png"/>
                    <div class="background"></div>
                    <div class="background-border"></div>
                </div>
                
                <div class="container-column info">
                    <h3>{{welcome.title}}</h3>
                    <p>{{welcome.info}}</p>
                </div>

                <buttonCustom :action="() => {displaySpinner = !displaySpinner; setDisplay(true);}" :content="'Get started'"></buttonCustom>                

            </div>

            <div  v-if="display">
                                
                <div v-if="modal" class="modal-container" @click="modal = !modal"> 
                    <CardCustom :pokemon="pokemon" class="modal" @update:modal="modal = $event" @click.stop>                        
                        <i class="fa-solid fa-star" :class="pokemon.favorite === 'true' ? 'active-favorite' : ''" @click="() => {addOrDeleteFavorites(pokemon.idx), pokemon.favorite === 'true' ? pokemon.favorite = 'false' : pokemon.favorite = 'true' }"></i>
                    </CardCustom>
                </div>

                <div class="section-search-and-favorites" >
                    <div class="container-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" class="input-search" id="search" @input="search()" v-model="searchInput" placeholder="Search...">
                    </div>
                    
                    <div class="container-column" :class="!results.length || !store.favorites ? 'hidden' : 'item-container'" v-if="displaySearch">
                        <div v-for="(pokemon,idx) in results" class="item" :key="idx">
                            <p @click="displayModal(pokemon, idx)">{{pokemon.name}}</p>                            
                            <div class="container-star" @click="addOrDeleteFavorites(idx)">
                                <i class="fa-solid fa-star" :class="pokemon.favorite === 'true' ? 'active-favorite' : ''" ></i>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="container-column" :class="!results.length || !store.favorites ? 'hidden' : 'item-container'" v-if="displayFavorites">
                        <div v-for="(pokemon, idx) in store.favorites" class="item" :key="idx">
                            <p @click="displayModal(pokemon, idx)">{{pokemon.name}}</p>
                            <div class="container-star" @click="deleteFavorites(pokemon)"><i class="fa-solid fa-star active-favorite" ></i></div>
                        </div>
                        <div v-if="!store.favorites.length">
                            <notResultCustom :array="havent" :not="true" ></notResultCustom>
                        </div>
                    </div>

                    <div v-if="!results.length || !store.favorites ">
                        <notResultCustom :array="error" @display="displaySpinner = $event" @setdisplay:modal="setDisplay($event)"></notResultCustom>
                    </div>
                    
                    
                </div>
                <div class="container-tabs" :class="!results.length || !Array.isArray(store.favorites) ? 'animation-move-down' : 'animation-move-up'">
                    <buttonCustom :tab="true" :class="!displaySearch ? 'btn-desactive' : ''" :action="() => {displaySearch = true, displayFavorites = false, clearSearch()}" :content="'All'"><i class="fa-solid fa-list icon"></i></buttonCustom>
                    <buttonCustom :tab="true" :class="!displayFavorites ? 'btn-desactive' : ''" :action="() => {displayFavorites = true, displaySearch = false, clearSearch()}" :content="'Favorites'"><i class="fa-solid fa-star icon"></i></buttonCustom>
                </div>
            </div>
</template>

<script>

const url = "https://pokeapi.co/api/v2/pokemon/"
import CardCustom from './components/CardCustom.vue';
import NotResultCustom from './components/NotResultCustom.vue';
import ButtonCustom from './components/ButtonCustom.vue';
import { store } from './store/store.js'

export default {
  name: 'App',
  components: {
    CardCustom,
    NotResultCustom,
    ButtonCustom
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
    }
  },
  methods:{
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

        console.log("Entro aca???")

        
        this.store.favorites = this.store.favorites.filter(item => {
          return item.name !== this.results[idx].name;
        });
        this.store.updateLocalStorage();
        this.results[idx].favorite = 'false'
        return
        ;
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
  setup() {
    return { store };
  },
}
</script>


