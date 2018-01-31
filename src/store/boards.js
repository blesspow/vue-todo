import axios from 'axios'
import * as _ from 'lodash'
import * as uuid from 'node-uuid'

let lastState = null

export default {
  state: {
    selectedProject: null,
    projects: []
  },
  namespaced: true,
  actions: {
    async createBoard ({commit, store}) {
      const projectUrl = (
        await axios.post(`https://api.keyvalue.xyz/new/board`)
      ).data
      const [, boardToken] = projectUrl.split('/').reverse()
      commit('addProject', boardToken)
      return boardToken
    },
    async loadBoard ({commit, s}, boardToken) {
      let boardData = (
        await axios.get(`https://api.keyvalue.xyz/${boardToken}/board`)
      ).data
      if (typeof boardData === 'string') {
        boardData = {
          selectedProject: null,
          projects: []
        }
      }
      commit('setBoard', boardData)
    },
    async saveCurrentBoard ({state}, boardToken) {
      const stateJson = JSON.parse(JSON.stringify(state))
      if (!_.isEqual(stateJson, lastState)) {
        lastState = stateJson
        await axios.post(`https://api.keyvalue.xyz/${boardToken}/board`, stateJson)
      }
    }
  },
  mutations: {
    setBoard (state, board) {
      Object.assign(state, board)
    },
    addProject (state, projectUrl) {
      state.projects[projectUrl] = {}
    },
    setProjects (state, projects) {
      state.projects = projects
    },
    setSelectedProject (state, project) {
      state.selectedProject = project
    },
    toggleTaskCompleted (state, task) {
      task.completed = !task.completed
    },
    updateTaskDescription (state, message) {
      message.task.description = message.description
    },
    deleteTask (state, task) {
      state.selectedProject.tasks.splice(state.selectedProject.tasks.indexOf(task), 1)
    },
    createTask (state) {
      state.selectedProject.tasks.push({
        id: uuid.v4(),
        description: '',
        completed: false
      })
    },
    createProject (state, title) {
      state.projects.push({
        title: title,
        tasks: []
      })
      state.selectedProject = state.projects[state.projects.length - 1]
    },
    deleteProject (state) {
      state.projects.splice(state.projects.indexOf(state.selectedProject), 1)
      state.selectedProject = null
      if (state.projects.length) {
        state.selectedProject = state.projects[0]
      }
    },
    updateProjectTitle (state, title) {
      state.selectedProject.title = title
    },
    setProjectTasks (state, tasks) {
      state.selectedProject.tasks = tasks
    }
  }
}
