<template lang="pug">
  .switcher(@click="switchTheme")
    icon.sun(glyph="#sun")
    .switch-bar
      .switch-indicator
    icon.moon(glyph="#moon")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import icon from './icon'
import Moon from '../img/moon.svg'
import Sun from '../img/sun.svg'
export default {
  computed: {
    ...mapState(['theme']),
    buttonText () {
      return `Switch to ${this.theme == 'light' ? 'dark' : 'light'}`
    }
  },
  methods: {
    ...mapActions(['switchTheme'])
  },
  components: {
    icon,
  },
  data() {
    return { Moon }
  }
}
</script>

<style lang="sass">
  .switcher
    margin-top: .5em
    cursor: pointer
    vertical-align: middle
    line-height: 0

  .switcher
  .switch-bar
    width: 30px
    height: 11px;
    border-radius: 99em
    background: #EDEDED
    border: 1px solid #C8C8C8
    position: relative
    display: inline-block
    margin-left: 15px
    margin-right: 15px
    vertical-align: middle
  
  .switch-indicator
    position: absolute
    left: 0
    top: -3px
    transform: translateX(-7px)
    width: 18px
    height: 18px
    border-radius: 99em
    background-color: black
    transition: all .5s ease
  
  .switcher
    svg
      width: 20px
      height: 20px
      line-height: 0
      vertical-align: middle
    
    .moon
      width: 18px
      height: 18px
    
  svg path
    fill: black
    transition: all .5s ease
  
  [id^=logo] path
    fill: #7994E5
</style>
<style lang="sass">
  .dark
    .switcher
      .switch-bar
        background: black
        border-color: black

      .switch-indicator
        background-color: white
        transform: translateX(17px)
      
    svg path
      fill: #EDEDED
    
    [id^=logo] path
      fill: #7994E5
</style>
