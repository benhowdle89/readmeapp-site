<template lang="pug">
  .timeline
    user
    button(v-if="canFetchTweets", @click="fetchTweets") Fetch tweets
    tweet(v-for="tweet in tweets", :tweet="tweet", :key="tweet.id")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { haveFetchedInWindow } from './../helpers'
import User from './user'
import Tweet from './tweet'
export default {
  methods: {
    ...mapActions(['fetchTweets', 'clearFetchTweetError']),
    showError (message, type) {
      this.$message({
        showClose: true,
        message,
        type: 'error',
        onClose: () => { this.clearFetchTweetError() }
      })
    }
  },
  data () {
    return {
      now: Date.now(),
      timer: null
    }
  },
  computed: {
    ...mapState(['tweets', 'lastFetched', 'fetchTweetError']),
    canFetchTweets () { return !haveFetchedInWindow(this.lastFetched, this.now) }
  },
  mounted () {
    !this.tweets.length && this.fetchTweets()
    this.timer = setInterval(() => { this.now = Date.now() }, 1000)
    if (this.fetchTweetError) {
      this.showError(this.fetchTweetError)
    }
  },
  watch: {
    fetchTweetError: function (error) {
      error && this.showError(this.fetchTweetError)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: { Tweet, User }
}
</script>
