<template lang="pug">
  .nav-bar
    .flex.justify-between.justify-center.max-width-3.mx-auto.py2
      h1 Readme App
      user(v-if="user")
</template>

<script>
import { mapState } from 'vuex'
import User from './user'
export default {
  computed: {
    ...mapState(['user'])
  },
  components: { User }
}
</script>

<style lang="sass" scoped>
.nav-bar
  border-bottom: 1px solid rgba(121, 148, 229, 0.23)
</style>

