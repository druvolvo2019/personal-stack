<template>
  <q-card-section>
    <div class="text-subtitle1 q-pb-md">Dismissal Calculator</div>
    <q-input
      v-model="startTime"
      type="time"
      style="width: 300px"
      label="Actual Assessment Start Time"
    >
    </q-input>
    <q-input
      v-model="dismissalTime"
      dense
      style="width: 300px"
      class="q-mt-md"
      outlined
      :label="timeAdjustLabel"
      mask="##:## AM"
      readonly
    />
  </q-card-section>
</template>

<script>
import { date } from 'quasar'
import Formatting from 'src/lib/formatting'

export default {
  name: 'DismissalCalculator',
  props: {
    isPuertoRico: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      startTime: undefined,
      startTimeClock: undefined,
      dismissalTime: undefined,
      timeAdjust: this.isPuertoRico ? 90 : 70,
      clockGuard: false
    }
  },
  computed: {
    timeAdjustLabel() {
      return `Calculated Dismissal Time (+${this.timeAdjust} min)`
    }
  },
  watch: {
    startTime(value) {
      if (!this.clockGuard) {
        this.clockGuard = true
        this.dismissalTime = Formatting.addMinutesToTime(value, this.timeAdjust)
        this.startTimeClock = value
        this.clockGuard = false
      }
    },
    startTimeClock(value) {
      if (!this.clockGuard) {
        this.clockGuard = true
        if (value.match(/\d\d:\d\d (AM|PM)/)) {
          const [timepart, ampm] = value.trim().split(' ')
          const [hours, minutes] = timepart.split(':')
          const hours24 = ampm === 'PM' ? parseInt(hours) + 24 : parseInt(hours)
          let newDate = date.buildDate({ hours: hours24, minutes: minutes })
          this.startTime = date.formatDate(newDate, 'HH:mm')
        }
        this.clockGuard = false
      }
    }
  }
}
</script>

<style>
input[type='timea']::-webkit-calendar-picker-indicator {
  background: none;
}
</style>
