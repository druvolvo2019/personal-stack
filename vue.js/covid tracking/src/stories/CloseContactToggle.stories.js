import CloseContactToggle from '../components/incident-detail/TemplateContainerComponents/CloseContactToggle.vue'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/CloseContactToggle',
  component: CloseContactToggle,
  argTypes: {
    onContactCompletedToggle: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { CloseContactToggle },
    setup() {
      return { args }
    },
    template: `<CloseContactToggle v-bind="args"></CloseContactToggle>`,
  }
})

export const StartingFalse = useTemplate({
  shouldShow: true,
  contactCompleted: false,
})

export const StartingTrue = useTemplate({
  shouldShow: true,
  contactCompleted: true,
})
