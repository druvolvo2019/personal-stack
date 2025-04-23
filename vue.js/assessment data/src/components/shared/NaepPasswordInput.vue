<template>
  <naep-outlined-input
    :input-type="isPwd ? 'password' : 'text'"
    :label="label"
    :value="value"
    :name="name"
    @input="inputUpdated"
  >
    <template v-slot:append>
      <q-icon
        id="passwordShowAction"
        class="cursor-pointer"
        :name="isPwd ? 'las la-eye-slash' : 'las la-eye'"
        @click="isPwd = !isPwd"
      ></q-icon>
    </template>
  </naep-outlined-input>
</template>

<script>
import NaepOutlinedInput from './NaepOutlinedInput'
export default {
  name: 'NaepPasswordInput',
  components: {
    NaepOutlinedInput
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: `Enter password`
    },
    name: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isPwd: true
    }
  },
  methods: {
    inputUpdated(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style></style>
