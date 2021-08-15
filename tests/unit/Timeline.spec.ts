import Timeline from "@/components/Timeline.vue";
import {flushPromises, mount,} from '@vue/test-utils'
import {thisMonth, thisWeek, today} from "@/mocks";

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline() {
  return mount({
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