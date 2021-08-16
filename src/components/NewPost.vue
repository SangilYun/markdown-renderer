<template>
  New Post
  <post-writer :post="newPost"/>
</template>

<script lang="ts">
import PostWriter from '../components/PostWriter'
import { Post } from "@/mocks";
import { defineComponent } from "vue";
import moment from "moment";

export default defineComponent({
  name: 'NewPost',
  components: {PostWriter},
  setup() {
    const newPost: Post = {
      id: '-1',
      title: 'New post',
      created: moment()
    }

    return {
      newPost
    }
  }
})
</script>

<style scoped>

</style>