import IncidentListCards from '../components/IncidentListCards.vue'
import { incidentCards } from './fixtures/incident-cards'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/IncidentListCards',
  component: IncidentListCards,
  argTypes: {
    onSetAdminTab: {},
    onSelectIncidentCard: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { IncidentListCards },
    setup() {
      return { args }
    },
    template: `<IncidentListCards v-bind="args"></IncidentListCards>`,
  }
})

export const EmptyTest = useTemplate({
  incidentContacts: [],
})

export const SmallTest = useTemplate({
  incidentContacts: incidentCards,
})

const bigTestSample = []
let id = 1
for (let i = 0; i < 1000; i++) {
  incidentCards.forEach((x) => {
    const cifreferenceid = (1000000 + id).toString()
    id++
    bigTestSample.push({ ...x, cifreferenceid })
  })
}

export const BigTest = useTemplate({
  incidentContacts: bigTestSample,
  cardsPerPage: 12,
})
