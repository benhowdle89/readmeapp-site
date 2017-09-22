<template lang="pug">
  .user
    h2 {{ user.name }}
    button(@click="logout") Logout
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
