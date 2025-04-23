const QuestionType = {
  STATIC: Symbol('questionTypeStatic'),
  CHECKBOX: Symbol('questionTypeCheckbox'),
  RADIO_BUTTON: Symbol('questionTypeRadioButton'),
  GROUP: Symbol('questionTypeGroup'),
  WRITE_IN: Symbol('questionTypeWriteIn'),
  TEXT_AREA: Symbol('questionTypeTextArea'),
  GRID: Symbol('questionTypeGrid'),

  SELECT: Symbol('questionTypeDropDownSelect'),
  STATIC_LIST: Symbol('questionTypeStaticList'),
}

Object.freeze(QuestionType)

export default QuestionType

export function QuestionTypeName(typ) {
  switch (typ) {
    case QuestionType.STATIC:
      return 'Static'
    case QuestionType.GROUP:
      return 'Group'
    case QuestionType.GRID:
      return 'Grid'
    case QuestionType.RADIO_BUTTON:
      return 'RadioButton'
    case QuestionType.CHECKBOX:
      return 'Checkbox'
    case QuestionType.WRITE_IN:
      return 'WriteIn'
    case QuestionType.TEXT_AREA:
      return 'TextArea'
    default:
      return 'Unknown'
  }
}
