export default {
    name: 'Card',
    props: {        
        pokemon: {
          type: Object,
          required: true
        }   
    },
    data() {
        return {
            displayAlert: false,
            info: [{ 'data': this.transformTextToUppercase(this.pokemon.name), 'label': 'Name'}, { 'data': this.calculateSize(this.pokemon.weight), 'label': 'Weight'}, { 'data': this.calculateSize(this.pokemon.height), 'label': 'Height'}, { 'data': this.pokemon.types.map((e) => this.transformTextToUppercase(e.type.name)).join(', '), 'label': 'Types'} ]
        }
    },
    methods:{
        transformTextToUppercase(element){
            return element.charAt(0).toUpperCase() + element.slice(1);
        },
        calculateSize(e){
            let value = e / 10;
            return value;
        },
        copyInfo(){
            let textToCopy = this.info.map(element => `${element.label}: ${element.data}`).join(', ');
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    this.displayAlert = true;
                    setTimeout(() => { 
                        this.displayAlert = false
                    }, "1000");
                })
                .catch(err => {
                    console.log('Error copying to Clipboard', err);
                });
        }
    },
    template: `
        <div>
            <i class="fa-solid fa-circle-xmark close" @click="$emit('update:modal', false)"></i>
            <div class="container-header">          
                <img :src="pokemon.sprites.other.dream_world.front_default" alt="img_pokemon" class="img">
            </div>

            <div class="container-info">
                <div v-for="element in info" class="info-element">
                    <h3>{{element.label}}:</h3>
                    <p>{{element.data}}</p>
                </div >
            </div>

            <div class="footer">
                <button-custom :content="'Share to my friends'" @click="copyInfo()"></button-custom>
                <div class="container-star">
                    <slot></slot>
                </div>
            </div>

            <div class="copy-alert" :class="{'animation': displayAlert, 'hidden': !displayAlert}">
                <i class="fa-regular fa-copy"></i>
                <p>Copied to Clipboard!</p>
            </div>
        
        </div>
    `
};