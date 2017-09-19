<template lang="pug">
  .timeline
    .tweet(v-for="tweet in tweets")
      p {{ tweet.text }}
      p @{{ tweet.user.screen_name }}
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  methods: {
    ...mapActions(['fetchTweets'])
  },
  computed: {
    ...mapState(['tweets'])
  },
  mounted () {
    !this.tweets.length && this.fetchTweets()
  }
}
</script>
