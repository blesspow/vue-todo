<template lang="pug">
panel(
  :title="getSelectedProject().title"
  v-if="selectedProject"
)
  edit-project-modal(
    :display="isEditModalDisplayed"
    @closed="isEditModalDisplayed = false"
  )

  v-speed-dial(
    slot="action"
    v-model='fab'
    direction='left'
    light
    absolute
    right
    medium
  )
    v-btn(
      slot='activator'
      color='white'
      light
      fab
      v-model='fab'
    )
      v-icon more_vert
      v-icon close
    v-btn(fab
      dark
      small
      color='red'
      @click="deleteProject"
    )
      v-icon delete
    v-btn(fab
      light
      small
      color='yellow'
      @click="isEditModalDisplayed = true"
    )
      v-icon edit

  v-layout(column)
    v-flex.pt-3(
      xs12
    )
      h2 {{getTotalCompleted}} / {{getSelectedProject().tasks.length}} Completed
      v-progress-linear(
        v-model="percentCompleted"
        buffer
        v-bind:buffer-value="100"
      )
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import EditProjectModal from './EditProjectModal.vue'

export default {
  data () {
    return {
      fab: false,
      isEditModalDisplayed: false,
      title: ''
    }
  },
  computed: {
    ...mapState('boards', [
      'selectedProject',
      'projects'
    ]),
    getTotalCompleted () {
      return this.getSelectedProject().tasks.reduce(
        (sum, task) => sum + (task.completed ? 1 : 0)
        , 0
      )
    },
    percentCompleted () {
      return this.getSelectedProject().tasks.reduce(
        (sum, task) => sum + (task.completed ? 1 : 0)
        , 0
      ) / this.getSelectedProject().tasks.length * 100
    }
  },
  components: {
    EditProjectModal
  },
  methods: {
    ...mapMutations('boards', [
      'deleteProject'
    ]),
    getSelectedProject () {
      return this.projects[this.selectedProject]
    }
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.no-pad-top
  padding-top: 0px

.speed-dial
  margin-right: 0px !important
</style>
