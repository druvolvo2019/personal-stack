<template>
  <div class="col-xs-12 col-sm-12 col-md-12">
    <q-card class="fit" flat bordered square>
      <div class="text-subtitle1 q-px-md q-pt-md">Lunch Times</div>
      <q-card-section horizontal>
        <q-card-section>
          <q-markup-table v-if="lunchtimes.length > 0">
            <thead>
              <tr>
                <th class="text-center">Start Time</th>
                <th class="text-center">End Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in lunchtimes" :key="index">
                <td class="text-center">{{ item.startTime }}</td>
                <td class="text-center">{{ item.endTime }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>

        <!--q-separator vertical />

        <q-card-section>
          10:00AM
          <q-range
            v-model="lunchtimesminmax"
            :min="1000"
            :max="1400"
            :step="50"
            :left-label-value="lunchtimemin"
            :right-label-value="lunchtimemax"
            label-always
            markers
            vertical
            readonly
            color="blue"
          />
          2:00PM
        </q-card-section -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    lunchtimes: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      missingitem: false,
      lunchtimesminmax: { min: '1200', max: '1200' },
      lunchtimemin: 'Start: 12:00 PM',
      lunchtimemax: 'No Lunchtimes specified',
    }
  },

  mounted() {
    //console.log('lunch card ', this.lunchtimes)
    if (this.lunchtimes.length === 0) return
    let aval = this.lunchtimes[0].startTime
    let newmin = aval
      .replace(':', '')
      .replace('AM', '')
      .replace('PM', '')
    this.lunchtimemin = 'Start: ' + aval
    aval = this.lunchtimes[this.lunchtimes.length - 1].endTime
    let newmax = aval
      .replace(':', '')
      .replace('AM', '')
      .replace('PM', '')
    if (newmax.length < 4) newmax = (parseInt(newmax) + 1200).toString()
    this.lunchtimemax = 'End: ' + aval
    this.lunchtimesminmax.min = newmin
    this.lunchtimesminmax.max = newmax
  },


}
</script>
