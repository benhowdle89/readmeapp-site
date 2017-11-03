<template lang="pug">
  a.externalLink(:href="externalLink.link" target="_blank" v-if="showExternal" )
    .extImg(v-if="externalLink.image")
      img(:src="externalLink.image")
    div.extContent
      h3.extTitle {{ externalLink.title }}
      p.extDescription {{ externalLink.description }}
      p.extSite {{ externalLink.site }}
</template>

<script>
import { mapActions } from 'vuex'
import externalLinkFetcher from './../helpers/external-link'
export default {
  props: {
    url: String,
    id: Number,
    meta: Object
  },
  async mounted () {
    !this.meta && this.fetchExternalLinks() 
  },
  methods: {
    ...mapActions(['saveMeta']),
    async fetchExternalLinks () {
      const result = await externalLinkFetcher(this.url)
      if (!result) return
      Object.keys(result).forEach(k => {
        this[k] = result[k]
      })
      this.saveMeta({
        id: this.id,
        meta: result
      })
    }
  },
  data() {
    return this.meta || { 
      externalLink: {
        image: '',
        title: '',
        description: '',
        site: '',
        link: '',
      },
      showExternal: false,
      showExtImage: false
    }
  }
}
</script>

<style lang="sass">
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
