<template lang="pug">
.video
  video(autoplay, loop, muted, :poster="video.image")
    source(:src="video.source", :type="video.type")
</template>

<script>
export default {
 props: {
   video: {
     type: Object
   }
 } 
}
</script>
