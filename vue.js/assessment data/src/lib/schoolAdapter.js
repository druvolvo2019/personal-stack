import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { uid, format } from 'quasar'
const { pad } = format

function invalidID(personId) {
  // Invalid only if either null or undefined
  return typeof personId === 'undefined' || personId === null
}

export function isOnlyBarcodeChanged(original, current) {
  if (original.barcode === current.barcode) return false
  return (
    Object.keys(original).findIndex((x) => {
      if (typeof original[x] === 'function') return false
      if (x === 'barcode') return false
      if (x === '__typename') return false
      return original[x] !== current[x]
    }) === -1
  )
}

export function computedStatus(person) {
  if (person.firstName == null || person.lastName == null) {
    return 'error'
  } else {
    if (person.barcode) {
      if (invalidID(person.personId)) {
        return 'noId'
      } else if (person.isNew) {
        return 'hasBarcodeAdd'
      } else {
        return 'hasBarcode'
      }
    } else if (person.isComplete) {
      return 'completedOnline'
    } else return 'needsBarcode'
  }
}

function primaryHandler(
  person,
  caption,
  availableBarcodesFn,
  displayNameFactory,
  deleteFactory
) {
  const result = {
    availableBarcodesFn,
    get pass() {
      return person
    },
    get displayName() {
      return displayNameFactory(person)
    },
    get fullName() {
      return `${person.firstName} ${person.lastName}`
    },
    caption,
    delete: deleteFactory(person),
    isWorkingCopy: false,
    computedStatus: () => computedStatus(person),
    nothingHasChanged() {
      throw new Error('nothingHasChanged is only available on a working copy')
    },
    update() {
      throw new Error('update is only available on a working copy')
    },
    get isPrincipal() {
      return person.subjects.includes('PRINCIPAL')
    },
  }
  return result
}

function makeWorkingCopy(
  person,
  caption,
  availableBarcodesFn,
  updatePerson,
  displayNameFactory,
  deleteFactory
) {
  const {
    personId,
    lineNumber,
    isAdd,
    subjects,
    firstName,
    lastName,
    barcode,
    isComplete,
    teacherId,
    isNew,
  } = person
  const workingCopy = Vue.observable({
    personId,
    lineNumber,
    isAdd,
    subjects,
    firstName,
    lastName,
    barcode,
    isComplete,
    teacherId,
    isNew,
  })
  const handler = {
    ...primaryHandler(
      workingCopy,
      caption,
      availableBarcodesFn,
      displayNameFactory,
      deleteFactory
    ),
    isWorkingCopy: true,
    delete() {
      throw new Error('You cannot call delete on a working copy')
    },
    validate() {
      if (isAdd) {
        const result = Object.keys(workingCopy).filter(
          (key) => workingCopy[key] == null
        )
        if (result.length > 0) {
          return `Missing data ${result.join(', ')}`
        } else {
          return 'Ready'
        }
      } else {
        const result = Object.keys(workingCopy).filter((x) => {
          return workingCopy[x] !== person[x]
        })
        if (result.length > 0) {
          return `Changed data ${result.join(', ')}`
        } else {
          return 'No changes'
        }
      }
    },
    nothingHasChanged() {
      if (workingCopy.isAdd) {
        return Object.keys(workingCopy).some((key) => workingCopy[key] == null)
      } else {
        return Object.keys(workingCopy).every((x) => {
          return workingCopy[x] === person[x]
        })
      }
    },
    update() {
      updatePerson({
        isAdd: workingCopy.isAdd,
        currentData: person,
        isOnlyBarcodeChanged() {
          return isOnlyBarcodeChanged(person, workingCopy)
        },
        newData: initExisting(
          {
            ...workingCopy,
            isAdd: undefined,
          },
          caption,
          availableBarcodesFn,
          updatePerson,
          displayNameFactory,
          deleteFactory
        ),
      })
    },
  }

  const result = new Proxy(workingCopy, {
    get(target, key) {
      return handler[key] || target[key]
    },
    set(target, key, value) {
      Vue.set(target, key, value)
      return true
    },
  })

  return result
}

