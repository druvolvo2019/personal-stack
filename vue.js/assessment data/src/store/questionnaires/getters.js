export function getAvailableSchoolBarcodes(state) {
  const principalBarcode = state.school.principal.barcode
  if (principalBarcode === null) {
    return state.barcodes.school
  } else {
    return state.barcodes.school.filter(x => x !== principalBarcode)
  }
}

export function getAvailableTeacherBarcodes(state) {
  const usedBarcodes = state.school.teachers
    .map(x => x.barcode)
    .filter(x => x !== null)
  const current = state.barcodes.teachers
  const result = current.filter(x => {
    const result = usedBarcodes.some(k => {
      console.log({ x, k })
      return k === x
    })
    console.log({ result })
    return !result
  })
  console.log({ usedBarcodes, current, result })
  return result
}

export function getSchool(state) {
  return state.school
}
