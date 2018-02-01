<template lang="pug">
v-layout(row)
  v-flex.text-xs-center(
    xs12
    v-if="loading"
  ) 
    h2.loading Loading Your Board
    v-progress-circular(
      indeterminate 
      v-bind:size="200" 
      color="primary"
    )

  transition(
    name="fade"
  )
    v-flex.mr-4(
      xs4
      v-if="!loading"
    )
      projects
      v-alert.mt-4(
        color="error" 
        outline
        icon="warning" 
        :value="true"
      ) your board will be deleted after 7 days of inactivity

  transition(
    name="fade"
  )
    v-flex(
      xs8
      v-if="!loading && selectedProject"
    )
      v-layout(
        column
      )
        info.mb-2
        tasks
</template>

<script>
import Projects from './Projects.vue'
import Info from './Info.vue'
import Tasks from './Tasks.vue'
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapState('boards', [
      'selectedProject'
    ])
  },
  data () {
    return {
      interval: null,
      loading: true
    }
  },
  async mounted () {
    const boardToken = this.$store.state.route.params.boardToken
    await this.loadBoard(boardToken)
    setTimeout(() => {
      this.loading = false
    }, 400)
    this.interval = setInterval(() => {
      this.saveCurrentBoard(boardToken)
    }, 1000)
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapMutations('boards', [
      'setSelectedProject'
    ]),
    ...mapActions('boards', [
      'loadBoard',
      'saveCurrentBoard'
    ])
  },
  components: {
    Projects,
    Info,
    Tasks
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.loading
  margin-top: 100px
  margin-bottom: 40px
</style>
