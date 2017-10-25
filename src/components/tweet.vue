<template lang="pug">
  .tweet.py3.flex
    .meta.mr3
      img.profile.self-center(:src="profileImage")
      p.ago.right-align.h6 {{ ago }}
    .content
      p.person.mb1
        span.name {{ tweet.user.name }}
        span.mx2 •
        span.screen-name @{{ tweet.user.screen_name }}
      p.text.mb1(v-html="$options.filters.linkify($options.filters.tweetify($options.filters.nl2br(strippedTweet)))")
      .images.p2.mt2(v-if="media")
        img.max-width-1.mb1.mr1(v-for="m in images", :src="imageUrl(m)")
      .videos.p2.mt2(v-if="videoIds && videoIds.length")
        youtube(:video-id="videoId", v-for="videoId in videoIds", :key="videoId")
      .videos.p2.mt2(v-if="videos")
        v-video(:video="videos")
</template>

<script>
import linkifyHtml from 'linkifyjs/html'
import { getIdFromURL } from 'vue-youtube-embed'
import { ago } from './../helpers'
import VVideo from './video'
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
    videos () {
      if (!this.media) return false
      const videos = this.media.find(m => m.video_info)
      if (!videos) return false
      const { video_info: { variants }, media_url_https } = videos
      const { url, content_type } = variants.find(v => v.url)
      return {
        image: media_url_https,
        source: url,
        type: content_type
      }
    },
    profileImage () { return this.tweet.user.profile_image_url_https.replace(/_normal/, '') },
    ago () { return ago(this.tweet.created_at) },
    media () { return this.tweet.extended_entities && this.tweet.extended_entities.media },
    images () { return this.media && this.tweet.extended_entities.media.filter(m => m.type !== 'animated_gif') },
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
  },
  components: { VVideo }
}
</script>

<style lang="sass">
.tweet
  border-bottom: 1px solid #eaeaea
.content
  
.person
  font-family: 'Rubik', sans-serif
  .name
    font-weight: 500
    color: #555555
  .screen-name
    font-weight: 300
.text
  font-weight: 300
  a
    color: #000

.ago, .screen-name
  color: #A7A7A7

.profile
  max-width: 61px
  border-radius: 8px
</style>

