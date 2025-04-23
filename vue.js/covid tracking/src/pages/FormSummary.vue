<template>
  <q-page padding>
    <summary-form-wrapper
      v-if="dataReady"
      :summary="summary"
      :users="users"
      :locationKind="locationKind"
      :incident_id="incidentId"
      :currentUser="currentUser"
      :schoolAgent="schoolAgent"
      :districtAgent="districtAgent"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { Loading } from 'quasar'
import { runGetIncidentSummary, runGetCIMSUsers } from 'src/lib/dataSource'
export default {
  name: 'IncidentSummary',
  components: {
    'summary-form-wrapper':
      require('components/summary-form/SummaryFormWrapper.vue').default,
  },
  data() {
    return {
      myUser: '',
      incidentId: null,
      myIncidentcontactdata: { fldincidentid: null },
      incidentSummary: [],
      summary: {},
      dataReady: false,
      users: [],
      myUser2: {},
      agents: [],
      locationKind: ['SCHOOL', 'DISTRICT'],
      currentUser: '',
      schoolAgent: '',
      districtAgent: ''
    }
  },

  async mounted() {
    this.currentUser = this.user.userid
    console.log('currentUser=', this.currentUser)

    this.myUser = this.getUser
    //console.log('myUser=', this.myUser)
    this.incidentId = this.getIncidentId
    //console.log('incidentId=', this.incidentId)

    this.myIncidentcontactdata.fldincidentid = this.incidentId

    this.incidentSummary = await runGetIncidentSummary(
      this.myIncidentcontactdata
    )
    this.summary = this.incidentSummary[0].incidentform
    console.log('summary===', this.summary)

    this.users = await runGetCIMSUsers(this.myUser2)
    console.log('users===', this.users)

    let usermap = {}
    for (let i = 0; i < this.users.length; i++) {
      usermap[this.users[i].userid] = this.users[i]
    }

    this.agents = this.users.filter((obj) => obj.fldrole == 'Agent')
    console.log('agents===', this.agents)
    //console.log('incidentSummary===', this.incidentSummary)
    this.dataReady = true

    this.users = usermap
    this.schoolAgent = this.summary.schoolcontactagent
    this.districtAgent = this.summary.districtcontactagent
    console.log('schoolAgent=',this.schoolAgent)
    console.log('districtAgent=',this.districtAgent)
  },

  computed: {
    ...mapGetters('appsession', ['getIncidentId']),
    ...mapState('auth', ['loggedIn', 'user']),
  },
}
</script>

<style></style>
