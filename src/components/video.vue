<template lang="pug">
.video
  video(controls, loop, muted, :poster="video.image")
    source(:src="video.source", :type="video.type")
</template>

<script>
export default {
  props: {
    video: {
      type: Object
    }
  }
};
</script>

<style lang="sass">
.video
  position: relative
  padding-bottom: 56.25%
  height: 0
  overflow: hidden
  max-width: 100%;

.video video
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
</style>
