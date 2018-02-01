<template lang="pug">
#app
  v-app
    page-header

    v-content
      v-container(fluid)
        router-view

    v-footer.pa-3(
      app
    )
      router-link(
        to="/privacy"
      ) Privacy Policy
      v-spacer
      div Cody Seibert © {{ new Date().getFullYear() }}
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>
body {
  font-family: 'Quicksand', sans-serif
}

ul, li, p, h1, h2, h3, h4, h5, h6, .toolbar__title, .alert, a, .footer, .input-group__input, input {
  font-family: 'Quicksand', sans-serif;
  font-weight: normal;
}
</style>
