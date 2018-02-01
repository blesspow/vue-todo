<template lang="pug">
v-dialog(
  v-model="display"
  persistent
  max-width="290"
)
  v-card.mt-2
    v-card-title
      h2 Create Project
    v-card-text
      v-text-field(
        autofocus
        v-if="display"
        label="Title"
        v-model="title"
        v-on:keydown.native.enter="onCreateProjectClick"
      )
      v-btn.text-xs-center(
        color="green"
        dark
        @click="onCreateProjectClick"
      ) Create
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  props: [
    'display'
  ],
  data () {
    return {
      title: null
    }
  },
  methods: {
    ...mapMutations('boards', [
      'createProject'
    ]),
    onCreateProjectClick () {
      this.createProject(this.title)
      this.$emit('closed')
      this.title = ''
    }
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
</style>
