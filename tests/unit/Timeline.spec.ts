import Timeline from "@/components/Timeline.vue";
import {mount} from "@vue/test-utils";
import {thisMonth, thisWeek, today} from "@/mocks";

describe('Timeline', function () {
  it('renders today post by default', () => {
    const wrapper = mount(Timeline)
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })
  it('update when the period is click', async () => {
    const wrapper = mount(Timeline)

    // Since requestAnimationFrame callback isn't going to be automatic in jest, we need to wait for nextTick.
    await wrapper.get('[data-testid="This Week"]').trigger('click') // trigger returns nextTick

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })
  it('update when the period is click', async () => {
    const wrapper = mount(Timeline)

    // Since requestAnimationFrame callback isn't going to be automatic in jest, we need to wait for nextTick.
    await wrapper.get('[data-testid="This Month"]').trigger('click') // trigger returns nextTick

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
});