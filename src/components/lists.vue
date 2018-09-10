<template lang="pug">
.lists.relative
    el-button.lists-button.mr2(@click="expanded = !expanded")
        icon(glyph="#list")
    .list-panel.absolute.mt1(v-if="expanded")
        .list-items.p2
            .list.mb1
                el-button(@click="handleSetCurrentList(null)", :class="{ current: currentListId === null }") Home timeline
            .list.mb1(v-for="list in lists", :key="list.id_str", @click="handleSetCurrentList(list.id_str)", v-if="lists.length")
                el-button.list-name(:class="{ current: currentListId === list.id_str }") {{ list.name }}
        .center.p2
            el-button.fetch-lists(:loading="listsLoading", @click="handleFetchLists") Refresh lists
</template>

<script>
import { mapActions, mapState } from "vuex";
import Icon from "./icon";
import List from "../img/list.svg";
export default {
  methods: {
    ...mapActions(["fetchLists", "setCurrentList"]),
    async handleFetchLists() {
      await this.fetchLists().catch(error =>
        this.$message.error("Error fetching lists, give it a few seconds.")
      );
    },
    handleSetCurrentList(listId) {
      this.setCurrentList(listId);
      this.expanded = false;
    }
  },
  computed: {
    ...mapState(["lists", "listsLoading", "currentListId"])
  },
  components: { Icon },
  mounted() {
    if (!this.lists.length) {
      this.handleFetchLists();
    }
  },
  data() {
    return {
      List,
      expanded: false
    };
  }
};
</script>

<style lang="sass">
.lists
    .lists-button
        border: 1px solid #7994E5
        color: #7994E5
        background: transparent
        padding-top: 9px
        padding-bottom: 9px

    .list-items
        border-bottom: 1px solid #7994E5

    .list-panel
        background: #fff
        z-index: 100
        border-radius: 4px
        border: 1px solid #7994E5

    .list-name

    .list
        cursor: pointer
        button.current
            color: #fff
            background: #7994E5

    svg
        width: 16px
        height: 16px
        line-height: 0
        vertical-align: middle

    .fetch-lists
        border: 1px solid #7994E5
        color: #7994E5
        background: transparent
svg path
    fill: black
    transition: all .5s ease

[id^=list] path
    fill: #000
</style>
