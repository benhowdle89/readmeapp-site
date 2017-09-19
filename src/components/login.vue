<template lang="pug">
  .login
    h1 login
    button(@click="handleSignIn") sign in with twitter
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { twitterOAuthURL } from './../helpers'
export default {
  computed: {
    ...mapState(['oAuthToken', 'oAuthTokenSecret'])
  },
  methods: {
    ...mapActions(['requestToken']),
    async handleSignIn () {
      await this.requestToken()
      window.location.href = twitterOAuthURL(this.oAuthToken)
    }
  }
}
</script>
