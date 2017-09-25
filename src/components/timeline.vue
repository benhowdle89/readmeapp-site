<template lang="pug">
  .timeline
    .flex.space-between
      .controls.col-6.my2
        el-button(:loading="tweetsLoading", type="primary", v-if="canFetchTweets", @click="handleFetchTweets") Refresh timeline
        p(v-else) {{ fetchAgainIn }}
      user.my2.col-6.right-align
    .tweets.mt3
      tweet(v-for="(tweet, index) in tweets", :tweet="tweet", :key="tweet.id", :index="index")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { haveFetchedInWindow, fetchAgainIn } from './../helpers'
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
    canFetchTweets () { return !haveFetchedInWindow(this.lastFetched, this.now) },
    fetchAgainIn () {
      const again = fetchAgainIn(this.lastFetched, this.now)
      return `Refresh again in ${again} minute${again > 1 ? 's' : ''}`
    },
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

<style lang="sass">
.tweets
  border-top: 1px solid #eaeaea
</style>
