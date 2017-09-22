<template lang="pug">
  .tweet.py3
    .content.py2
      p.text.mb1.h3(v-html="$options.filters.linkify($options.filters.tweetify($options.filters.nl2br(strippedTweet)))")
      p.h5 {{ ago }}
      .images.p2.mt2(v-if="media")
        img.max-width-1.mb1.mr1(v-for="m in media", :src="imageUrl(m)")
      .videos.p2.mt2(v-if="videoIds")
        youtube(:video-id="videoId", v-for="videoId in videoIds")
    p: a(:href="'http://twitter.com/' + tweet.user.screen_name") {{ tweet.user.name }}
</template>

<script>
import linkifyHtml from 'linkifyjs/html'
import { getIdFromURL } from 'vue-youtube-embed'
import { ago } from './../helpers'
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
    },
    nl2br: (html = '') => html.replace(/(?:\r\n|\r|\n)/g, '<br />')
  },
  methods: {
    imageUrl ({ media_url }) { return `${media_url}:small` }
  },
  computed: {
    videoIds () { return this.urls && this.urls.map(({ expanded_url }) => {
      return /youtube/i.test(expanded_url) && getIdFromURL(expanded_url)
    }).filter(Boolean)},
    ago () { return `${ ago(this.tweet.created_at) } ago` },
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
  a
    color: #000
</style>

