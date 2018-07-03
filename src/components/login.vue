<template lang="pug">
  .login
    .hero
      .inner.mxa.flex
        .copy.flex
          .copy-wrap
            h1.tagline Tweets. Without the bullshit.
            p.usp Readme is a purposefully feature-lite Twitter reader designed to show you the tweets you signed up to see.
            .buttons
              .sign-in
                el-button(:loading="tokenRequestLoading", type="primary", @click="handleSignIn") Sign in with Twitter
              .apple
                a(href="https://itunes.apple.com/us/app/readme/id1400305463?ls=1&mt=8")
                  img(src='../assets/img/app-store.png')
        .screenshot
          img(src='../assets/img/screen.png')
          .snaps
            .snaps-inners
              img(src="../assets/img/snap1.jpg")
              img(src="../assets/img/snap2.jpg")
              img(src="../assets/img/snap3.jpg")
              img(src="../assets/img/snap2.jpg")
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
  overflow: hidden
  @media(max-width: 1200px)
    border-width: 8px
    font-size: 19px
    display: flex
    flex-direction: column
    align-items: center
    overflow: auto

.screenshot
  @media(max-width: 1200px)
    display: none
  img
    width: 100%
    border-radius: 6px
    position: relative
    top: calc(100vh - 83%)
  width: 60%
  position: relative
  .snaps
    position: absolute
    background-image: url('../assets/img/outer-phone.png')
    background-size: cover
    width: 40%
    height: 50%
    bottom: 2px
    right: -2px
    overflow: hidden
    .snaps-inners
      width: 87%
      margin: auto
      position: relative
      top: 55px
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        &:nth-child(4)
          animation: xfade 16s 0s infinite
        &:nth-child(3)
          animation: xfade 16s 4s infinite
        &:nth-child(2)
          animation: xfade 16s 8s infinite
        &:nth-child(1)
          animation: xfade 16s 12s infinite

@keyframes xfade
  17%
    opacity: 1

  25%
    opacity: 0

  92%
    opacity: 0

.inner
  max-width: 1120px
  margin: auto
  align-items: center
  justify-content: center
  @media(max-width: 1200px)
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

.copy
  width: 50%
  padding-right: 5vw
  position: relative
  @media(max-width: 1200px)
    width: 100%
    padding-right: 0
.buttons
  display: flex
  @media(max-width: 1200px)
    flex-direction: column
    align-items: center
.apple
  a
    img
      max-width: 100%
      height: 54px
.sign-in
  margin-right: 10px
  @media(max-width: 1200px)
    margin: 0 0 20px 0
.sign-in button
  text-transform: uppercase
  background: transparent
  border: 1px solid white
  padding: 1rem
  letter-spacing: 2px
  font-family: "Rubik"
  font-weight: 500
  @media(max-width: 1200px)
    width: 100%
    font-size: 16px
    padding-top: 2rem
    padding-bottom: 2rem
</style>