export function initExisting(
  person,
  caption,
  availableBarcodesFn,
  updatePerson,
  displayNameFactory,
  deleteFactory
) {
  const result = new Proxy(person, {
    get(target, key) {
      const extensions = {
        ...primaryHandler(
          person,
          caption,
          availableBarcodesFn,
          displayNameFactory,
          deleteFactory
        ),
        getWorkingCopy: function () {
          return makeWorkingCopy(
            target,
            caption,
            availableBarcodesFn,
            updatePerson,
            displayNameFactory,
            deleteFactory
          )
        },
      }

      return extensions[key] || target[key]
    },
    set(target, key, value) {
      Vue.set(target, key, value)
      return true
    },
  })
  return Vue.observable(result)
}

export function extendPrincipal(principal, availableBarcodesFn, updatePerson) {
  return initExisting(
    principal,
    'Principal',
    availableBarcodesFn,
    updatePerson,
    (person) => {
      return `${person.firstName} ${person.lastName}`
    },
    () => {
      return function () {
        throw new Error('You cannot delete a principal')
      }
    }
  )
}

function contractAssert(obj, expectedType, name, showSuccess = false) {
  if (typeof obj !== expectedType) {
    throw new Error(
      `${name} was expected to be ${expectedType}. Was ${typeof obj}. ${obj.toString()}`
    )
  } else {
    if (showSuccess) {
      console.log(`Successfully checked ${name} as ${expectedType}`)
    }
  }
}

export function initExistingTeacher(
  teacher,
  availableBarcodesFn,
  updatePerson,
  deletePerson
) {
  return initExisting(
    teacher,
    teacher.subjects,
    availableBarcodesFn,
    updatePerson,
    (person) => {
      return `${person.lastName}, ${person.firstName}`
    },
    (teacher) => {
      // if (!teacher.isNew) {
      //   return function() {
      //     throw new Error('You cannot delete a prelisted teacher')
      //   }
      // } else {
      return function () {
        deletePerson(teacher)
        // }
      }
    }
  )
}

export function getNextLinenumber(teachers) {
  return pad(
    teachers
      .map((x) => x.lineNumber)
      .filter((x) => x.match(/^\d+$/))
      .map((x) => parseInt(x))
      .reduce((max, x) => (x >= max ? x + 1 : max), 1)
      .toString()
  )
}

export function createNewTeacher(
  teachersFn,
  availableBarcodesFn,
  updatePerson,
  deletePerson
) {
  const newTeacher = {
    personId: uid(),
    firstName: null,
    lastName: null,
    subjects: [],
    barcode: null,
    isNew: true,
    isAdd: true,
    isComplete: false,
    lineNumber: getNextLinenumber(teachersFn()),
    teacherId: uid(),
  }

  return initExistingTeacher(
    newTeacher,
    availableBarcodesFn,
    updatePerson,
    deletePerson
  )
}

export function questionnaireStatusFactory(storeAccessor, school) {
  const { principal, teachers, ...meta } = school
  const result = {
    ...meta,
    createNewTeacher() {
      return createNewTeacher(
        () => storeAccessor.getSchool().teachers,
        () => storeAccessor.getAvailableTeacherBarcodes(),
        (x) => storeAccessor.updatePerson(x),
        (x) => storeAccessor.deletePerson(x)
      )
    },
    principal: extendPrincipal(
      { ...principal, subjects: ['PRINCIPAL'] },
      () => storeAccessor.getAvailableSchoolBarcodes(),
      (x) => storeAccessor.updatePerson(x)
    ),
    teachers: (teachers || []).map((teacher) => {
      return initExistingTeacher(
        teacher,
        () => storeAccessor.getAvailableTeacherBarcodes(),
        (x) => storeAccessor.updatePerson(x),
        (x) => storeAccessor.deletePerson(x)
      )
    }),
  }

  if (!result.schoolName) {
    Object.defineProperty(result, 'schoolName', {
      get: function () {
        return storeAccessor.getSchool().schoolName
      },
    })

    Object.defineProperty(result, 'principalName', {
      get: function () {
        return this.principal.fullName
      },
    })
  }

  return Vue.observable(result)
}

export default function (store, school, proxyHandler = undefined) {
  const storeAccessorBase = {
    $store: store,
    ...mapGetters('questionnaires', [
      'getSchool',
      'getAvailableSchoolBarcodes',
      'getAvailableTeacherBarcodes',
    ]),
  }

  const storeAccessor = proxyHandler
    ? new Proxy(storeAccessorBase, proxyHandler)
    : storeAccessorBase

  return questionnaireStatusFactory(storeAccessor, school)
}
