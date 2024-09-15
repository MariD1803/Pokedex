export default {
    name: 'NotResult',
    props: ['array','not'],
    template: `
    <div class="container-column error-msg">
        <div class="container-column">
            <h3>{{array.title}}</h3>
            <p>{{array.msg}}</p>
        </div>
        <button-custom :content="'Go back home'" @click="$emit('display', false), $emit('setdisplay:modal', false)" v-if="!not"></button-custom>
    </div>
    `
};
