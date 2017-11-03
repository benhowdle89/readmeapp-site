<template lang="pug">
  .login
    .hero
      .inner.mxa.flex.flex-stretch
        .copy.flex.flex-end
          .copy-wrap.flex-auto
            h1.tagline Tweets. Without the bullshit.
            p.usp Readme is a purposefully feature-lite Twitter reader designed to show you the tweets you signed up to see.
            .sign-in
              el-button(:loading="tokenRequestLoading", type="primary", @click="handleSignIn") Sign in with Twitter
        .screenshot.flex-auto
          img(src="https://image.ibb.co/iQ7BFw/Screen_Shot_2017_10_31_at_22_23_08.png")
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

<style lang="sass" scoped>
.hero
  background: #7994E5
  width: 100vw
  height: 100vh
  padding: 50px
  color: white
  border: 22px solid #313036
  line-height: 1.1
  overflow: auto
  @media(max-width: 760px)
    border-width: 8px
    font-size: 19px

.screenshot
  @media(max-width: 760px)
    display: none
  img
    width: 100%
    border-radius: 6px
  max-height: 80vh
  overflow: hidden
  margin-bottom: 3vh
  width: 60% 

.inner
  max-width: 1120px
  margin: auto
  @media(max-width: 760px)
    display: block

h1
  font-size: 2.7em
  font-family: "Rubik"
  font-weight: 500
  width: 100%;
  margin-bottom: 1rem

.usp
  font-size: 1.2em
  color: #313036
  font-family: "Rubik"
  font-weight: 100
  line-height: 1.3
  width: 100%;
  margin-bottom: 2em

.copy-wrap
  width: calc(100% - 5vw)
  position: absolute
  bottom: 4vh
  @media(max-width: 760px)
    position: relative
    padding-top: 10vh

.copy
  width: 50%
  padding-right: 5vw
  position: relative
  @media(max-width: 760px)
    width: 100%
    padding-right: 0

.sign-in button
  text-transform: uppercase
  background: transparent
  border: 1px solid white
  padding: 1rem
  letter-spacing: 2px
  font-family: "Rubik"
  font-weight: 500
  @media(max-width: 760px)
    width: 100%
    font-size: 16px
    padding-top: 2rem
    padding-bottom: 2rem
</style>

