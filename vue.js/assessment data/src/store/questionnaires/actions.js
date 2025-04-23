export function initializeBarcodes(context, barcodes) {
  context.commit('initializeBarcodes', barcodes)
}

export function initializeSchool(context, school) {
  context.commit('initializeSchool', school)
}

export function updatePerson(context, payload) {
  if (payload.isAdd) {
    context.commit('addTeacher', payload.newData)
  } else {
    if (
      context.getters.getSchool.principal.personId ===
      payload.currentData.personId
    ) {
      context.commit('updateBarcode', {
        oldBarcode: payload.currentData.barcode,
        newBarcode: payload.newData.barcode
      })
    } else {
      context.commit('updateTeacher', payload.newData)
    }
  }
}

export function deletePerson(context, person) {
  context.commit('deleteTeacher', person)
}

export function updateBarcodes(context, oldBarcode, newBarcode) {
  context.commit('updateBarcodes', oldBarcode, newBarcode)
}
