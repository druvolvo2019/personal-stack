import SendEmailPlugin from '../components/incident-detail/TemplateContainerComponents/SendEmailPlugin.vue'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/SendEmailPlugin',
  component: SendEmailPlugin,
  argTypes: {
    onSendEmail: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { SendEmailPlugin },
    setup() {
      return { args }
    },
    template: `
        <send-email-plugin
          v-bind="args"
        ></send-email-plugin>
    `,
  }
})

export const SimpleExample = useTemplate({})
