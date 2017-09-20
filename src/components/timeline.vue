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
  computed: {
    ...mapState(['tweets', 'lastFetched']),
    canFetchTweets () { return !haveFetchedInWindow(this.lastFetched) }
  },
  mounted () {
    !this.tweets.length && this.fetchTweets()
  },
  components: { Tweet }
}
</script>
