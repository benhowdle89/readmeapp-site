<template lang="pug">
  .tweet.pt2.pb3.mb3.flex
    .meta.pb0
      profile-picture.self-center(:user="tweet.user", size="large")
      p.ago.right-align.h5.italic
        a(v-if="tweet.id_str", :href="tweetURL") {{ ago }}
        span(v-else) {{ ago }}
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
      external-link(v-if="urls[0]", :url="urls[0].expanded_url", :id="tweet.id", :meta="tweet.meta")
</template>

<script>
import linkifyHtml from "linkifyjs/html";
import { getIdFromURL } from "vue-youtube-embed";
import { ago } from "./../helpers";
import ExternalLink from "./external-link";
import ProfilePicture from "./profile-picture";
import VVideo from "./video";
export default {
  props: {
    tweet: Object
  },
  filters: {
    linkify: (html = "") => linkifyHtml(html, { defaultProtocol: "https" }),
    tweetify: (html = "") => {
      let tweet = html;
      tweet = tweet.replace(
        /(^|\s)@(\w+)/g,
        '$1<a href="http://twitter.com/$2" target="_blank">@$2</a>'
      );
      return tweet.replace(
        /(^|\s)#(\w+)/g,
        '$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>'
      );
    },
    nl2br: (html = "") => html.replace(/(?:\r\n|\r|\n)/g, "<br />")
  },
  methods: {
    imageUrl({ media_url }) {
      return `${media_url.replace(/^http:\/\//i, "https://")}:small`;
    }
  },
  computed: {
    videoIds() {
      return (
        this.urls &&
        this.urls
          .map(({ expanded_url }) => {
            return /youtube/i.test(expanded_url) && getIdFromURL(expanded_url);
          })
          .filter(Boolean)
      );
    },
    videos() {
      if (!this.media) return false;
      const videos = this.media.find(m => m.video_info);
      if (!videos) return false;
      const { video_info: { variants }, media_url_https } = videos;
      const { url, content_type } = variants.find(v => v.url);
      return {
        image: media_url_https,
        source: url,
        type: content_type
      };
    },
    ago() {
      return ago(this.tweet.created_at);
    },
    media() {
      return this.tweet.extended_entities && this.tweet.extended_entities.media;
    },
    images() {
      return (
        this.media &&
        this.tweet.extended_entities.media.filter(
          m => m.type !== "animated_gif"
        )
      );
    },
    urls() {
      return this.tweet.entities && this.tweet.entities.urls;
    },
    tweetURL() {
      const { id_str, user: { screen_name } } = this.tweet;
      return `https://twitter.com/${screen_name}/status/${id_str}`;
    },
    strippedTweet() {
      let text = this.tweet.text;
      this.media &&
        this.media.forEach(m => {
          const [start, end] = m.indices;
          text = text.slice(0, start);
        });
      if (!this.urls) return text;
      this.urls.forEach(urlObj => {
        const { expanded_url, url } = urlObj;
        const re = new RegExp(url);
        text = text.replace(re, expanded_url);
      });
      return text;
    }
  },
  components: { VVideo, ProfilePicture, ExternalLink }
};
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

