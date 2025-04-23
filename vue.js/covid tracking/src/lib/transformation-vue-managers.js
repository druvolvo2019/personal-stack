export function createTransformationManager(value, transformer) {
  return () => {
    if (value === null) {
      return { error: 'No Data Returned' }
    } else if ((value || { uninitialized: true }).uninitialized) {
      return {}
    } else {
      try {
        const sampleData = transformer(value)
        console.log({ sampleData })
        return sampleData
      } catch (e) {
        console.error(e.message)
        return { error: e.message }
      }
    }
  }
}

export function transformationManager(value, transformer, opts = {}) {
  if (value === null) {
    return { error: 'No Data Returned' }
  } else if ((value || { uninitialized: true }).uninitialized) {
    return {}
  } else {
    try {
      const sampleData = transformer(value, opts)
      console.log({ sampleData })
      return sampleData
    } catch (e) {
      console.error(e.message)
      return { error: e.message }
    }
  }
}
