<template>
  <suspense>
    <template #default>
      <post-viewer />
    </template>
    <template #fallback>
      <spinner />
    </template>

  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../store";
import PostViewer from "./PostViewer.vue";
import Spinner from "./Spinner.vue";

export default defineComponent({
  name: 'ShowPost',
  components: { Spinner, PostViewer },
})
</script>
