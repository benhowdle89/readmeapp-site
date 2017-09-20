<template lang="pug">
  .user
    h2 {{ user.name }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>
