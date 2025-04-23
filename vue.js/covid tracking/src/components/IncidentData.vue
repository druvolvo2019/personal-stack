<template>
  <FilterDialogBar @filter-changed="filterChanged"></FilterDialogBar>
  <div>
    <q-card class="col-3 bg-grey-2" bordered flat square>
      <q-card-section>
        <div class="row items-center">
          <div class="text-h5">Incident Cards</div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="q-ma-lg">
        <incident-list-cards-wrapper :incidentContacts="incidentCards" />
      </q-card-section>
    </q-card>
    <q-page-scroller
      :offset="[18, 18]"
      position="bottom-right"
      :scroll-offset="150"
    >
      <q-btn fab icon="north" color="accent" />
    </q-page-scroller>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Loading } from 'quasar'
import {
  runGetIncidentCards,
  runGetIncidentDetails,
  runGetIncidentSummary,
  runGetContactLog,
} from 'src/lib/dataSource'
import FilterDialogBar from './FilterDialogBar.vue'
import incidentFilter from '../lib/incident-filter'

export default {
  name: 'IncidentData',
  components: {
    'incident-list-cards-wrapper':
      require('components/IncidentListCardsWrapper.vue').default,
    FilterDialogBar,
  },
  props: {
    primarykey: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      myUser: '',
      filter: {},
      incidentCardsFull: [],
      myIncidentcontactdata: {},
      incidentDetails: [],
      incidentSummary: [],
      incidentLogs: [],
      myIncidentlog: { id: '0330033', locationKind: 'SCHOOL' },
    }
  },

  mounted() {
    this.myUser = this.getUser
    //console.log('myUser=', this.myUser)
  },

  async created() {
    try {
      Loading.show()

      this.incidentCardsFull = await runGetIncidentCards(
        this.myIncidentcontactdata
      )
      //this.incidentLogs = await runGetContactLog(this.myIncidentlog)
      //this.incidentDetails = await runGetIncidentDetails(this.myIncidentcontactdata)
      //this.incidentSummary = await runGetIncidentSummary(this.myIncidentcontactdata)

      //console.log('incidentCards===', this.incidentCards)
      //console.log('incidentDetails===', this.incidentDetails)
      //console.log('incidentSummary===', this.incidentSummary)
      //console.log('incidentLogs===', this.incidentLogs)

      this.setReload(false)
      Loading.hide()
    } catch (err) {
      console.log(err.message)
    }
  },

  computed: {
    ...mapGetters('auth', ['getUser']),
    incidentCards() {
      return incidentFilter(this.filter, this.incidentCardsFull)
    },
  },
  methods: {
    ...mapActions('appsession', ['setReload']),

    filterChanged(newFilterValue) {
      this.filter = newFilterValue
    },
  },
}
</script>

<style></style>
