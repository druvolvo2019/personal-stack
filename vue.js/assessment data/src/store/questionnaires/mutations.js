import Vue from 'vue'

export function initializeBarcodes(state, payload) {
  Vue.set(state, 'barcodes', payload)
}

export function initializeSchool(state, school) {
  Vue.set(state, 'school', school)
}

function sortByLineNumber(data) {
  return data.sort((x, y) => {
    if (x.lineNumber < y.lineNumber) {
      return -1
    } else if (x.lineNumber === y.lineNumber) {
      return 0
    } else {
      return 1
    }
  })
}

export function addTeacher(state, person) {
  updateBarcodes(state.barcodes, 'teachers', null, person.barcode)
  Vue.set(
    state.school,
    'teachers',
    sortByLineNumber([...state.school.teachers, person])
  )
}

export function updateTeacher(state, person) {
  updateBarcodesFromPerson(state, person, person.barcode)
  const updatedTeachers = state.school.teachers.map(x =>
    x.personId === person.personId ? person : x
  )
  Vue.set(state.school, 'teachers', sortByLineNumber(updatedTeachers))
}

export function deleteTeacher(state, person) {
  updateBarcodesFromPerson(state, person, null)
  const updatedTeachers = state.school.teachers.filter(
    x => x.personId !== person.personId
  )
  Vue.set(state.school, 'teachers', sortByLineNumber(updatedTeachers))
}

function updateBarcodesFromPerson(state, person, newBarcode) {
  const current = state.school.teachers.find(
    x => x.personId === person.personId
  )
  updateBarcodes(state.barcodes, 'teachers', current.barcode, newBarcode)
}

export function updateBarcode(state, { oldBarcode, newBarcode }) {
  updateBarcodes(state.barcodes, 'school', oldBarcode, newBarcode)
  Vue.set(state.school.principal, 'barcode', newBarcode)
}

function updateBarcodes(state, key, oldBarcode, newBarcode) {
  Vue.set(state, key, adjustBarcodes(state[key], oldBarcode, newBarcode))
}

function adjustBarcodes(barcodes, oldBarcode, newBarcode) {
  if (oldBarcode === newBarcode) {
    return barcodes
  }

  const adjustedBarcodes = barcodes.filter(x => x !== newBarcode)
  if (oldBarcode == null) {
    return adjustedBarcodes
  } else {
    return [...adjustedBarcodes, oldBarcode].sort()
  }
}
