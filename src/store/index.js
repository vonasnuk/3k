import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      toDoList: [
          {taskName: 'Task 1', executionDate: '2021-07-07', description: 'Описание задачи', user: 'Leanne Graham', status: 'Готово', id: 1},
          {taskName: 'Task 32', executionDate: '2022-07-11', description: 'Описание задачи', user: 'Leanne Graham', status: 'Готово', id: 1},
          {taskName: 'Task 2', executionDate: '2021-04-12', description: 'Описание задачи', user: 'Clementine Bauch', status: 'В процессе', id: 3},
          {taskName: 'Task 3', executionDate: '2021-09-12', description: 'Описание задачи', user: 'Mrs. Dennis Schulist', status: 'В процессе', id: 7},
          {taskName: 'Task 3', executionDate: '2021-09-14', description: 'Описание задачи', user: 'Mrs. Dennis Schulist', status: 'В процессе', id: 7},
      ],
      userList:[
          {name: 'Leanne Graham', id: 1},
          {name: 'Ervin Howell', id: 2},
          {name: 'Clementine Bauch', id: 3},
          {name: 'Patricia Lebsack', id: 4},
          {name: 'Chelsey Dietrich', id: 5},
          {name: 'Kurtis Weissnat', id: 6}
      ]
  },
  mutations: {
      updateTasks (state, task){
          state.toDoList.push(task)
      }

  },
  actions: {
      addTask({commit}, task){
          commit('updateTasks', task)
      },
  },
  getters: {
      getTaskList: state => {
          return state.toDoList
      },
      getUserList: state => {
          return state.userList
      },
      getListById: state => (id) => {
          let task = state.toDoList.filter(el => {
              return el.id === id
          })
          return task
      },
      searchItem: state => (string) => {
          let searchItem = []
          state.toDoList.forEach(task => {
              if ((task.taskName.indexOf(string))+1){
                  searchItem.push(task)
              }
          })
          return searchItem
      }

  }
})
