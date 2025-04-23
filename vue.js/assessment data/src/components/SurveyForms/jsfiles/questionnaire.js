import QuestionType from 'src/components/SurveyForms/jsfiles/questionType'

//  eslint-disable-next-line
import assessmentDebrief from 'src/components/SurveyForms/jsfiles/assessmentDebrief'
import { fsObserverQs } from 'src/components/SurveyForms/jsfiles/fsObserver'

import assessmentDayPerfQs from 'src/components/SurveyForms/jsfiles/assessmentDayPerf'
import aaObservationQs from 'src/components/SurveyForms/jsfiles/aaObservation'

import {
  getSymbolValForControl,
  updateFunction
} from 'src/components/SurveyForms/jsfiles/SurveyFormBase'

//  eslint-disable-next-line
const ErrorSurvey = [
  {
    id: 101,
    name: 'sectionlabel',
    type: QuestionType.STATIC,
    caption: 'Error',
    class: 'text-h3 text-center'
  },
  {
    id: 102,
    type: QuestionType.STATIC,
    caption:
      'The requested survey cannot be found.  Copy and paste the link you were given to lower the chance of errors.',
    class: 'text-body1 text-center'
  }
]

// -----------

function getSurvey(atype) {
  questionnaire.quexID = getSurveyID(atype)

  switch (atype) {
    //deb and fso are 2021
    case 'deb':
      return assessmentDebrief
    case 'fso':
      return fsObserverQs

    // these are for 2022
    case 'deb22':
      return assessmentDebrief
    case 'asd':
      return assessmentDayPerfQs
    case 'aaob':
      return aaObservationQs
    //
    default:
      return ErrorSurvey
  }
}

const questionnaire = {
  quexID: null,
  updateFn: updateFunction,
  questions: getSurvey
}

export default questionnaire

export function getSurveyID(atype) {
  switch (atype) {
    case 'deb':
      return '0601-vsf'
    case 'fso':
      return '0603-vsf'
    case 'deb22':
      return '0701-vsf'
    case 'asd':
      return '0703-vsf'
    case 'aaob':
      return '0704-vsf'
    default:
      return null
  }
}

export function makeResponseObjFromHistory(quests, responseArr) {
  /*
  {
    tag: 'attention-from-sv',
    questionId: '14',
    choiceId: 1,
    value: 'Symbol(YesNo:Yes)',
    reasontext: 'hey hey'
  }
] */
  const obj = {}
  responseArr.forEach(x => {
    let item = Object.assign({}, x)
    obj[item.tag] = item
    item.questionId = parseInt(x.questionId)
    item.value = getSymbolValForControl(quests, item.questionId, item.choiceId)
    item.reason = item.reasontext
    // console.log('makeRespObj', item)
  })
  return obj
}
