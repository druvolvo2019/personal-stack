import * as allQueries from 'src/graphql/queries'
import { offlineSupportExtensions } from './offlineSupportExtensions'
import gql from 'graphql-tag'
import { date } from 'quasar'

const successUpdateResponse = {
  __typename: 'UpdateResponse',
  success: true,
  status: 200,
  errorMessage: '',
}

function updateFromQueryBody(cache, typename, variables, callback) {
  cache.updateQuery(
    {
      query: allQueries[typename],
      variables,
    },
    (data) => {
      if (data !== null) {
        if (data[typename].body) {
          const result = callback(data[typename].body)
          data[typename].body = result
        }
      }
      return data
    }
  )
}

function updateSampledGrade(cache, visitId, callback) {
  if (typeof visitId === 'undefined') {
    throw new Error(
      'Cannot access the cached SampledGrade with an undefined visitId'
    )
  }
  updateFromQueryBody(cache, 'GetSampledGrade', { visitId }, callback)
}

function updateTeachers(cache, gradeId, callback) {
  updateFromQueryBody(cache, 'GetTeachers', { gradeId }, callback)
}

const replaceIfFound = (teachers, updatedTeacher) => {
  const index = teachers.findIndex(
    (x) => x.personId === updatedTeacher.personId
  )
  if (index > -1) {
    return [
      ...teachers.slice(0, index),
      {
        ...teachers[index],
        ...updatedTeacher,
      },
      ...teachers.slice(index + 1),
    ]
  } else {
    teachers.push(updatedTeacher)
  }
  return teachers
}

export function offlineUpdateTeacherForVisit(visit, updater) {
  visit.teachers = replaceIfFound(visit.teachers, updater)
  return visit
}

export function offlineUpdateTeacherForTeachers(teachers, updater) {
  return replaceIfFound(teachers, updater)
}

export function addTeacher(result, args, cache, info, userdata) {
  const newTeacher = result.AddTeacher.teacher
  updateSampledGrade(cache, args.visitId, (visit) =>
    offlineUpdateTeacherForVisit(visit, newTeacher)
  )
}

export function updateTeacher(result, args, cache, info, userdata) {
  updateSampledGrade(cache, args.visitId, (visit) =>
    offlineUpdateTeacherForVisit(visit, args.input)
  )
}

export function updateBarcode(result, args, cache, info, userdata) {
  const update = args.input
  updateSampledGrade(cache, args.visitId, (visit) => {
    const teachers = visit.teachers
    const index = teachers.findIndex((x) => x.personId === update.personId)
    if (index > -1) {
      visit.teachers = [
        ...teachers.slice(0, index),
        {
          ...teachers[index],
          ...update,
        },
        ...teachers.slice(index + 1),
      ]
    } else {
      if (visit.principal.personId === update.personId) {
        visit.principal.barcode = update.barcode
      }
    }

    return visit
  })
}

export function offlineDeleteTeacherForVisit(visit, personId) {
  const teachers = visit.teachers
  const index = teachers.findIndex((x) => x.personId === personId)
  if (index > -1) {
    visit.teachers = [...teachers.slice(0, index), ...teachers.slice(index + 1)]
  }

  return visit
}

function deleteTeacher(result, args, cache, info, userdata) {
  const personId = args.personId
  updateSampledGrade(cache, args.visitId, (visit) =>
    offlineDeleteTeacherForVisit(visit, personId)
  )
}

export function offlineUpdateAssessmentNotes(args, visit) {
  visit.assessmentNotes = args.input.assessmentNotes
  return visit
}

export function updateAssessmentNotes(result, args, cache, info, userdata) {
  updateSampledGrade(cache, args.input.id, (visit) =>
    offlineUpdateAssessmentNotes(args, visit)
  )
}

export function offlineUpdateMissingDemographics(args, visit) {
  const { session, loginId, lineNumber, ...data } = args.input

  const missingDemographics = [
    'monthOfBirth',
    'yearOfBirth',
    'gender',
    'raceEthnicity',
    'schoolLunchStatus',
    'sdStatus',
    'ellStatus',
  ].some((key) => args[key] === 0 || args[key] === null)
  const lineNumberInt = parseInt(lineNumber)
  const index = visit.students.findIndex(
    (x) => x.lineNumber === lineNumberInt && x.session === session
  )
  if (index > -1) {
    const newStudentData = {
      ...visit.students[index],
      ...data,
      missingDemographics,
    }

    visit.students.splice(index, 1, newStudentData)
  } else {
    throw new Error(`Cannot find a student with lineNumber of ${lineNumber}`)
  }
  return visit
}

