<template lang="pug">
  .index
    nav-bar(v-if="user")
    timeline(v-if="user")
    login(v-else)
</template>

<script>
import { mapState } from 'vuex'
import Login from './../components/login'
import Timeline from './../components/timeline'
import NavBar from './../components/nav-bar'
export default {
  computed: {
    ...mapState(['user'])
  },
  components: { Login, Timeline, NavBar }
}
</script>
