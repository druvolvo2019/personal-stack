<template>
  <q-input
    filled
    :label="label"
    lazy-rules
    :rules="[
      val =>
        (val && val.length > 0) || `Please provide a ${label.toLowerCase()}`
    ]"
    :value="value"
    @input="inputUpdated"
  />
</template>

<script>
export default {
  name: 'NaepRequiredInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    inputUpdated(val) {
      this.$emit('input', val)
    }
  }
}
</script>
