<template lang="pug">
  .tweet.pt2.pb3.mb3.flex
    .meta.pb0
      profile-picture.self-center(:user="tweet.user", size="large")
      p.ago.right-align.h5.italic {{ ago }}
    .content.pl0.pb0
      p.person.mb0
        span.name {{ tweet.user.name }}
        span.mx1.dot •
        span.screen-name @{{ tweet.user.screen_name }}
      p.text.mb1(v-html="$options.filters.linkify($options.filters.tweetify($options.filters.nl2br(strippedTweet)))")
      .images.mt2(v-if="media")
        img.image(v-for="m in images", :src="imageUrl(m)")
      .videos.youtube.p2.mt2(v-if="videoIds && videoIds.length")
        youtube(:video-id="videoId", v-for="videoId in videoIds", :key="videoId")
      .videos.p2.mt2(v-if="videos")
        v-video(:video="videos")
      a.externalLink(:href="externalLink.link" target="_blank" v-if="showExternal" )
        .extImg(v-if="externalLink.image")
          img(:src="externalLink.image")
        div.extContent
          h3.extTitle {{ externalLink.title }}
          p.extDescription {{ externalLink.description }}
          p.extSite {{ externalLink.site }}
</template>

<script>
import linkifyHtml from 'linkifyjs/html'
import { getIdFromURL } from 'vue-youtube-embed'
import { ago } from './../helpers'
import ProfilePicture from './profile-picture'
import VVideo from './video'
export default {
  props: {
    tweet: Object
  },
  filters: {
    linkify: (html = '') => linkifyHtml(html, { defaultProtocol: 'https' }),
    tweetify: (html = '') => {
      let tweet = html
      tweet = tweet.replace(/(^|\s)@(\w+)/g, '$1<a href="http://twitter.com/$2" target="_blank">@$2</a>');
      return tweet.replace(/(^|\s)#(\w+)/g, '$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>')
    },
    nl2br: (html = '') => html.replace(/(?:\r\n|\r|\n)/g, '<br />')
  },
  methods: {
    imageUrl ({ media_url }) { return `${media_url}:small` }
  },
  data() {
    return { 
      externalLink: {
        image: '',
        title: '',
        description: '',
        site: '',
        link: '',
      },
      showExternal: false, 
    }
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
  async mounted () {
    // const html = await fetch('https://cors-anywhere.herokuapp.com/http://www.imdb.com/title/tt1375666/')
    if(this.urls[0]) {
      const yql = `select * from htmlstring where url='${this.urls[0].expanded_url}' AND xpath='/html/head/meta'`
      const queryUrl = `http://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(yql)}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
      await fetch(queryUrl)
        .then(data => {
          data.json().then( meta => {
              if(meta.query.results) {
                let metaString = `<html><head>${meta.query.results.result}</head><body></body>`
                let parser = new DOMParser()
                let htmlDoc = parser.parseFromString(metaString, "text/xml")
                let metas = htmlDoc.getElementsByTagName('meta')
                this.externalLink.site = this.urls[0].expanded_url
                this.externalLink.link = this.urls[0].expanded_url
                for(let metaTag of metas) {
                  if(metaTag.getAttribute("property") == "og:image") {
                    this.externalLink.image = metaTag.getAttribute("content")
                  }
                  if(metaTag.getAttribute("property") == "og:title") {
                    this.externalLink.title = metaTag.getAttribute("content").substring(0,60) + '…'
                  }
                  if(metaTag.getAttribute("property") == "og:description") {
                    this.externalLink.description = metaTag.getAttribute("content").substring(0,60) + '…'
                  }
                  if(metaTag.getAttribute("property") == "og:site_name") {
                    this.externalLink.site = metaTag.getAttribute("content").toLowerCase()
                  }
                }
                if(this.externalLink.title) {
                  this.showExternal = true
                  this.urls.shift()
                }
              }
          })
        })
    } 
  },
  components: { VVideo, ProfilePicture }
}
</script>

<style lang="sass">
.tweet
  width: 100%
  position: relative
  padding-left: calc(40px + 1em)
  border-bottom: 1px solid #eaeaea
  min-height: 100px

@media(min-width: 720px)
  .tweet
    padding-left: calc(60px + 2em)

.tweet
.meta
  border-bottom: 1px solid #7994E5
  position: absolute
  left: 0
  width: 40px
  bottom: -1px
  left: 0
  height: 100%
  .profile
    margin-top: 1em
@media(min-width: 720px)
  .meta
    width: 60px
.meta img
  width: 100%
.content
  width: 100%
.person
  font-family: 'Rubik', sans-serif
  .name
    font-weight: 500
    color: #555555
  .screen-name
    font-weight: 300
.text
  font-weight: 300
  font-size: 1.14rem
  overflow: hidden
  text-overflow: ellipsis
  a
    color: #7994E5
    text-decoration: none
    white-space: nowrap
.ago
  font-weight: 400
.ago, .screen-name
  color: #A7A7A7
.image
  border-radius: 8px
  width: 100%

.youtube
  position: relative
  padding-bottom: 56.25%
  height: 0
  overflow: hidden
  max-width: 100%;

.youtube iframe, .youtube object, .youtube embed
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

.externalLink
  width: 100%
  height: 200px
  background: rgba(40,41,46,.03)
  border-radius: 4px
  position: relative
  padding-left: calc(200px + 2em)
  padding-top: 1.2em
  padding-right: 1em
  display: block
  text-decoration: none

.extImg
  width: 200px
  height: 200px
  overflow: hidden
  position: absolute
  top: 0
  left: 0

.extImg img
  position: absolute
  top: 0
  left: 0
  height: 100%
  min-width: 100%
  border-top-left-radius: 4px
  border-bottom-left-radius: 4px

.extTitle
  font-family: 'Rubik', sans-serif
  color: #292929
  font-weight: 500
  font-size: 1rem
  line-height: 1.1

.extSite
  color: #7994E5
  font-family: 'Rubik', sans-serif
  font-weight: 100
  position: absolute
  bottom: 1em
  font-size: .84rem

.extDescription
  font-style: italic
  font-size: 1.1rem
  color: #7D7D7D
  line-height: 1.2
  padding-top: 1rem

</style>

<style lang="sass">
.dark
  .text
    color: #FFFFFF
  .person
    .name
      color: rgba(255, 255, 255, 0.73)
    .screen-name, .dot
      color: rgba(255, 255, 255, 0.44)
  .meta
    border-bottom: 1px solid #fff
  .tweet
    border-bottom: 1px solid rgba(255, 255, 255, 0.24)
  .externalLink
    background-color: rgba(129,142,245,.05)
  .extTitle
    color: rgba(255,255,255,.9)
  .extDescription
    color: rgba(255,255,255,.66)
</style>

