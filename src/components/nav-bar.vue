<template lang="pug">
  .nav-bar
    .flex.justify-between.justify-center.max-width-3.mx-auto.py2
      h1 Readme App
      theme-switcher
      user(v-if="user")
</template>

<script>
import { mapState } from 'vuex'
import User from './user'
import ThemeSwitcher from './theme-switcher'
export default {
  computed: {
    ...mapState(['user'])
  },
  components: { User, ThemeSwitcher }
}
</script>

<style lang="sass" scoped>
.nav-bar
  border-bottom: 1px solid rgba(121, 148, 229, 0.23)
</style>

<style lang="sass">
.dark
  .nav-bar
    background: rgba(0,0,0,0.17)
</style>
