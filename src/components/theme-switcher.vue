<template lang="pug">
  el-button(@click="switchTheme") {{ buttonText }}
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
