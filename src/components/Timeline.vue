<template>
  <nav class="panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{'is-active': period === currentPeriod}"
        :data-testid="period"
        @click="setPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <timeline-post
      v-for="post in posts"
      :post="post"
      :key="post.id"
      class="panel-block"
    />
  </nav>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import moment from 'moment'
import {today, thisMonth, thisWeek} from '@/mocks'
import TimelinePost from "@/components/TimelinePost.vue";

type Period = 'Today' | 'This Week' | 'This Month'

function delay(){
  return new Promise(res => {
    setTimeout(res, 2000)
  })
}
export default defineComponent({
  name: 'Timeline',
  components: {TimelinePost},
  async setup() {
    await delay()
    const periods: Array<Period> = ['Today', 'This Week', 'This Month']
    const currentPeriod = ref<Period>('Today')
    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter(post => {
        if (currentPeriod.value === 'Today') {
          return post.created.isAfter(moment().subtract(1, 'day'))
        }

        if (currentPeriod.value === 'This Week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }

        if (currentPeriod.value === 'This Month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }

        return false
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }
    return {
      posts,
      periods,
      setPeriod,
      currentPeriod
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
