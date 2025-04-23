<template>
  <IncidentListCards
    :incident-contacts="incidentContacts"
    :dateFormatter="dateFormatter"
    @selectIncidentCard="selectIncidentCard"
    @setAdminTab="setAdminTab"
  ></IncidentListCards>
</template>

<script>
import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import IncidentListCards from './IncidentListCards.vue'

export default {
  name: 'incidentListCardsWrapper',
  props: {
    incidentContacts: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    IncidentListCards,
  },
  mounted() {
    let reload = this.getReload
    if (reload) {
      this.$router.go(this.$router.currentRoute)
      this.setReload(false)
    }
    this.setAdminTab('user')
  },

  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('appsession', ['getReload']),
  },

  methods: {
    ...mapActions('appsession', [
      'setIncidentId',
      'setIncidentContact',
      'setReload',
      'setAdminTab',
    ]),

    dateFormatter(timeStamp) {
      return date.formatDate(timeStamp, 'MM/DD/YYYY h:mm A')
    },

    selectIncidentCard(incidentContact) {
      this.setIncidentId(incidentContact.fldincidentid)
      this.setIncidentContact(incidentContact)
      this.setReload(true)
      this.$router.push('/formsummary')
    },
  },
}
</script>
