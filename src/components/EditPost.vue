<template>
  <suspense>
    <template #default>
      <post-editor />
    </template>
    <template #fallback>
      <spinner />
    </template>

  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostViewer from "./PostViewer.vue";
import Spinner from "./Spinner.vue";
import PostEditor from "@/components/PostEditor.vue";

export default defineComponent({
  name: 'ShowPost',
  components: { PostEditor, Spinner, PostViewer },
})
</script>
