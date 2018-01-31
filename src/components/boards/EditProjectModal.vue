<template lang="pug">
v-dialog(
  v-model="display"
)
  v-card
    v-card-title
      h6 Edit Project Title
    v-card-text
      v-text-field(
        autofocus
        v-if="display"
        label="Title"
        v-model="title"
        v-on:keydown.enter="updateProjectTitleLocal"
      )
      v-btn.text-xs-center(
        color="primary"
        @click="updateProjectTitleLocal"
      ) Save
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  props: [
    'display'
  ],
  data () {
    return {
      _title: null
    }
  },
  computed: {
    ...mapState('boards', [
      'selectedProject'
    ]),
    title: {
      get () {
        return this.selectedProject.title
      },
      set (newTitle) {
        this._title = newTitle
      }
    }
  },
  methods: {
    ...mapMutations('boards', [
      'updateProjectTitle'
    ]),
    updateProjectTitleLocal () {
      this.updateProjectTitle(this._title)
      this.$emit('closed')
    }
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
</style>
