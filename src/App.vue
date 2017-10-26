<template lang="pug">
  router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
*
  border: 0
  margin: 0
  padding: 0
html
  font-size: 19px
body
  font-family: 'Neuton', serif
  font-size: 1rem
  line-height: 1.6
  background: #fff
  color: #000
  -webkit-font-smoothing: antialiased
a
  color: inherit
  text-decoration: underline
.wrapper
  max-width: 690px
</style>
