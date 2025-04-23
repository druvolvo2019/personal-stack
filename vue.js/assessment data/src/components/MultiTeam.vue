<template>
  <div>
    <q-chip v-if="multiTeam" :color="multiTeamColor" :text-color="textColor">
        <span>{{ multiTeam }}</span>
    </q-chip>
  </div>
</template>

<script>
export default {
  name: "MultiTeam",
  props: {
    multiTeam: {
      type: String,
      default:''
    }
  },
  data() {
    return {
    }
  },

  computed: {
    multiTeamColor: function() {
      //console.log('sampleName = ' + this.sampleName);
      var backgroundColor, tintLevel;
      backgroundColor = "green";
      tintLevel = "2";
      return backgroundColor + "-" + tintLevel;
    },
    textColor: function() {
      var textColor = "black"
      return textColor;
    }
  },
};
</script>
