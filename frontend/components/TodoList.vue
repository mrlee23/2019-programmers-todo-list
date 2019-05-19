<template>
  <div class="todo-list">
    <todo-element v-for="(d, i) in data"
                  :key="d.id"
                  :id="d.id"
                  :todo="d.todo"
                  :title="d.title"
                  :content="d.content"
                  :deadline="d.deadline"
                  :priority="d.priority"
                  @edit="handleEditEvent"
                  @refresh="handleRefreshEvent"
    />
  </div>
</template>

<script>
  import TodoElement from '~/components/TodoElement.vue';
  export default {
    name: 'TodoList',
    components: {
      TodoElement
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    mounted() {
    },
    created() {
    },
    destoryed() {
    },
    methods: {
      handleEditEvent (data) {
        this.$emit('edit', data);
      },
      handleRefreshEvent (data) {
        this.$emit('refresh', data);
      }
    }
  }
</script>

<style>
</style>
