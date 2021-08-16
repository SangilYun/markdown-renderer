<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput"/>
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watchEffect } from "vue";
import { Post } from "@/mocks";
import { parse } from "marked";

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  setup(props) {
    const title = ref(props.post.title)
    const content = ref('## Title\nEnter your post content...')
    const html = ref('')

    watchEffect(() => {
      html.value = parse(content.value, {
        gfm: true,
        breaks: true
      })
    })

    // This watch function does the same thing as the watchEffect above.
    // watch(content, (newContent) => {
    //   html.value = parse(newContent)
    // }, {
    //   immediate: true
    // })

    const contentEditable = ref<HTMLDivElement | null>(null)

    const handleInput = () => {
      if(!contentEditable.value){
        throw Error('This should never happen')
      }
      content.value = contentEditable.value.innerText || ''
    }

    onMounted(() => {
      if(!contentEditable.value){
        throw Error('This should never happen')
      }
     contentEditable.value.innerText = content.value
    })

    return {
      html,
      title,
      content,
      contentEditable,
      handleInput
    }
  }
})
</script>

<style scoped>

</style>