<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">
          New Post
        </div>
        <input type="text" class="input">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Post } from "@/mocks";

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>