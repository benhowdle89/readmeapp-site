<template lang="pug">
  .user.flex.items-center
    lists
    //profile-picture.mr2(:user="user", size="small")
    el-button.sign-out(@click="logout") Sign Out
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProfilePicture from "./profile-picture";
import Lists from "./lists";
export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["logout"])
  },
  components: { ProfilePicture, Lists }
};
</script>

<style lang="sass" scoped>
.sign-out
  border: 1px solid #7994E5
  color: #7994E5
  background: transparent
</style>

