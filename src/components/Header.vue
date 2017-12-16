<template lang="pug">
v-toolbar.elevation-1.header.green.darken-1(
  app
  fixed
  dark
)
  v-toolbar-title.mr-4 VUE-TODO

  v-toolbar-items
    v-btn(
      flat
      dark
      to="/"
    )
      v-icon playlist_add_check

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