export function updateMissingDemographics(result, args, cache, info, userdata) {
  updateSampledGrade(cache, args.input.visitId, (visit) =>
    offlineUpdateMissingDemographics(args, visit)
  )
}

/*
type ndas {
	email: String
	name: String
	ndaId: String
}

type NDAsResponse {
	success: Boolean
	status: Int
	body: [ndas]
}

input updateNDAInput {
	id: ID
	email: String
	name: String
	ndaId: String
	oldndaId: String
}

*/

export function offlineUpdateNDAType(nda) {
  if (nda.oldndaId) {
    return 'update'
  } else if (nda.email && nda.name) {
    return 'add'
  } else {
    return 'delete'
  }
}

export function offlineUpdateNDA(ndas, input) {
  let index
  const nda = {
    ndaId: input.ndaId,
    name: input.name,
    email: input.email,
    __typename: 'ndas',
  }
  switch (offlineUpdateNDAType(input)) {
    case 'update':
      index = ndas.findIndex((x) => x.ndaId == input.oldndaId)
      ndas.splice(index, 1, nda)
      break
    case 'add':
      ndas.push(nda)
      break
    case 'delete':
      index = ndas.findIndex((x) => x.ndaId == input.oldndaId)
      ndas.splice(index, 1)
      break
    default:
      throw new Error('Unknown type')
  }

  return ndas
}

export function updateNDA(result, args, cache, info, userdata) {
  updateFromQueryBody(cache, 'GetNDA', { visitId: args.input.id }, (ndas) =>
    offlineUpdateNDA(ndas, args.input)
  )
}

/*

visit
  school
    [makeupSessions] (sessId)


*/

export function offlineUpdateMakeupSession(visit, args) {
  console.log('offlineUpdateMakeupSession', { args, visit })
  const makeupSession = visit.makeupSessions[0]
  makeupSession.makeupDate = args.input.makeupDate
  makeupSession.makeupTime = args.input.makeupTime
  makeupSession.makeupLocation = args.input.makeupLocation
  return visit
}

export function updateMakeupSession(result, args, cache, info, userdata) {
  updateSampledGrade(cache, args.visitId, (visit) =>
    offlineUpdateMakeupSession(visit, args)
  )
}

//***************************************************************/

// this method finds the payload in the "data" attribute
function updateFromQueryData(cache, typename, variables, callback) {
  //  console.log('3pre --------- updateFromQueryData ====>', typename, variables)
  cache.updateQuery(
    {
      query: allQueries[typename],
      variables,
    },
    (data) => {
      if (data !== null) {
        if (data[typename].data) {
          const result = callback(data[typename].data)
          /*          console.log(
            '3 --------- updateFromQueryData ====>',
            data[typename].data,
            's/b',
            result
          )  */
          data[typename].data = result
        }
      }
      return data
    }
  )
}

export function offlineUpdateQuexResponse(history, args, userdata) {
  const qdata = args.input
  /*  // make a copy of the user with typename
  let user = args.input.user
    ? args.input.user //{ ...args.input.user, __typename: 'userProfile' }
    : delete args.input.user
*  console.log(
    '2 --------- offlineUpdateQuexResponse history/user',
    history,
    user
  )
*/
  // if you have an entry for this survey, remove it
  // to enforce the one answer for any survey!
  // EXCEPT FOR 0704-vsf!!!
  if (qdata.quexId !== '0704-vsf') {
    let index = history.findIndex((x) => x.quexid == qdata.quexId)
    if (index >= 0) history.splice(index, 1)
  }

  // make a copy of responses with typename
  let newresp = []
  qdata.responses.forEach((x) =>
    newresp.push({ ...x, __typename: 'AnswerResponses' })
  )

  // make a new entry with a copy of quexdata and typenames all around
  let newobj = {
    quexdata: {
      quexId: qdata.quexId,
      visitId: qdata.visitId,
      responses: newresp,
      __typename: 'QuexData',
    },
    quexid: qdata.quexId,
    trackingdt: new Date().toISOString(),
    updateduid: qdata.updateduid, //user.uid,
    firstname: qdata.firstname, //user.firstname,
    lastname: qdata.lastname, //user.lastname,
    userRole: qdata.userRole, //user.userRole,
    __typename: 'QuexAnswers',
  }

  history.push(newobj)

  return history
}

