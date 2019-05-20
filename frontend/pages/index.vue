<template>
  <div>
    <div class="header">
      <div class="header__title">TODO List</div>
      <div class="header__add-btn btn" @click="handleClickAdd"><v-icon name="plus" scale="1.5"/></div>
    </div>
    <div class="contents">
      <div class="list">
        <todo-list :data="todoContents" @edit="handleEditEvent" @refresh="handleRefreshEvent"/>
      </div>
      <todo-form :type="formType" :activate.sync="activateForm" :data="formData" @success="handleFormSuccessEvent" />
    </div>
  </div>
</template>

<script>
import TodoList from '~/components/TodoList.vue';
import TodoForm from '~/components/TodoForm.vue';

export default {
  components: {
    TodoList,
    TodoForm
  },
  data() {
    return {
      activateAddForm: false,
      activateEditForm: false,
      activateForm: false,
      formType: 'add',
      formData: {},
      todoContents: []
    }
  },
  created () {
    this.loadLists()
  },
  methods: {
    loadLists () {
      let self = this
      if (process.browser) {
        this.$axios.get('/lists')
          .then(res => {
            let data = res.data

            data.sort(function (a, b) {
              if (a.priority == b.priority) {
                return new Date(a.deadline) - new Date(b.deadline)
              } else {
                return b.priority - a.priority
              }
            });

            self.todoContents = res.data
          })
          .catch(err => {
            this.$toast.show('할일 리스트를 가져오지 못했습니다 ( ´•̥̥̥ω•̥̥̥` )', {
              type: 'error'
            })
          });
      }
    },
    handleClickAdd (e) {
      this.activateForm = true
      this.formType = 'add'
    },
    handleEditEvent (data) {
      this.activateForm = true
      this.formType = 'edit'
      this.formData = Object.assign({}, data)
    },
    handleFormSuccessEvent (type) {
      this.loadLists()
    },
    handleRefreshEvent () {
      this.loadLists()
    }
  }
}
</script>

<style>
</style>
