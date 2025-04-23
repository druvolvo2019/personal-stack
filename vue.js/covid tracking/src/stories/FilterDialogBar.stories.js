import FilterDialogBar from '../components/FilterDialogBar.vue'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/FilterDialogBar',
  component: FilterDialogBar,
  argTypes: {
    onFilterChanged: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { FilterDialogBar },
    setup() {
      return { args }
    },
    template: `<FilterDialogBar v-bind="args"></FilterDialogBar>`,
  }
})

export const Basic = useTemplate({})
