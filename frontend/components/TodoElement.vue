<template>
  <div class="todo-element">
    <div class="todo-element__priority">
      {{ priority }}
    </div>
    <div class="todo-element__priority">
      <div class="todo-element__inc-btn btn" @click="handleIncPriority">
        <v-icon name="arrow-up"/>
      </div>
      <div class="todo-element__dec-btn btn" @click="handleDecPriority">
        <v-icon name="arrow-down"/>
      </div>
    </div>
    <div class="todo-element__container">
      <div :class="{'todo-element__todo-btn': true, 'btn': true, 'is-completed': todoFlag == true}" @click="handleTodoClick">
        <v-icon v-if="todoFlag == true" name="check-circle"/>
        <v-icon v-else name="circle"/>
      </div>
      <div class="todo-element__contents">
        <div class="todo-element__title">{{title}}</div>
        <div class="todo-element__summary">{{summary}}</div>
      </div>
      <div class="todo-element__deadline">{{deadlineText}}</div>
    </div>
    <div class="todo-element__control">
      <div class="todo-element__edit-btn btn" @click="handleEditClick">
        <v-icon name="pen"/>
      </div>
      <div class="todo-element__delete-btn btn" @click="handleDeleteClick">
        <v-icon name="trash-alt"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TodoElement',
    components: {
    },
    props: {
      id: {
        type: Number,
        required: true
      },
      todo: {
        type: Boolean,
        required: false
      },
      title: {
        type: String,
        default: '제목 없음'
      },
      content: {
        type: String,
        default: '내용 없음'
      },
      deadline: {
        type: String,
        default: null
      },
      priority: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        todoFlag: this.todo,
        priorityValue: this.priority
      }
    },
    computed: {
      summary() {
        return this.content;
      },
      deadlineText() {
        if (this.deadline == null) {
          return '기한 없음'
        }

        var targetDate = this.$moment(this.deadline)
        var fromDate = this.$moment(new Date())
        var days = Math.floor(this.$moment.duration(fromDate.diff(targetDate)).asDays())
        if (days > 0) {
          this.$toast.show("'" + this.title + "' 마감기한이 " + days + "일 지났습니다  ༼◉_◉ ༽ "  , {
            theme: "outline"
          })
          return 'D+' + days;
        } else if (days < 0) {
          return 'D' + days;
        } else {
          return '오늘 까지'
        }
      }
    },
    watch: {},
    mounted() {
    },
    created() {
    },
    destoryed() {
    },
    methods: {
      updateData(data) {
        var newData = Object.assign({
          todo: this.todo,
          title: this.title,
          content: this.content,
          deadline: this.deadline,
          priority: this.priority
        }, data)

        return this.$axios.put('/lists/' + this.id, newData)
      },
      handleEditClick() {
        this.$emit('edit', {
          id: this.id,
          todo: this.todo,
          title: this.title,
          content: this.content,
          deadline: this.deadline,
          priority: this.priority,
        })
      },
      handleDeleteClick() {
        var self = this
        this.$axios.delete('/lists/' + this.id)
          .then(res => {
            self.$toast.show('할일을 삭제하였습니다 (*≧▽≦)')
          })
          .catch(err => {
            self.$toast.show('할일을 삭제하지 못했습니다 ( ´•̥̥̥ω•̥̥̥` )', {
              type: 'error'
            })
          })
          .finally(() => {
            self.$emit('refresh')
          })
      },
      handleTodoClick() {
        var self = this
        var todo = !this.todoFlag
        this.updateData({
          todo: todo
        })
          .then(res => {
            if (todo) {
              self.$toast.show('할일을 완료하였습니다 ٩(^ᴗ^)۶')
            } else {
              self.$toast.show('할일을 다시 시작합니다 ٩(◦`꒳´◦)۶')
            }
          })
          .catch(err => {
            self.$toast.show('할일을 완료하는 중 오류가 발생하였습니다 ( ´•̥̥̥ω•̥̥̥` )', {
              type: 'error'
            })
          })
          .finally(() => {
            self.todoFlag = todo
          })
      },
      handleIncPriority() {
        var self = this
        if (this.priorityValue >= 9) {
          this.$toast.show('우선순위는 10이상으로 설정할 수 없어요 (ó﹏ò｡)', {
            type: 'error'
          })
          return
        }
        this.updateData({
          priority: ++this.priorityValue
        })
          .catch(err => {
            self.$toast.show('우선순위 설정 도중 오류가 발생하였습니다 ( ´•̥̥̥ω•̥̥̥` )', {
              type: 'error'
            })
          })
          .finally(() => {
            self.$emit('refresh')
          })
      },
      handleDecPriority() {
        var self = this
        if (this.priorityValue <= -9) {
          this.$toast.show('우선순위는 -10이하로 설정할 수 없어요 (ó﹏ò｡)', {
            type: 'error'
          })
          return
        }
        this.updateData({
          priority: --this.priorityValue
        })
          .catch(err => {
            self.$toast.show('우선순위 설정 도중 오류가 발생하였습니다 ( ´•̥̥̥ω•̥̥̥` )', {
              type: 'error'
            })
          })
          .finally(() => {
            self.$emit('refresh')
          })

      }
    }
  }
</script>

<style>
</style>
