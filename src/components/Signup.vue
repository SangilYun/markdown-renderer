<template>
  <form @submit.prevent="submit">
    <form-input
      v-model="username"
      name="Username"
      :error="usernameStatus.message"
    />

    <form-input
      v-model="password"
      name="Password"
      type="password"
      :error="passwordStatus.message"
    />

    <button
      class="button is-primary"
      :disabled="!usernameStatus.valid || !passwordStatus.valid"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FormInput from "../components/FormInput.vue";
import { Status, validate, required, length } from "../validation";
import { User, useStore } from "../store";
import { useModal } from "../useModal";

export default defineComponent({
  components: { FormInput, },
  setup() {
    const store = useStore()
    const modal = useModal()
    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [required(), length({ min: 5, max: 10 })])
    })
    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [required(), length({ min: 10, max: 40 })])
    })

    const submit = async () => {
      if(!usernameStatus.value.valid || !passwordStatus.value.valid){
        return 
      }
      const newUser: User = {
        id: '-1',
        username: username.value,
        password: password.value
      }
      await store.createUser(newUser)
      modal.hideModel()
    }

    return {
      username,
      password,
      usernameStatus,
      passwordStatus,
      submit
    }
  }
});
</script>

<style>
form {
  padding: 15px;
  background: white;
}
</style>
