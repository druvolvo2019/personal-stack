import PhoneReachedPlugin from '../components/incident-detail/TemplateContainerComponents/PhoneReachedPlugin.vue'
import { createTemplate } from './lib'
import { context } from './fixtures'

export default {
  title: 'CIMS/PhoneReachedPlugin',
  components: {
    PhoneReachedPlugin,
  },
  argTypes: {
    onCallHandled: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { PhoneReachedPlugin },
    setup() {
      return { args }
    },
    template: `<phone-reached-plugin v-bind="args"></phone-reached-plugin>`,
  }
})

export const EmptyContainer = useTemplate({
  context: context(1),
  scriptLine: {
    type: 'PHONE_REACHED_PERSON_ACTION',
    componentName: 'phone-reached-plugin',
  },
})
