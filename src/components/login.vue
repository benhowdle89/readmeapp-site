<template lang="pug">
  .login.my2(v-loading="tokenRequestLoading")
    el-button(type="primary", @click="handleSignIn") Sign in with Twitter
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { twitterOAuthURL } from './../helpers'
export default {
  computed: {
    ...mapState(['oAuthToken', 'oAuthTokenSecret', 'tokenRequestLoading'])
  },
  methods: {
    ...mapActions(['requestToken']),
    async handleSignIn () {
      await this.requestToken().catch(error => this.$message.error('Error fetching token'))
      this.oAuthToken && (window.location.href = twitterOAuthURL(this.oAuthToken))
    }
  }
}
</script>
