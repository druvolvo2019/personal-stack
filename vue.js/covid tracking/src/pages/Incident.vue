<template>
  <q-page>
   <incident-data :primarykey="primarykey"></incident-data>
  </q-page>
</template>

<script>
export default {
  name: 'School',
  components: {
    'incident-data': require('components/IncidentData.vue').default
  },
  props: {
    primarykey: {
      type: String,
      default: '',
    }
  },
}
</script>

