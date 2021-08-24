import { ref } from "vue";

const show = ref(false)
const component = ref()

export function useModal() {
  return {
    component,
    show,
    showModal: () => show.value = true,
    hideModel: () => show.value = false
  }
}
