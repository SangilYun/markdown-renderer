<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <router-link
          class="button"
          to="/posts/new"
        >
          New Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Navbar'
})
</script>

<style scoped>

</style>