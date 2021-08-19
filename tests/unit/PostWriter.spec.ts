import PostWriter from "../../src/components/PostWriter.vue";
import { mount } from "@vue/test-utils";

describe('PostWriter', () => {
  it('emits a save event with the new post', async (done) => {
    // @ts-ignore
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          id: '',
          title: 'New title',
          created: ''
        }
      }
    })

    await wrapper.find('[data-testid="title"]').setValue('My new title')
    const $content = wrapper.find<HTMLDivElement>('[data-testid="content"]')
    $content.element.innerText = '## New content'
    await $content.trigger('input')

    setTimeout(async () => {
      await wrapper.find('[data-testid="submit"]').trigger('click')

      const emitted = (wrapper.emitted()['save'] as any)[0][0]

      expect(emitted.title).toBe('My new title')
      expect(emitted.markdown).toBe('## New content')
      expect(emitted.html).toBe('<h2 id="new-content">New content</h2>\n')
      done()
    }, 300)


  })

});