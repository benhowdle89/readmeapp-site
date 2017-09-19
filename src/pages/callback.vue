<template lang="pug">
  h1 Callback
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['oAuthTokenSecret'])
  },
  methods: {
    ...mapActions(['requestAccessToken'])
  },
  async mounted () {
    const { query: { oauth_token, oauth_verifier } } = this.$route
    await this.requestAccessToken({
      oAuthToken: oauth_token,
      oAuthTokenSecret: this.oAuthTokenSecret,
      oAuthVerifier: oauth_verifier
    })
    this.$router.push('/')
  }
}
</script>
