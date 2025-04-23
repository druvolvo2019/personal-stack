<template>
  <div :key="`index-${refCount}`">
    <div v-if="isAssessmentShowing">
      <sampled-grade-details-wrapper
        :visit-id="activeVisit.visitId"
        :grade-id="activeVisit.gradeId"
      />
    </div>
    <div v-else>
      <sampled-grade-list
        :key="refCount"
        @visitSelected="visitSelected"
      ></sampled-grade-list>
    </div>
  </div>
</template>

<script>
import SampledGradeDetailsWrapper from './SampledGradeDetailsWrapper'
import SampledGradeList from './SampledGradeList'
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  components: {
    SampledGradeList,
    SampledGradeDetailsWrapper,
  },
  data() {
    return {
      refCount: 0,
      isAssessmentShowing: false,
      activeVisit: {},
    }
  },
  computed: {
    ...mapGetters('filterOptions', ['visitListForTra']),
  },
  watch: {
    visitListForTra: async function (v) {
      console.log(v)
      this.isAssessmentShowing = await this.$loggedInUser.isAssessmentShowing()
    },
  },
  async mounted() {
    console.log('mounted')
    this.isAssessmentShowing = await this.$loggedInUser.isAssessmentShowing()
    if (this.isAssessmentShowing) {
      const activeVisit = await this.$loggedInUser.getActiveVisit()
      this.activeVisit = activeVisit
    } else {
      this.activeVisit = {}
    }
  },
  methods: {
    visitSelected(visit) {
      this.$emit('visitSelected', visit)
    },
  },
}
</script>
