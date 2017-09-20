<template lang="pug">
  .timeline
    button(v-if="canFetchTweets", @click="fetchTweets") Fetch tweets
    .tweet(v-for="tweet in tweets")
      p {{ tweet.text }}
      p @{{ tweet.user.screen_name }}
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { haveFetchedInWindow } from './../helpers'
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
  }
}
</script>
