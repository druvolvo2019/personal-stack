<template>
  <div>
    <q-page
      v-if="visits.length === 0 || showNoVisits"
      padding
      class="flex flex-center"
    >
      <no-visits />
    </q-page>
    <q-page v-else padding>
      <q-card class="col-3 bg-grey-2" bordered flat square>
        <q-card-section>
          <div class="row items-center">
            <div class="text-h5">List of Assessments</div>
          </div>
          <div v-if="!deviceIsOnline" class="text-h6 text-grey-5">
            You are offline. Only those assessments you have opened will be
            shown
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <slot name="visits" :visits="visits"></slot>
        </q-card-section>
      </q-card>
      <q-page-scroller
        :offset="[18, 18]"
        position="bottom-right"
        :scroll-offset="150"
      >
        <q-btn fab icon="las la-angle-up" color="accent" />
      </q-page-scroller>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VisitCardLoading',
  components: {
    'no-visits': require('src/components/shared/NoVisits').default
  },
  props: {
    showNoVisits: {
      type: Boolean,
      required: true
    },
    hydrated: {
      type: Boolean,
      required: true
    },
    visits: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('filterOptions', ['deviceIsOnline'])
  }
}
</script>

<style></style>
