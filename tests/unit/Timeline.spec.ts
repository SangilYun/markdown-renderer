import Timeline from "@/components/Timeline.vue";
import { flushPromises, mount, RouterLinkStub, } from '@vue/test-utils'
import {thisMonth, thisWeek, today} from "@/mocks";
import { Store } from "../../src/store";

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline() {
  const store = new Store({
    authors: {
      ids: [],
      all: new Map(),
      loaded: false,
      currentUserId: undefined
    },
    posts: {
      ids: [],
      all: new Map(),
      loaded: false
    }
  })
  const testComp = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <timeline />
        </template>
        
        <template #fallback>
          Loading...
        </template>
      </suspense>
    `
  };


  return mount(testComp, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      },
      plugins: [store]
    }
  })
}
describe('Timeline', () => {
  it('renders today post default', async () => {
    const wrapper = mountTimeline()
    // nextTick -> Vue internal promises
    // axios -> flushPromises
    await flushPromises()

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it('update when the period is click', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-testid="This Week"]').trigger('click') // nextTick

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it('update when the period is click', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-testid="This Month"]').trigger('click') // nextTick

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
});
