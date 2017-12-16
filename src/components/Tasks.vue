<template lang="pug">
panel(
  title="Tasks"
)
  v-btn(
    slot="action"
    class="light-green lighten-3"
    light
    medium
    absolute
    right
    middle
    fab
    @click="createTask"
  )
    v-icon add
  .placeholder.mt-4(
    v-if="!tasks.length"
  )
    img(
      src="../assets/arrow.png"
    )
    h6.instructions Create a New Task
  .pt-4
    draggable(
      v-model="tasks"
    )
      .task.mb-4(
        :key="index"
        v-for="(task, index) in tasks"
      )
        v-layout
          v-flex(xs1)
            v-icon.pointer drag_handle
          v-flex(xs1)
            v-icon.checkbox(
              @click="toggleTaskCompleted(task)"
            ) {{task.completed ? "check_box" : "check_box_outline_blank"}}
          v-flex(
            xs8
          )
            v-text-field.no-pad-top.up(
              single-line
              :value="task.description || 'edit your task description here'"
              @input="(value) => { updateTaskDescription({task: task, description: value}) }"
            )
          v-flex.text-xs-center(
            xs2
          )
            v-icon.cancel(
              @click="deleteTask(task)"
            ) cancel
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import draggable from 'vuedraggable'

export default {
  computed: {
    ...mapState('projects', [
      'selectedProject'
    ]),
    tasks: {
      get () {
        return this.selectedProject.tasks
      },
      set (tasks) {
        this.setProjectTasks(tasks)
      }
    }
  },
  methods: {
    ...mapMutations('projects', [
      'toggleTaskCompleted',
      'updateTaskDescription',
      'deleteTask',
      'createTask',
      'setProjectTasks'
    ])
  },
  components: {
    draggable
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.checkbox
  cursor: pointer

.cancel
  cursor: pointer

.description
  cursor: pointer

.no-pad-top
  padding-top: 0px

.pointer
  cursor: pointer

.up
  top: -3px

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
</style>
