<template>
  <div>
    <h1>Todo</h1>
    <input v-model="title" class="todo-title" placeholder="What do you want to do today?"/>
    <button class="todo-add-button" @click="add()">Add</button>
    <h2>Your todo list</h2>
    <div v-if="todoList.length === 0">
      Your todo list is empty. Add one.
    </div>
    <div v-else style="width: 500px; text-align:left; margin: 0 auto;">
      <ul>
        <li v-for="(todo, index) in todoList" :key="index">
          <div class="container">
            <div>
              <span :class="isDone(todo.is_done)">{{ todo.title }} </span><br/>
              <span style="font-size: 10px;">Added: {{ todo.added_timestamp }}</span>
            </div>
            <div>
              <!-- https://www.compart.com/ -->
              <button class="todo-action-button" v-if="!todo.is_done" @click="update(todo.id)">🖉</button>
              <button class="todo-action-button" v-if="!todo.is_done" @click="setDone(todo.id)">🗹</button>
              <button class="todo-action-button" v-if="todo.is_done" @click="setUndone(todo.id)">⭯</button>
              <button class="todo-action-button" v-if="!todo.is_done" @click="deleteTodo(todo.id)">x</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api.js'

export default {
  name: 'TodoList',
  data () {
    return {
      title: '',
      todoList: []
    }
  },
  methods: {
    getTodoList: async function () {
      try {
        this.todoList = await api.getTodoList()
        this.todoList.sort((x, y) => {
          return new Date(y.added_timestamp).getTime() - new Date(x.added_timestamp).getTime()
        })
      } catch (error) {
        alert(error)
      }
    },
    add: async function () {
      if (this.title && this.title.trim() !== '') {
        try {
          await api.addTodo(this.title)
          this.getTodoList()
          this.title = ''
        } catch (error) {
          alert(error)
        }
      }
    },
    update: async function (id) {
      const newTitle = window.prompt('Update this todo to...')
      if (newTitle && newTitle.trim() !== '') {
        try {
          await api.updateTodo(id, newTitle)
          this.getTodoList()
        } catch (error) {
          alert(error)
        }
      }
    },
    setDone: async function (id) {
      try {
        await api.setTodoDone(id)
        this.getTodoList()
      } catch (error) {
        alert(error)
      }
    },
    setUndone: async function (id) {
      try {
        await api.setTodoUndone(id)
        this.getTodoList()
      } catch (error) {
        alert(error)
      }
    },
    deleteTodo: async function (id) {
      try {
        await api.deleteTodo(id)
        this.getTodoList()
      } catch (error) {
        alert(error)
      }
    },
    isDone: function (val) {
      if (val) {
        return 'todo-is-done'
      }
      return ''
    }
  },
  mounted () {
    this.getTodoList()
  }
}
</script>

<style scoped>
.todo-title {
  width: 420px;
  height: 35px;
  border:none;
  border-bottom: 1px dashed #999;
}

.todo-title:focus {
  outline: none;
  border:none;
  border-bottom: 1px solid #111;
}

.todo-add-button {
  margin-left: 10px;
  padding: 10px 20px;
}

.todo-action-button {
  margin-left: 10px;
  height: 32px;
  width: 32px;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
}

.container:hover {
  background-color: #eee;
}

.todo-is-done {
  color: #999;
  text-decoration: line-through;
}
</style>
