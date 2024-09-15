export default {
    name: 'Button',
    props: ['action', 'content', 'tab'],
    template: `
        <div class="btn-container" :class=" tab ? '' : 'container-column'">
            <button @click="action" :class=" tab ? 'tab' : ''" class="btn"><slot></slot>{{content}}</button>
        </div>
    `
};