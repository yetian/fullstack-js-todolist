import axios from 'axios'

export default {
  getTodoList: async function () {
    const resp = await axios.get('/api/todo')
    return resp.data
  },
  addTodo: async function (title) {
    const resp = await axios.post('/api/todo', {
      title: title
    })
    return resp.data
  },
  updateTodo: async function (id, title) {
    const resp = await axios.put(`/api/todo/${id}`, {
      title: title
    })
    return resp.data
  },
  deleteTodo: async function (id) {
    const resp = await axios.delete(`/api/todo/${id}`)
    return resp.data
  },
  setTodoDone: async function (id) {
    const resp = await axios.put(`/api/todo/${id}/set_done`)
    return resp.data
  },
  setTodoUndone: async function (id) {
    const resp = await axios.put(`/api/todo/${id}/set_undone`)
    return resp.data
  }
}
