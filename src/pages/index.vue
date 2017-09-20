<template lang="pug">
  .index
    timeline(v-if="user")
    login(v-else)
</template>

<script>
import { mapState } from 'vuex'
import Login from './../components/login'
import Timeline from './../components/timeline'
export default {
  computed: {
    ...mapState(['user'])
  },
  components: { Login, Timeline }
}
</script>
