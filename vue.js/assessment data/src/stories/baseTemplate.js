export default function TemplateFn(component) {
  const templateFn = (args) => {
    const result = (args, { argTypes }) => {
      return {
        props: Object.keys(argTypes),
        ...component,
      }
    }
    result.args = args
    return result
  }
  return templateFn
}
