<template lang="pug">
  .user
    h2.mb2 {{ user.name }}
    el-button(@click="logout") Logout
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
