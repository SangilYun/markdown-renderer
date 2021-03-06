import { Store } from "@/store";
import { mount } from "@vue/test-utils";
import Navbar from "../../src/components/Navbar.vue";
import Signup from "@/components/Signup.vue";

describe('Navbar', () => {
  it('shows a signup modal via teleport', async () => {
    const store = new Store({
      authors: {
        all: new Map(),
        ids: [],
        loaded: false,
        currentUserId: undefined
      },
      posts: {
        all: new Map(),
        ids: [],
        loaded: false
      }
    })

    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    const wrapper = mount(Navbar, {
      attachTo: document.body,
      global: {
        components: {
          RouterLink: {
            template: `<div></div>`
          }
        },
        plugins: [
          store
        ]
      }
    })

    await wrapper.get('[data-testid="sign-up"]').trigger('click')
    const form = wrapper.getComponent(Signup)
    expect(document.body.outerHTML).toContain('The value must be between 10 and 40')
    await form.get('#Username').setValue('Username')
    await form.get('#Password').setValue('12345678910')
    expect(document.body.outerHTML).not.toContain('The value must be between 10 and 40')

    await form.trigger('submit.prevent')
  })
});
