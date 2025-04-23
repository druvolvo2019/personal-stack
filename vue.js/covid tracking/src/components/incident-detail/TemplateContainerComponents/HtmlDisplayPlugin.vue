<template>
  <q-item>
    <div class="q-gutter-md">
      <div class="q-ma-md">
        <div v-html="scriptLine.data"></div>
      </div>
    </div>
  </q-item>
</template>

<script>
export default {
  name: 'HtmlDisplayPlugin',
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
