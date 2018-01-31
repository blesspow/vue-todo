<template lang="pug">
#app
  v-app
    page-header

    main
      v-content
        v-container(fluid)
          router-view

    v-footer.pa-3(
      app
    )
      div.text-xs-center 
        span Terms of Service
        span Privacy Policy
      v-spacer
      div © {{ new Date().getFullYear() }}
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
</style>