export function updateQuexResponse(result, args, cache, info, userdata) {
  /*  console.log(
    '--------1b updateQuexResp res/args/cache/info/userdata',
    result,
    args,
    cache,
    info,
    userdata
  ) */
  updateFromQueryData(
    cache,
    'GetQuexAnswers',
    { visitId: args.input.visitId },
    (data) => offlineUpdateQuexResponse(data, args, userdata)
  )
}

//***************************************************************/

const vsfOfflineSupport = {
  resolvers: {
    SampledGradeCard: {
      offlineMeta(parent, args, cache, info) {
        const value = cache.resolve(
          { __typename: 'SampledGrade', visitId: parent.visitId },
          'visitId'
        )

        return value != null ? 'in-cache' : 'not-in-cache'
      },
    },
  },
  updates: {
    Mutation: {
      addTeacher, // SampledGrade and Teachers
      deleteTeacher,
      updateAssessmentNotes, // SampledGrade
      updateBarcode, // SampledGrade and Teachers
      updateMakeupSession, // SampledGrade
      updateMissingDemographics, // SampledGrade
      updateNDA, // Not SampledGrade
      updateQuexResponse, // Not SampledGrade
      updateTeacher, // SampledGrade and Teachers
    },
  },
  optimistic: {
    addTeacher(variables, cache, info, userdata) {
      const result = {
        success: true,
        status: 200,
        errorMessage: '',
        teacher: {
          ...variables.person,
          lineNumber: '??',
          isComplete: false,
          __typename: 'Teacher',
        },
        __typename: 'AddTeacherResponse',
      }
      return result
    },
    updateBarcode(variables, cache, info, userdata) {
      const result = { ...successUpdateResponse }
      return result
    },
    updateTeacher(variables, cache, info, userdata) {
      const result = {
        success: true,
        status: 200,
        errorMessage: '',
        teacher: {
          ...variables.person,
          __typename: 'Teacher',
        },
        __typename: 'UpdateTeacherResponse',
      }
      console.log({ result })
    },
    updateQuexResponse(variables, cache, info, userdata) {
      /*      console.log(
        '1 --------- optimistic section updateQuexResp vars/info',
        variables,
        cache,
        info,
        userdata
      ) */
      return { ...successUpdateResponse, visitId: variables.input.visitId }
    },
    updateAssessmentNotes(variables, cache, info, userdata) {
      return successUpdateResponse
    },
    updateMissingDemographics(variables, cache, info, userdata) {
      return successUpdateResponse
    },
    updateNDA(variables, cache, info, userdata) {
      return {
        ...successUpdateResponse,
        visitId: variables.input.id,
        __typename: 'UpdateNDAResponse',
      }
    },
    updateMakeupSession(variables, cache, info, userdata) {
      console.log('updateMakeupSession', { variables })
      return { ...successUpdateResponse, visitId: variables.visitId }
    },
    deleteTeacher(variables, cache, info, userdata) {
      return {
        __typename: 'DeleteResponse',
        success: true,
        status: 200,
        message: '',
        visitId: variables.visitId,
      }
    },
  },
  keys: {
    Accommodations: (data) => null,
    AddTeacherResponse: (data) => data.visitId,
    AnswerResponses: (data) => null,
    AvailableBarcodes: () => null,
    AvailableBarcodesResponse: () => null,
    AvailableSubject: (data) => null,
    DeleteResponse: (data) => data.visitId,
    Group: (data) => data.groupId,
    Logistics: (data) => null,
    makeupSessions: (data) => data.visitId,
    multipleTeamsACs: (data) => null,
    ndas: (data) => data.ndaId,
    NDAsResponse: (data) => data.visitId,
    Principal: (data) => data.personId,
    QaJsonResponse: (data) => null,
    QuexAnswersResponse: (data) => data.visitId,
    QuexAnswers: (data) => null,
    QuexData: (data) => null,
    QuexIntro: (data) => data.quexid,
    SampledGrade: (data) => data.visitId,
    SampledGradeCard: (data) => data.visitId,
    SampledGradeCardResponse: (data) => data.visitId,
    SampledGradeResponse: (data) => data.visitId,
    School: (data) => data.schoolId,
    Students: (data) => data.loginId,
    Teacher: (data) => data.personId,
    TeachersListResponse: (data) => null,
    TRAEntry: () => null,
    TRAResponse: () => null,
    UpdateNDAResponse: (data) => {
      return data.visitId
    },
  },
}

export const offlineSupport = offlineSupportExtensions(vsfOfflineSupport)
