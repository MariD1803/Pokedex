<template>
  <div class="btn-container" :class=" tab ? '' : 'container-column'">
            <button @click="action" :class=" tab ? 'tab' : ''" class="btn"><slot></slot>{{content}}</button>
        </div>
</template>

<script>
export default {
  name: 'ButtonCustom',
  props: ['action', 'content', 'tab'],
}
</script>


