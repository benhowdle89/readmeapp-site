<template lang="pug">
  .nav-bar
    .flex.justify-between.justify-center.max-width-3.mx-auto.py2
      .logo(v-loading="tweetsLoading", @click="scrollToTop")
        icon(glyph="#logo")
      theme-switcher(v-if="user")
      user(v-if="user")
</template>

<script>
import { mapState } from 'vuex'
import User from './user'
import ThemeSwitcher from './theme-switcher'
import icon from './icon'
import Logo from '../img/logo.svg'
export default {
  computed: {
    ...mapState(['user', 'tweetsLoading'])
  },
  components: { User, ThemeSwitcher, icon },
  data() {
    return { Logo }
  },
  methods: {
    scrollToTop () { this.$SmoothScroll(0,500) }
  }
}
</script>

<style lang="sass" scoped>
.nav-bar
  border-bottom: 1px solid rgba(121, 148, 229, 0.23)
  position: fixed
  width: 100%
  top: 0
  z-index: 99
  background: white
  padding-left: 20px
  padding-right: 20px
.logo
  cursor: pointer
.logo svg
  height: 14px
  width: 72px
  margin-top: .55em
</style>

<style lang="sass">
.dark
  .nav-bar
    background: #28272C
    .el-loading-mask
      background: transparent !important
</style>
