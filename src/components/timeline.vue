<template lang="pug">
  .timeline.wrapper.mx-auto
    //- .controls.col-6.my2
    //-   el-button(:loading="tweetsLoading", type="primary", v-if="canFetchTweets", @click="handleFetchTweets") Refresh timeline
    //-   p(v-else) {{ fetchAgainIn }}
    .tweets.mt1
      tweet(v-for="tweet in tweets", :tweet="tweet", :key="tweet.id")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { haveFetchedInWindow, fetchAgainIn } from './../helpers'
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
    this.canFetchTweets && this.handleFetchTweets()
    this.timer = setInterval(() => { this.now = Date.now() }, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: { Tweet }
}
</script>

<style lang="sass">

</style>
