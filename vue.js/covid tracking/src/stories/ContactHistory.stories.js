import { contactHistory } from './fixtures/contact-history'
import ContactHistory from '../components/incident-detail/ContactHistory.vue'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/ContactHistory',
  component: ContactHistory,
  argTypes: {},
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { ContactHistory },
    setup() {
      return { args }
    },
    template: `<ContactHistory v-bind="args"></ContactHistory>`,
  }
})

export const EmptyContactHistory = useTemplate({
  contactHistory: [],
})

export const SingleEntryContactHistory = useTemplate({
  contactHistory: contactHistory.slice(0, 1),
})

export const BigContactHistory = useTemplate({
  contactHistory,
})
