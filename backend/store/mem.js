// todo: title, added_timestamp, updated_timestamp, is_done
const hash = require('object-hash')

// https://discuss.codecademy.com/t/anonymous-arrow-functions-and-modules/536368/5
module.exports = {
  todo_list: [],
  getAllTasks: function() {
    return [...this.todo_list]
  },
  getDoneTasks: function() {
    return this.todo_list.filter(todo => todo.is_done === true)
  },
  getUndoneTasks: function() {
    return this.todo_list.filter(todo => todo.is_done === false)
  },
  getTaskById: function(id) {
    let existedTodo = this.todo_list.find(todo => todo.id === id)
    if (existedTodo) {
      return Object.assign({}, existedTodo)
    }
    throw new Error(`Todo with id: ${id} does not exist.`)
  },
  add: function(title) {
    let newTodo = {
      id: undefined,
      added_timestamp: new Date(),
      updated_timestamp: new Date(),
      title: title,
      is_done: false
    }
    let id = hash(newTodo)
    newTodo.id = id
    this.todo_list.push(newTodo)
    return Object.assign({}, newTodo)
  },
  update: function(id, title) {
    let existedTodo = this.todo_list.find(todo => todo.id === id)
    if (existedTodo) {
      existedTodo.title = title
      existedTodo.updated_timestamp = new Date()
      return Object.assign({}, existedTodo)
    }
    throw new Error(`Todo with id: ${id} does not exist.`)
  },
  setDone: function(id) {
    let existedTodo = this.todo_list.find(todo => todo.id === id)
    if (existedTodo) {
      existedTodo.is_done = true
      existedTodo.updated_timestamp = new Date()
      return Object.assign({}, existedTodo)
    }
    throw new Error(`Todo with id: ${id} does not exist.`)
  },
  setUndone: function(id) {
    let existedTodo = this.todo_list.find(todo => todo.id === id)
    if (existedTodo) {
      existedTodo.is_done = false
      existedTodo.updated_timestamp = new Date()
      return Object.assign({}, existedTodo)
    }
    throw new Error(`Todo with id: ${id} does not exist.`)
  },
  delete: function(id) {
    let existedTodo = this.todo_list.find(todo => todo.id === id)
    if (existedTodo) {
      let copyTodo = Object.assign({}, existedTodo)
      this.todo_list = this.todo_list.filter(todo => todo.id !== id)
      return copyTodo
    }
    throw new Error(`Todo with id: ${id} does not exist.`)
  }
}