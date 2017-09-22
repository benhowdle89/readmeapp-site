<template lang="pug">
  .max-width-4.mx-auto.p4
    h1.mb3 Readme App
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
html
  font-size: 14px
body
  font-family: -apple-system, BlinkMacSystemFont, sans-serif
  font-size: 1rem
  line-height: 2rem
  background: #fff
  color: #000
a
  color: inherit
  text-decoration: underline
</style>
