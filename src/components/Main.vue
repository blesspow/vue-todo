<template lang="pug">
v-layout(row)
  v-flex.mr-4(xs4)
    projects

  v-flex(
    xs8
    v-if="selectedProject"
  )
    v-layout(
      column
    )
      info.mb-2
      tasks
</template>

<script>
import Projects from '@/components/Projects.vue'
import Info from '@/components/Info.vue'
import Tasks from '@/components/Tasks.vue'
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('projects', [
      'selectedProject'
    ])
  },
  components: {
    Projects,
    Info,
    Tasks
  }
}
</script>

<style scoped>

</style>
