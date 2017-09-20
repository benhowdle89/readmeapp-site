<template lang="pug">
  .tweet
    pre(v-html="$options.filters.linkify(strippedTweet)")
    .images(v-if="media")
      img(v-for="m in media", :src="imageUrl(m)")
    p @{{ tweet.user.screen_name }}
</template>

<script>
import linkifyHtml from 'linkifyjs/html'
export default {
  props: {
    tweet: Object
  },
  filters: {
    linkify: (html = '') => linkifyHtml(html, { defaultProtocol: 'https' })
  },
  methods: {
    imageUrl ({ media_url }) { return `${media_url}:small` }
  },
  computed: {
    media () { return this.tweet.extended_entities && this.tweet.extended_entities.media },
    strippedTweet () {
      let text = this.tweet.text
      if (!this.media) return text
      this.media.forEach(m => {
        const [start, end] = m.indices
        text = text.slice(0, start)
      })
      return text
    }
  }
}
</script>
