<template lang="pug">
  .tweet
    pre(v-html="$options.filters.linkify(tweet.text)")
    p @{{ tweet.user.screen_name }}
</template>

<script>
import linkifyHtml from 'linkifyjs/html'
export default {
  props: {
    tweet: Object
  },
  filters: {
    linkify: html => linkifyHtml(html, { defaultProtocol: 'https' })
  }
}
</script>
