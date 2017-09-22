<template lang="pug">
  .tweet.py3
    .content
      .text.py2(v-html="$options.filters.linkify($options.filters.tweetify(strippedTweet))")
      .images.p2.mt2(v-if="media")
        img.max-width-1(v-for="m in media", :src="imageUrl(m)")
    p: a(:href="'http://twitter.com/' + tweet.user.screen_name") {{ tweet.user.name }}
</template>

<script>
import linkifyHtml from 'linkifyjs/html'
export default {
  props: {
    tweet: Object
  },
  filters: {
    linkify: (html = '') => linkifyHtml(html, { defaultProtocol: 'https' }),
    tweetify: (html = '') => {
      let tweet = html
      tweet = tweet.replace(/(^|\s)@(\w+)/g, '$1@<a href="http://twitter.com/$2" target="_blank">$2</a>');
      return tweet.replace(/(^|\s)#(\w+)/g, '$1#<a href="http://twitter.com/search?q=%23$2" target="_blank">$2</a>')
    }
  },
  methods: {
    imageUrl ({ media_url }) { return `${media_url}:small` }
  },
  computed: {
    media () { return this.tweet.extended_entities && this.tweet.extended_entities.media },
    urls () { return this.tweet.entities && this.tweet.entities.urls },
    strippedTweet () {
      let text = this.tweet.text
      this.media && this.media.forEach(m => {
        const [start, end] = m.indices
        text = text.slice(0, start)
      })
      if (!this.urls) return text
      this.urls.forEach(urlObj => {
        const { expanded_url, url } = urlObj
        const re = new RegExp(url)
        text = text.replace(re, expanded_url)
      })
      return text
    }
  }
}
</script>

<style lang="sass">
.tweet
  border-bottom: 1px solid #eaeaea
.content
  
.text
  color: #888
  font: inherit
  a
    color: #000
</style>

