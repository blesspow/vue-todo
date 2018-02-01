import axios from 'axios'
import * as _ from 'lodash'
import * as uuid from 'node-uuid'

let lastState = null

export default {
  state: {
    selectedProject: null,
    projects: {}
  },
  namespaced: true,
  actions: {
    async createBoard ({commit, store}) {
      const projectUrl = (
        await axios.post(`https://api.keyvalue.xyz/new/board`)
      ).data
      const [, boardToken] = projectUrl.split('/').reverse()
      return boardToken
    },
    async loadBoard ({commit, s}, boardToken) {
      let boardData = (
        await axios.get(`https://api.keyvalue.xyz/${boardToken}/board`)
      ).data
      if (typeof boardData === 'string') {
        boardData = {
          selectedProject: null,
          projects: {}
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
  getters: {
    getSelectedProject (state) {
      return state.projects[state.selectedProject]
    },
    isSelectedProject: (state) => (project) => {
      return project.id === state.selectedProject
    },
    hasProjects (state) {
      return Object.values(state.projects).length
    },
    projects (state) {
      return Object.values(state.projects)
    }
  },
  mutations: {
    setBoard (state, board) {
      Object.assign(state, board)
    },
    setProjects (state, projects) {
      state.projects = projects
    },
    setSelectedProject (state, project) {
      state.selectedProject = project.id
    },
    toggleTaskCompleted (state, task) {
      task.completed = !task.completed
    },
    updateTaskDescription (state, message) {
      message.task.description = message.description
    },
    deleteTask (state, task) {
      state.projects[state.selectedProject].tasks.splice(
        state.projects[state.selectedProject].tasks.indexOf(task), 1
      )
    },
    createTask (state) {
      state.projects[state.selectedProject].tasks.push({
        id: uuid.v4(),
        description: '',
        completed: false
      })
    },
    createProject (state, title) {
      const id = uuid.v4()
      state.projects = {
        ...state.projects,
        [id]: {
          id,
          title: title,
          tasks: []
        }
      }
      state.selectedProject = id
    },
    deleteProject (state) {
      state.projects = _.omit(state.projects, state.selectedProject)
      state.selectedProject = null
      if (state.projects.length) {
        state.selectedProject = state.projects[0].id
      }
    },
    updateProjectTitle (state, title) {
      state.projects[state.selectedProject].title = title
    },
    setProjectTasks (state, tasks) {
      state.projects[state.selectedProject].tasks = tasks
    }
  }
}
