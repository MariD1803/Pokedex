<template>
  <div class="container-column error-msg">
        <div class="container-column">
            <h3>{{array.title}}</h3>
            <p>{{array.msg}}</p>
        </div>
        <ButtonCustom :content="'Go back home'" @click="$emit('display', false), $emit('setdisplay:modal', false)" v-if="!not"></ButtonCustom>
    </div>
</template>

<script>
import ButtonCustom from './ButtonCustom.vue';

export default {
  name: 'NotResultCustom',
  props: ['array','not'],
  components: {
    ButtonCustom
  },
   
}
</script>