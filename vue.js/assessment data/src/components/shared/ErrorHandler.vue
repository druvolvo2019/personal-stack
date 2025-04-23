<template>
  <div class="q-pa-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #ff6666 0%, #cc0000 100%)"
    >
      <q-card-section>
        <div class="text-h6">Errors While Getting Data</div>
      </q-card-section>
      <q-separator color="white" inset />
      <q-card-section class="q-pt-none">
        <pre v-for="(err, i) in error.error.graphQLErrors" :key="i">
            {{ err }}
          </pre
        >
        <q-expansion-item
          switch-toggle-side
          expand-separator
          label="Raw Result"
        >
          <q-scroll-area style="height: 600px; width 100%;">
            <pre>{{ error }}</pre>
          </q-scroll-area>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-btn outline label="Dismiss" @click="$emit('dismissError')"> </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ErrorHandler',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
