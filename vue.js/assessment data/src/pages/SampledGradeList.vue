<template>
  <div>
    <visit-card-loading
      :hydrated="visitListLoaded"
      :show-no-visits="!traIsSpecific"
      :visits="visitListForTra"
    >
      <template v-slot:visits="slotProps">
        <school-list-cards
          :grades="slotProps.visits"
          @visitSelected="visitSelected"
        />
      </template>
    </visit-card-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SampledGradeList',
  components: {
    'school-list-cards': require('src/components/SchoolListCards.vue').default,
    'visit-card-loading': require('src/components/VisitCardLoading').default,
  },

  data() {
    return {
      traIsSpecific: false,
      visitListLoaded: false,
    }
  },
  computed: {
    ...mapGetters('filterOptions', [
      'visitListForTra',
      'visitListLoadingState',
    ]),
  },

  watch: {
    visitListLoadingState: function (value) {
      this.visitListLoaded = value === 'loaded'
    },
  },

  async mounted() {
    this.traIsSpecific = await this.$loggedInUser.traIsSpecific()
  },

  methods: {
    visitSelected(visit) {
      this.$emit('visitSelected', visit)
    },
  },
}
</script>
