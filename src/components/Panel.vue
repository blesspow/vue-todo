<template lang="pug">
.white.elevation-2
  v-toolbar(
    flat
    dense
    dark
    :class="color"
  )
    v-toolbar-title {{title}}
    slot(name="action")

  .pl-4.pr-4.pt-2.pb-2
    slot No slot content defined.
</template>

<script>
export default {
  props: {
    title: String,
    color: {
      default: 'green',
      type: String
    }
  }
}
</script>

<style scoped>
</style>
