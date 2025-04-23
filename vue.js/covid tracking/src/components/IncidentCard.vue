<template>
  <q-card
    class="my-card"
    bordered
    :class="cardClass(incidentContact.incidentstatus)"
    v-ripple
    @click="selectIncidentCard(incidentContact)"
  >
    <q-item>
      <q-item-section class="q-pt-none">
        <div class="row">
          <div class="col-auto text-left">
            <incidents-chip :incidentContact="incidentContact"></incidents-chip>
          </div>
          <q-space />
          <div class="col-auto text-h6 text-left">
            #{{ incidentContact.cifreferenceid }}
          </div>
        </div>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section class="q-pt-none">
        <div class="row">
          <div class="col-auto text-left">
            <q-item-label>{{
              dateTimeStringFromDbString(incidentContact.fldcreateddt)
            }}</q-item-label>
            <q-item-label
              caption
              v-if="getstatesString(incidentContact.incidentstates) != ''"
            >
              <q-icon name="room" color="black" size="1.5rem" />{{
                getstatesString(incidentContact.incidentstates)
              }}</q-item-label
            >
          </div>
          <q-space />
          <div class="col-auto text-left">
            <div class="row">
              <div>
                <q-icon name="portrait" color="black" size="2.5rem" />
              </div>

              <div>
                <q-item-label>{{ incidentContact.fldwinsid }}</q-item-label>
                <q-item-label caption> WINS </q-item-label>
              </div>
            </div>
          </div>
        </div>
      </q-item-section>
    </q-item>

    <q-separator></q-separator>

    <q-card-section horizontal>
      <incident-contact-types
        :myIncidentContact="incidentContact"
        :myIncidentTitle="contactCardtitle"
      />
    </q-card-section>

    <q-separator></q-separator>

    <q-item>
      <q-item-section>
        <div class="row">
          <div class="col-auto text-left">
            <q-item-label
              >Status: {{ incidentContact.incidentstatus }}</q-item-label
            >
          </div>
          <q-space />

          <div class="col-auto text-left">
            <div class="row">
              <div>
                <q-icon name="map" color="black" size="2.5rem" />
              </div>

              <div>
                <q-item-label>
                  <div v-for="value in getTRA(incidentContact.tra)">
                    {{ value }}
                  </div>
                </q-item-label>
                <q-item-label caption> T:R/A </q-item-label>
              </div>
            </div>
          </div>
        </div>
      </q-item-section>
    </q-item>

    <q-separator></q-separator>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import IncidentContactTypes from './IncidentContactTypes.vue'
import IncidentsChip from './IncidentChip.vue'

export default {
  name: 'IncidentCard',
  components: {
    IncidentContactTypes,
    IncidentsChip,
  },
  props: {
    incidentContact: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectIncidentCard = (incidentContact) => {
      emit('selectIncidentCard', incidentContact)
    }

    const dateTimeStringFromDbString = (datestr) => {
      var timeStamp = new Date(datestr)
      timeStamp.setTime(timeStamp.getTime())
      return date.formatDate(timeStamp, 'MM/DD/YYYY h:mm A')
    }
    return { selectIncidentCard, dateTimeStringFromDbString }
  },
  methods: {
    getTRA(value) {
      var myArray = []
      if (Object.is(value, null)) {
        value = ''
      } else {
        myArray = JSON.parse(value)
      }
      return myArray
    },
    getstatesString(value) {
      if (Object.is(value, null)) {
        value = ''
      }
      return value
    },
    getStatus(value) {
      var ret = ''
      if (Object.is(value, null)) {
        value = 0
      }
      switch (value) {
        case 0:
          ret = 'Open'
          break
        case 1:
          ret = 'Closed'
          break
      }
      return ret
    },

    cardClass(value) {
      var ret = ''

      if (Object.is(value, null)) {
        value = ''
      }

      switch (value.toLowerCase()) {
        case 'pending':
          ret = 'fit my-selectable-card bg-white-1'
          break
        case 'open':
          ret = 'fit my-selectable-card bg-white-1'
          break
        case 'closed':
          ret = 'fit my-selectable-card bg-blue-1'
          break
        case 'locked':
          ret = 'fit my-selectable-card bg-grey-4'
          break
      }

      //console.log('ret=',ret)
      return ret
    },

    fncCIFSubmissionType(value) {
      if (Object.is(value, null)) {
        value = 'Active Positive'
      }
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.my-selectable-card {
  width: 100%;
}

.my-selectable-card:hover {
  background-color: lighten(#26a69a, 50);
  border-width: 1px;
  border-color: #1976d2;
}
.wordbreak {
  background-color: white;
}
</style>
