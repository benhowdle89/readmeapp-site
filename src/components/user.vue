<template lang="pug">
  .user.flex.items-center
    img.profile.mr3(:src="profileImage")
    el-button(@click="logout") Sign Out
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
    profileImage () { return this.user.profile_image.replace(/_normal/, '') }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="sass" scoped>
.profile
  max-width: 42px
  border-radius: 8px
</style>

