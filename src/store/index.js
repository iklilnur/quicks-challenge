import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    posts:[],
    comments:[],
    currentUser: {
      id: 1,
      name: "Claren"
    },
    todos: [],
  },
  mutations: {
    async getAllPosts(state, config){
      await axios.get(`https://dummyapi.io/data/v1/post?page=${config.page}&limit=${config.limit}`, {
        headers:{
          'app-id': '6379cbdaadd78a8eb7b0b8d2'
        }
      }).then((response) => {
        state.posts = response.data.data
      })
    },
    async getCommentByPost(state, postId){
      await axios.get(`https://dummyapi.io/data/v1/post/${postId}/comment`, {
        headers:{
          'app-id': '6379cbdaadd78a8eb7b0b8d2'
        }
      }).then((response) => {
        console.log(response)
        state.comments = response.data.data
      })
    },
    async getTodosByUserId(state, userId){
      await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then((response) => {
        console.log(response.data)
        state.todos = response.data
      })
    }
  },
  
  actions: {
  },
  modules: {
  }
})
