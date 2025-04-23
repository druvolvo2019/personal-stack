export function createTemplate(baseTemplate) {
  const Template = baseTemplate

  return {
    useTemplate(args) {
      const result = Template.bind({})
      result.args = args
      return result
    },
  }
}
