<template lang="pug">
  img.profile(:src="profileImage", :class="size")
</template>

<script>
export default {
  props: {
    user: Object,
    size: String
  },
  computed: {
    profileImage () {
      const url = this.user.profile_image || this.user.profile_image_url_https || ''
      return url.replace(/_normal/, '')
    }
  }
}
</script>

<style lang="sass" scoped>
.profile
  &.large
    max-width: 61px
  &.small
    max-width: 42px
  border-radius: 8px
</style>
