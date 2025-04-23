import { QBtn } from 'quasar'
export default {
  title: 'Quasar/Buttons',
  component: QBtn,
  argTypes: {
    onClick: {},
    color: {
      control: { type: 'select' },
      options: ['secondary', 'primary'],
    },
  },
}

const Template = (args) => ({
  components: { QBtn },
  setup() {
    return { args }
  },
  template: '<q-btn v-bind="args" />',
})

export const qBtnPrimary = Template.bind({})
qBtnPrimary.args = {
  label: 'Hello World',
  color: 'primary',
}

export const qBtn = () => {
  return {
    template: '<q-btn>Hello</q-btn>',
  }
}
