<template>
  <q-skeleton type="rect"></q-skeleton>
</template>

<script>
export default {
  name: 'CallCompletePlugin',
  props: {
    context: {
      type: Object,
      required: true,
    },
    scriptLine: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
