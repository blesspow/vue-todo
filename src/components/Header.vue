<template lang="pug">
v-toolbar.elevation-1.header.white(
  app
  fixed
  light
)
  v-toolbar-title.mr-4 VUE-TODO

  v-toolbar-items
    v-btn(
      flat
      color="grey"
      to="/welcome"
    )
      v-icon fiber_new

  v-spacer

  v-toolbar-items
    v-btn(
      flat
      color="grey"
    )
      v-icon fa-youtube-play

    v-btn(
      flat
      color="grey"
      href="https://github.com/codyseibert/vue-todo"
      target="_blank"
    )
      v-icon fa-github
</template>

<script>
export default {
}
</script>

<style scoped>
.header {
  z-index: 100;
  font-family: 'Quicksand', sans-serif
}
</style>
