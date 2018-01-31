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
      dark
      to="/welcome"
    )
      v-icon fiber_new

  v-spacer

  v-toolbar-items
    v-btn(
      flat
      dark
    )
      v-icon fa-youtube-play
    v-btn(
      flat
      dark
      href="https://github.com/codyseibert/vue-todo"
      target="_blank"
    )
      v-icon fa-github
    v-btn(
      flat
      dark
      to="/about"
    )
      v-icon info
</template>

<script>
export default {
}
</script>

<style scoped>
.header {
  z-index: 100;
}
</style>
