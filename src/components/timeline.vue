<template lang="pug">
  .timeline
    user.my2
    el-button(:loading="tweetsLoading", type="primary", v-if="canFetchTweets", @click="handleFetchTweets") Fetch tweets
    tweet(v-for="tweet in tweets", :tweet="tweet", :key="tweet.id")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { haveFetchedInWindow } from './../helpers'
import User from './user'
import Tweet from './tweet'
export default {
  methods: {
    ...mapActions(['fetchTweets']),
    async handleFetchTweets () {
      await this.fetchTweets().catch(error => this.$message.error('Error fetching tweets'))
    }
  },
  data () {
    return {
      now: Date.now(),
      timer: null
    }
  },
  computed: {
    ...mapState(['tweets', 'lastFetched', 'tweetsLoading']),
    canFetchTweets () { return !haveFetchedInWindow(this.lastFetched, this.now) }
  },
  mounted () {
    !this.tweets.length && this.handleFetchTweets()
    this.timer = setInterval(() => { this.now = Date.now() }, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: { Tweet, User }
}
</script>
