import AllEmailDisplayPlugin from '../components/incident-detail/TemplateContainerComponents/AllEmailDisplayPlugin.vue'
import { createTemplate } from './lib'
import { context } from './fixtures'

export default {
  title: 'CIMS/AllEmailDisplayPlugin',
  component: AllEmailDisplayPlugin,
  argTypes: {},
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { AllEmailDisplayPlugin },
    setup() {
      return { args }
    },
    template: `
        <all-email-display-plugin
          v-bind="args"
        ></all-email-display-plugin>
    `,
  }
})

export const ShowingSchoolCoordinator = useTemplate({
  context: context(1),
})

export const ShowingPrincipal = useTemplate({
  context: context(2),
})
