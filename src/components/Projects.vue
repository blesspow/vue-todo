<template lang="pug">
panel(
  title="Projects"
)
  v-dialog(
    v-model="dialog"
  )
    v-card
      v-card-title
        h6 Create New Project
      v-card-text
        v-text-field.no-pad-top(
          label="Title"
          v-model="title"
          autofocus
          v-on:keydown.enter="onCreateProjectClick"
        )
        v-btn.text-xs-center(
          color="primary"
          @click="onCreateProjectClick"
        ) Create

  v-btn(
    slot="action"
    class="white"
    light
    medium
    absolute
    right
    middle
    fab
    @click.stop="dialog = true"
  )
    v-icon add

  .placeholder.mt-4(
    v-if="!projects.length"
  )
    img(
      src="../assets/arrow.png"
    )
    h6.instructions Create a New Project

  .project(
    v-for="project in projects"
    @click="selectProject(project)"
    :class="{selected: selectedProject === project}"
  )
    v-layout
      v-flex(xs9) {{project.title}}
      v-flex(xs2).text-xs-center
        v-progress-circular(
          v-bind:value="percentCompleted(project)"
          color="green"
        )
      v-flex.text-xs-center(x1)
        v-icon(
          v-if="selectedProject === project"
        ) keyboard_arrow_right
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      title: ''
    }
  },
  computed: {
    ...mapState('projects', [
      'projects',
      'selectedProject'
    ])
  },
  methods: {
    ...mapMutations('projects', [
      'createProject',
      'setSelectedProject'
    ]),
    onCreateProjectClick () {
      this.createProject(this.title)
      this.dialog = false
      this.title = ''
    },
    getTotalCompleted (project) {
      return project.tasks.reduce(
        (sum, task) => sum + (task.completed ? 1 : 0)
        , 0
      )
    },
    selectProject (project) {
      this.setSelectedProject(project)
    },
    percentCompleted (project) {
      return project.tasks.reduce(
        (sum, task) => sum + (task.completed ? 1 : 0)
        , 0
      ) / project.tasks.length * 100
    }
  },
  mounted () {
    if (this.projects.length) {
      this.selectProject(this.projects[0])
    }
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.project
  cursor: pointer
  padding-top: 10px
  padding-bottom: 10px
  padding-left: 0px
  font-size: 18px

.project:hover
  color: #cddc3a

.selected
  color: #4cae51

.instructions
  position: relative
  right: 14px
  top: 42px
  text-align: right

img
  float: right
  width: 100px
  position: relative
  top: -20px
  right: 10px

.placeholder
  min-height: 70px

</style>
