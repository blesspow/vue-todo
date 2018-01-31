<template lang="pug">
v-layout(row)
  v-flex.text-xs-center(xs12)
    h3 Creating Your Board
    v-progress-circular(
      indeterminate 
      v-bind:size="200" 
      color="primary"
    )
</template>

<script>
import {mapActions} from 'vuex'

export default {
  async mounted () {
    const boardToken = await this.createBoard()
    setTimeout(() => {
      this.$router.push({name: 'Boards', params: {boardToken}})
    }, 1200)
  },
  methods: {
    ...mapActions('boards', [
      'createBoard'
    ])
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
h3
  margin-top: 100px
  margin-bottom: 40px
</style>
