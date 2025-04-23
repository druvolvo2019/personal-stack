<template>
  <q-input
    class="q-mt-md"
    dense
    outlined
    :name="name"
    :label="displayLabel"
    :type="inputType"
    :value="value"
    @input="inputUpdated"
  >
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'NaepOutlinedInput',
  props: {
    inputType: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      displayLabel: this.label || `Enter ${this.inputType}`
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
