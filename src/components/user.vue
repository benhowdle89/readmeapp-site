<template lang="pug">
  .user.flex.items-center
    profile-picture.mr2(:user="user", size="small")
    el-button(@click="logout") Sign Out
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProfilePicture from './profile-picture'
export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout'])
  },
  components: { ProfilePicture }
}
</script>
