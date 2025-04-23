export const CovidPrecautionsThatChanged = {
  STUDENT_INSTRUCTION_OPTIONS: Symbol(
    'CovidPrecautionsThatChanged:StudentInstructionOptions'
  ),
  PARENTAL_CHOICE: Symbol('CovidPrecautionsThatChanged:ParentalChoice'),
  HYBRID_INSTRUCTION: Symbol('CovidPrecautionsThatChanged:HybridInstruction'),
  STAGGERED_START_TIMES: Symbol(
    'CovidPrecautionsThatChanged:StaggeredStartTimes'
  ),
  EXTENDED_SCHOOL_DAY: Symbol('CovidPrecautionsThatChanged:ExtendedSchoolDay'),
  NUMBER_OF_STUDENTS_ALLOWED_IN_ROOM: Symbol(
    'CovidPrecautionsThatChanged:NumberOfStudentsAllowedInRoom'
  ),
  SDELL_STUDENTS_ATTENDED_ON_ADDITIONAL_DAYS: Symbol(
    'CovidPrecautionsThatChanged:SDELLStudentsAttendedOnAdditionalDays'
  ),
  VISITOR_RESTRICTIONS: Symbol(
    'CovidPrecautionsThatChanged:VisitorRestrictions'
  ),
  PPE_REQUIREMENTS_FOR_VISITORS: Symbol(
    'CovidPrecautionsThatChanged:PPERequirementsForVisitors'
  ),
  TIME_LIMIT_IN_BUILDING: Symbol(
    'CovidPrecautionsThatChanged:TimeLimitInBuilding'
  ),
  SCREENING_TO_ENTER_SITE: Symbol(
    'CovidPrecautionsThatChanged:ScreeningToEnterSite'
  ),
  OTHER_SPECIFY: Symbol('CovidPrecautionsThatChanged:OtherSpecify')
}

Object.freeze(CovidPrecautionsThatChanged)

export const CovidPrecautionsThatChangedDisplayName = {
  [CovidPrecautionsThatChanged.STUDENT_INSTRUCTION_OPTIONS]:
    'Student instruction options (i.e., all in-person, all remote, or hybrid)',
  [CovidPrecautionsThatChanged.PARENTAL_CHOICE]:
    'Parental choice on student instruction options',
  [CovidPrecautionsThatChanged.HYBRID_INSTRUCTION]:
    'Hybrid instruction options (e.g., half-day rotation, one-day rotation, etc.)',
  [CovidPrecautionsThatChanged.STAGGERED_START_TIMES]: 'Staggered start times',
  [CovidPrecautionsThatChanged.EXTENDED_SCHOOL_DAY]: 'Extended school day',
  [CovidPrecautionsThatChanged.NUMBER_OF_STUDENTS_ALLOWED_IN_ROOM]:
    'Number of students allowed per room',
  [CovidPrecautionsThatChanged.SDELL_STUDENTS_ATTENDED_ON_ADDITIONAL_DAYS]:
    'SD/EL students attend on additional days',
  [CovidPrecautionsThatChanged.VISITOR_RESTRICTIONS]: 'Visitor restrictions',
  [CovidPrecautionsThatChanged.PPE_REQUIREMENTS_FOR_VISITORS]:
    'PPE requirements for visitors',
  [CovidPrecautionsThatChanged.TIME_LIMIT_IN_BUILDING]:
    'Time limit in building',
  [CovidPrecautionsThatChanged.SCREENING_TO_ENTER_SITE]:
    'Screening to enter site'
}

Object.freeze(CovidPrecautionsThatChangedDisplayName)

//--
export const HowWellDidThingsGo = {
  VERY_WELL: Symbol('HowWellDidThingsGo:VeryWell'),
  SOMEWHAT_WELL: Symbol('HowWellDidThingsGo:SomewhatWell'),
  SOMEWHAT_POORLY: Symbol('HowWellDidThingsGo:SomewhatPoorly'),
  VERY_POORLY: Symbol('HowWellDidThingsGo:VeryPoorly')
}

Object.freeze(HowWellDidThingsGo)

export const HowWellDidThingsGoDisplayName = {
  [HowWellDidThingsGo.VERY_WELL]: 'Very well',
  [HowWellDidThingsGo.SOMEWHAT_WELL]: 'Somewhat well',
  [HowWellDidThingsGo.SOMEWHAT_POORLY]: 'Somewhat poorly',
  [HowWellDidThingsGo.VERY_POORLY]: 'Very poorly'
}
//--

export const OverallSatisfiedAgreeDisagree = {
  COMPLETELY_SATISFIED: Symbol('OverallSatisfied:CompletelySatisfied'),
  SOMEWHAT_SATISFIED: Symbol('OverallSatisfied:SomewhatSatisfied'),
  SOMEWHAT_UNSATISFIED: Symbol('OverallSatisfied:SomewhatUnsatisfied'),
  COMPLETELY_UNSATISFIED: Symbol('OverallSatisfied:CompletelyUnsatisfied')
}

Object.freeze(OverallSatisfiedAgreeDisagree)

export const OverallSatisfiedAgreeDisagreeDisplayName = {
  [OverallSatisfiedAgreeDisagree.COMPLETELY_SATISFIED]: 'Completely satisfied',
  [OverallSatisfiedAgreeDisagree.SOMEWHAT_SATISFIED]: 'Somewhat satisfied',
  [OverallSatisfiedAgreeDisagree.SOMEWHAT_UNSATISFIED]: 'Somewhat unsatisfied',
  [OverallSatisfiedAgreeDisagree.COMPLETELY_UNSATISFIED]:
    'Completely unsatisfied'
}

export const YesNo = {
  YES: Symbol('YesNo:Yes'),
  NO: Symbol('YesNo:No')
}

Object.freeze(YesNo)

export const YesNoDisplayName = {
  [YesNo.YES]: 'Yes',
  [YesNo.NO]: 'No'
}

export const YesNoNA = {
  YES: Symbol('yesNoNotApplicable:Yes'),
  NO: Symbol('yesNoNotApplicable:No'),
  NOT_APPLICABLE: Symbol('yesNoNotApplicable:NotApplicable')
}

export const YesNoNADisplayName = {
  [YesNoNA.YES]: 'Yes',
  [YesNoNA.NO]: 'No',
  [YesNoNA.NOT_APPLICABLE]: 'Not applicable'
}

Object.freeze(YesNoNA)

export function displayName(val) {
  var result = val.toString()
  if (result.includes('YesNo:')) return YesNoDisplayName[val]
  if (result.includes('cable:')) return YesNoNADisplayName[val]
  if (result.includes('Changed:'))
    return CovidPrecautionsThatChangedDisplayName[val]
  if (result.includes('ThingsGo:')) return HowWellDidThingsGoDisplayName[val]
  if (result.includes('OverallSatisfied:'))
    return OverallSatisfiedAgreeDisagreeDisplayName[val]
  return result
}
