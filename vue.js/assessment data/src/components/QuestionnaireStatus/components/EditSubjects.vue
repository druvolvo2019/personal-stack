<template>
  <div class="q-pa-sm bg-grey-3">
    <div class="q-pl-sm text-caption text-grey-9">Subjects</div>
    <q-option-group
      :value="value"
      :options="options"
      color="black"
      type="checkbox"
      inline
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  name: 'EditSubjects',
  props: {
    subjects: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: this.subjects,
    }
  },
  methods: {
    updateValue(v) {
      this.$emit('input', v)
    },
  },
}
</script>

<style></style>
