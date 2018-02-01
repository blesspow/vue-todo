<template lang="pug">
v-dialog(
  v-model="display"
  persistent
  max-width="290"
)
  v-card
    v-card-title
      h2 Edit Project Title
    v-card-text
      v-text-field(
        autofocus
        v-if="display"
        label="Title"
        v-model="title"
        v-on:keydown.native.enter="updateProjectTitleLocal"
      )
      v-btn.text-xs-center(
        color="primary"
        @click="updateProjectTitleLocal"
      ) Save
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'

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
        return this.getSelectedProject().title
      },
      set (newTitle) {
        console.log('newTitle', newTitle)
        this._title = newTitle
      }
    }
  },
  methods: {
    ...mapMutations('boards', [
      'updateProjectTitle'
    ]),
    ...mapGetters('boards', [
      'getSelectedProject'
    ]),
    updateProjectTitleLocal () {
      console.log(this._title)
      this.updateProjectTitle(this._title)
      this.$emit('closed')
    }
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
</style>
