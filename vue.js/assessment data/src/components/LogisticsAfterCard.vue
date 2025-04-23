<template>
  <div class="col-xs-12 col-sm-6 col-md-6">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">After the Assessment</div>
      <q-card-section>
        <div class="text-bold q-pt-sm">Certificates of Community Service</div>
        <div>{{ school.logistics.enpCommunityService }}</div>
        <div class="text-bold q-pt-sm">Dismissal</div>
        <div>{{ school.logistics.tabletDismissPolicy }}</div>
        <div class="text-bold q-pt-sm">
          Where to Send Students After Assessment
        </div>
        <div>{{ school.logistics.dismissStuPolicy }}</div>
        <div class="text-bold q-pt-sm">Extended Time Dismissal</div>
        <div>{{ school.logistics.dismissExtended }}</div>
        <div class="text-bold q-pt-sm">Where to Meet SC After Assessment</div>
        <div>{{ school.logistics.meetAfter }}</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <dismissal-calculator
        :is-puerto-rico="school.school.schoolAddressState == 'PR'"
      />
    </q-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import DismissalCalculator from 'src/components/shared/DismissalCalculator'
import Formatting from 'src/lib/formatting'
export default {
  components: {
    DismissalCalculator,
  },
  props: {
    school: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      internalDismissalTime: null,
      startTime: '',
    }
  },
  computed: {
    dismissalTime: {
      get() {
        if (this.school.school.schoolAddressState == 'PR') {
          return Formatting.addMinutesToTime(this.startTime, 90)
        } else {
          return Formatting.addMinutesToTime(this.startTime, 70)
        }
      },
      set(val) {
        this.internalDismissalTime = val
      },
    },
  },
}
</script>
