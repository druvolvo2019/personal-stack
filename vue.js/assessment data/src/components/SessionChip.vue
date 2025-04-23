<template>
  <div>
    <q-chip :color="chipColor" :text-color="textColor">
      <span v-if="Grade">{{ Grade }}
      <span v-if="sessionName">/ {{ funcReplaceComma(sessionName) }}</span></span
      >
    </q-chip>

  </div>
</template>

<script>
export default {
  name: "SessionChip",
  props: {
    grade: {
      type: String,
      default: ""
    },
    sampleName: {
      type: String,
      default: ""
    },
    sessionName: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
    }
  },

  computed: {
    chipColor: function() {
      //console.log('sampleName = ' + this.sampleName);
      var backgroundColor, tintLevel;
      switch (this.sampleName) {
        case "DS":
        case "HC":
        case "DS,HC":
          backgroundColor = "indigo";
          break;
        default:
          backgroundColor = "grey";
      }
      switch (this.grade) {
        case "4":
          tintLevel = "2";
          break;
        case "8":
          tintLevel = "6";
          break;
        default:
          tintLevel = "10";
      }
      return backgroundColor + "-" + tintLevel;
    },
    Grade: function() {
      var myGrade = ''
      if (this.sampleName !== '') {
        myGrade = "Grade " + this.grade + "/" + this.funcReplaceComma(this.sampleName);
      }
      return myGrade
    }, 
    textColor: function() {
      var textColor;
      switch (this.grade) {
        case "4":
          textColor = "black";
          break;
        default:
          textColor = "white";
      }
      return textColor;
    }
  },
  
  methods: {
    
    funcReplaceComma(str)
    {
      return str.replace(",", ", ") 
    }
    
  }
};
</script>

