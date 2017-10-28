<template lang="pug">
  router-view
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['theme'])
  },
  methods: {
    changeThemeClass () {
      return document.body.classList.toggle('dark')
    }
  },
  mounted () {
    const isDark = document.body.classList.contains('dark')
    if (this.theme === 'dark' && !isDark) return this.changeThemeClass()
  },
  watch: {
    'theme' () {
      this.changeThemeClass()
    }
  }
}
</script>

<style lang="sass">
*
  border: 0
  margin: 0
  padding: 0
  transition: background .4s ease
html
  font-size: 19px
body
  font-family: 'Neuton', serif
  font-size: 1rem
  line-height: 1.6
  background: #fff
  color: #000
  -webkit-font-smoothing: antialiased
  &.dark
    background: #313036
a
  color: inherit
  text-decoration: underline
.wrapper
  max-width: 690px
</style>
