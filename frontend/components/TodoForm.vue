<template>
  <div :class="{'todo-form': true, 'is-active': this.activate}" >
    <div class="todo-form__back" @click="handleCloseClick" />
    <div class="todo-form__container">
      <div class="todo-form__header">
        <div class="todo-form__title">{{headerTitle}}</div>
      </div>
      <div class="todo-form__form">
        <div class="todo-form__input-title">
          <span>할일: </span>
          <input class="todo-form__input" type="text" v-model="inputTitle">
        </div>
        <div class="todo-form__input-content">
          <span>내용: </span>
          <textarea class="todo-form__textarea" v-model="inputContent" />
        </div>
        <div class="todo-form__input-deadline">
          <span class="todo-form__input-deadline-text">마감시간 설정 </span>
          <label class="switch">
            <input v-model="deadlineEnabled" type="checkbox">
            <span class="slider round"></span>
          </label>
          <no-ssr>
            <VueCtkDateTimePicker v-if="deadlineEnabled" label="마감시간" v-model="inputDeadline" format="YYYY-MM-DD" auto-close only-date></VueCtkDateTimePicker>
          </no-ssr>
        </div>
      </div>
      <div class="todo-form__footer">
        <div class="todo-form__accept-btn btn" @click="handleCloseClick">취소</div>
        <div class="todo-form__cancel-btn btn" @click="handleSubmitClick">{{acceptBtnText}}</div>
      </div>
      <div class="todo-form__close-btn btn" @click="handleCloseClick">
        <v-icon name="plus"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TodoForm',
    components: {
    },
    props: {
      type: {
        type: String,
        default: 'add'
      },
      activate: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        headerTitle: this.type == 'add' ? '추가하기' : '수정하기',
        acceptBtnText: this.type == 'add' ? '추가완료' : '수정완료',
        activateFlag: this.activate,
        inputTitle: this.data.title,
        inputContent: this.data.content,
        inputDeadline: this.data.deadline,
        deadlineEnabled: true
      }
    },
    watch: {
      type: function (val) {
        if (val == 'add') {
          this.headerTitle = '추가하기'
          this.acceptBtnText = '추가완료'
          this.initInputs()
        } else {
          this.headerTitle  = '수정하기'
          this.acceptBtnText = '수정완료'
        }
      },
      data: function (val) {
        this.inputTitle = val.title
        this.inputContent = val.content
        this.inputDeadline = val.deadline
      }
    },
    mounted() {
    },
    created() {
    },
    destoryed() {
    },
    methods: {
      initInputs () {
        this.inputTitle = ''
        this.inputContent = ''
        this.inputDeadline = new Date()
        this.deadlineEnabled = true
      },
      closeAction() {
        this.$emit('update:activate', false)
      },
      handleCloseClick(e) {
        this.closeAction()
      },
      handleSubmitClick(e) {
        var self = this
        var userId = this.$cookie.get('userId')
        var data = {
          title: this.inputTitle,
          content: this.inputContent,
          priority: this.data.priority,
          deadline: this.deadlineEnabled ? this.inputDeadline : null
        }


        if (this.type == 'add') {
          // 추가 액션
          this.$axios.post('/lists', data)
            .then(res => {
              self.$toast.show('할일을 추가하였습니다 (*≧▽≦)')
              self.$emit('success', this.type)
            })
            .catch(err => {
              self.$toast.show('할일을 추가하지 못했습니다 ( ´•̥̥̥ω•̥̥̥` )', {
                type: 'error'
              })
            })
            .finally(() => {
              self.initInputs()
              self.closeAction()
            });
        } else {
          // 수정 액션
          this.$axios.put('/lists/' + this.data.id, data)
            .then(res => {
              self.$toast.show('할일을 수정하였습니다 (*≧▽≦)')
              self.$emit('success', this.type)
            })
            .catch(err => {
              self.$toast.show('할일을 수정하지 못했습니다 ( ´•̥̥̥ω•̥̥̥` )', {
                type: 'error'
              })
            })
            .finally(() => {
              self.initInputs()
              self.closeAction()
            });
        }
      }
    }
  }
</script>

<style>
</style>
