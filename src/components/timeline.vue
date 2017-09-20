<template lang="pug">
  .timeline
    button(v-if="canFetchTweets", @click="fetchTweets") Fetch tweets
    tweet(v-for="tweet in tweets", :tweet="tweet", :key="tweet.id")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { haveFetchedInWindow } from './../helpers'
import Tweet from './tweet'
export default {
  methods: {
    ...mapActions(['fetchTweets'])
  },
  data () {
    return {
      now: Date.now(),
      timer: null
    }
  },
  computed: {
    ...mapState(['tweets', 'lastFetched']),
    canFetchTweets () { return !haveFetchedInWindow(this.lastFetched, this.now) }
  },
  mounted () {
    !this.tweets.length && this.fetchTweets()
    this.timer = setInterval(() => { this.now = Date.now() }, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: { Tweet }
}
</script>
