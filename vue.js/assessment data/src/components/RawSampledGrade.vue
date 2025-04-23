<template>
  <q-page padding>
    <pre>{{ sampledGrade }}</pre>
  </q-page>
</template>

<script>
export default {
  name: 'RawSampledGrade',

  props: {
    sampledGrade: Object
  }
}
</script>
