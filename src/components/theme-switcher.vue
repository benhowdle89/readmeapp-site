<template lang="pug">
  .switcher(@click="switchTheme")
    .switch-bar
      .switch-indicator
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['theme']),
    buttonText () {
      return `Switch to ${this.theme == 'light' ? 'dark' : 'light'}`
    }
  },
  methods: {
    ...mapActions(['switchTheme'])
  }
}
</script>

<style lang="sass">
  .switcher
    margin-top: .5em

  .switcher
  .switch-bar
    width: 30px
    height: 11px;
    border-radius: 99em
    background: #EDEDED
    border: 1px solid #C8C8C8
    position: relative
  
  .switch-indicator
    position: absolute
    left: 0
    top: -3px
    transform: translateX(17px)
    width: 18px
    height: 18px
    border-radius: 99em
    background-color: black
    transition: all .5s ease

  .dark
    .switcher
    .switch-bar
      background: black
      border-color: black

    .switch-indicator
      background-color: white
      transform: translateX(-7px)
</style>
