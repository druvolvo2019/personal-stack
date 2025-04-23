import { QuestionTypeName } from './questionType'

const ZWSP = '\u200B'

export const formatWithIndex = (template, indices) => {
  const sIndex = indices.map((index) => index.toString()).join('.');
  return template
    ? template
        .replace('%%', ZWSP)
        .replace('%n', sIndex)
        .replace(ZWSP, '%%')
    : ''
}

export const questionClass = (question, response) => {
  if (question && question.class) {
    if (typeof question.class === 'function') {
      return question.class(response)
    } else {
      return question.class
    }
  }
  return ''
}

export const questionDisable = (question, response) => {
  if (question && question.disable) {
    if (typeof question.disable === 'function') {
      return question.disable(response)
    } else {
      return question.disable
    }
  }
  return false; // default to always enabled "";
};

export const dataCyValue = (question) => {
  const tn = QuestionTypeName(question.type)
  switch (tn) {
    case 'Static':
      return `${tn}-${question.id}`
    case 'Grid':
    case 'Group':
      return `${tn}-${question.id}-${question.caption
        .substring(0, 15)
        .replaceAll(' ', '-')}`
    case 'RadioButton':
    case 'Checkbox':
    case 'WriteIn':
    case 'TextArea':
      return `${tn}-${question.questionId}-${question.choiceId}`
    default:
      return 'Unknown'
  }
}
