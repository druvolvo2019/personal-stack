<template>
  <div class="row q-gutter=md">
    <div class="col">
      <pre>{{ currentLocation }}</pre>
    </div>
    <div class="col">
      <pre>{{ currentContact }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationActionsWrapper',
  props: {
    currentLocation: {
      type: Object,
      required: true,
    },
    currentContact: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
