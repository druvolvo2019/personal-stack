<template>
  <div>
    <q-chip :color="chipColor" :text-color="textColor">
      <span>{{ incidentContact.fldcifsubmissiontypetext }}</span>
    </q-chip>
  </div>
</template>

<script>
export default {
  name: 'IncidentChip',
  props: {
    incidentContact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      textColor: 'white',
    }
  },

  computed: {
    chipColor: function () {
      //console.log('sampleName = ' + this.sampleName);
      var backgroundColor, tintLevel
      backgroundColor = this.incidentContact.fldcifsubmissiontypecolor
      tintLevel = '8'
      return backgroundColor + '-' + tintLevel
    },
  },
}
</script>
