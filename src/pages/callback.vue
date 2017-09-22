<template lang="pug">
  h1(v-loading="accessTokenLoading") Callback
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['oAuthToken', 'oAuthTokenSecret', 'accessTokenLoading'])
  },
  methods: {
    ...mapActions(['requestAccessToken'])
  },
  async mounted () {
    const { query: { oauth_token, oauth_verifier } } = this.$route
    if (!oauth_token || !oauth_verifier || !this.oAuthTokenSecret || this.oAuthToken !== oauth_token) {
      return this.$router.push('/')
    }
    await this.requestAccessToken({
      oAuthToken: oauth_token,
      oAuthTokenSecret: this.oAuthTokenSecret,
      oAuthVerifier: oauth_verifier
    }).catch(error => this.$message.error('Error fetching token'))
    this.$router.push('/')
  }
}
</script>
