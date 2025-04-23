import QuestionType from 'src/components/SurveyForms/jsfiles/questionType'
import {
  YesNo,
  YesNoDisplayName,
  HowWellDidThingsGo,
  HowWellDidThingsGoDisplayName,
  CovidPrecautionsThatChanged,
  CovidPrecautionsThatChangedDisplayName
} from 'src/components/SurveyForms/jsfiles/enums'

import {
  ifYesDescribeLabel,
  reasonWriteIn,
  staticLabel,
  valueCheckbox,
  valueRadio,
  writeInDisable,
  yesNoNAReasonEnable
} from 'src/components/SurveyForms/jsfiles/SurveyFormBase'

const FIELD_HOW_WELL_OVERALL = 'how-well-overall'
const FIELD_PROBLEMS_PROVIDING_ACCOMMODATIONS =
  'problems-providing-accommodations'
const FIELD_PROBLEMS_PROVIDING_ACCOMMODATIONS_TEXT =
  'problems-providing-accommodations-text'
const FIELD_INTERACTION_WITH_SCHOOL_STAFF = 'interaction-with-school-staff'
const FIELD_INTERACTION_WITH_SCHOOL_STAFF_TEXT =
  'interaction-with-school-staff-text'
const FIELD_INTERACTION_WITH_STUDENTS = 'interaction-with-students'
const FIELD_INTERACTION_WITH_STUDENTS_TEXT = 'interaction-with-students-text'
const FIELD_ISSUES_IMPLEMENTING_COVID_PROCEDURES =
  'issues-implementing-covid-procedures'
const FIELD_ISSUES_IMPLEMENTING_COVID_PROCEDURES_TEXT =
  'issues-implementing-covid-procedures-text'
const FIELD_DID_COVID_PROCEDURES_CHANGE = 'did-covid-procedures-change'
const FIELD_COVID_CHANGED_STUDENT_INSTRUCTION_OPTIONS =
  'student-instruction-options'
const FIELD_PARENTAL_CHOICE = 'parental-choice'
const FIELD_HYBRID_INSTRUCTION = 'hybrid-instruction'
const FIELD_ATTENTION_FROM_SV = 'attention-from-sv'
const FIELD_ATTENTION_FROM_SV_TEXT = 'attention-from-sv-text'
const FIELD_STAGGERED_START_TIMES = 'staggered-start-times'
const FIELD_EXTENDED_SCHOOL_DAY = 'extended-school-day'
const FIELD_NUMBER_OF_STUDENTS_ALLOWED_IN_ROOM =
  'number-of-students-allowed-in-room'
const FIELD_SDELL_STUDENTS_ATTENDED_ON_ADDITIONAL_DAYS =
  'sdell-students-attended-on-additional-days'
const FIELD_VISITOR_RESTRICTIONS = 'visitor-restrictions'
const FIELD_PPE_REQUIREMENTS_FOR_VISITORS = 'ppe-requirements-for-visitors'
const FIELD_TIME_LIMIT_IN_BUILDING = 'time-limit-in-building'
const FIELD_SCREENING_TO_ENTER_SITE = 'screening-to-enter-site'
const FIELD_OTHER_SPECIFY = 'other-specify'
const FIELD_OTHER_SPECIFY_TEXT = 'other-specify-text'

// for QuexID 0601
const assessmentDebrief = [
  staticLabel(
    100,
    'Session Debriefing Form',
    'Questionnaire header',
    'text-h4 q-pb-md'
  ),

  {
    id: 1,
    description:
      '1. Think about all the activities on the NAEP testing day. How well did you think things went overall?',
    type: QuestionType.GROUP,
    caption:
      '1.	Think about all the activities on the NAEP testing day. How well did you think things went overall?',
    class: 'text-h6',
    children: [
      valueRadio(
        201,
        FIELD_HOW_WELL_OVERALL,
        1,
        1,
        HowWellDidThingsGo.VERY_WELL,
        HowWellDidThingsGoDisplayName[HowWellDidThingsGo.VERY_WELL]
      ),
      valueRadio(
        202,
        FIELD_HOW_WELL_OVERALL,
        1,
        2,
        HowWellDidThingsGo.SOMEWHAT_WELL,
        HowWellDidThingsGoDisplayName[HowWellDidThingsGo.SOMEWHAT_WELL]
      ),
      valueRadio(
        203,
        FIELD_HOW_WELL_OVERALL,
        1,
        3,
        HowWellDidThingsGo.SOMEWHAT_POORLY,
        HowWellDidThingsGoDisplayName[HowWellDidThingsGo.SOMEWHAT_POORLY]
      ),
      valueRadio(
        204,
        FIELD_HOW_WELL_OVERALL,
        1,
        4,
        HowWellDidThingsGo.VERY_POORLY,
        HowWellDidThingsGoDisplayName[HowWellDidThingsGo.VERY_POORLY]
      )
    ]
  },

  {
    id: 2,
    description:
      '2.	Did you or your team have any problems providing accommodations?',
    type: QuestionType.GROUP,
    caption:
      '2.	Did you or your team have any problems providing accommodations?',
    class: 'text-h6',
    children: [
      valueRadio(
        301,
        FIELD_PROBLEMS_PROVIDING_ACCOMMODATIONS,
        2,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        302,
        FIELD_PROBLEMS_PROVIDING_ACCOMMODATIONS,
        2,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        303,
        FIELD_PROBLEMS_PROVIDING_ACCOMMODATIONS_TEXT,
        3,
        1,
        null,
        ifYesDescribeLabel,
        writeInDisable(
          FIELD_PROBLEMS_PROVIDING_ACCOMMODATIONS,
          yesNoNAReasonEnable
        ),
        'write-in-64-rem'
      )
    ]
  },

  {
    id: 4,
    description:
      '3.	Did you or your team have any interactions with school staff that your supervisor should know about?',
    type: QuestionType.GROUP,
    caption:
      '3.	Did you or your team have any interactions with school staff that your supervisor should know about?',
    class: 'text-h6',
    children: [
      valueRadio(
        401,
        FIELD_INTERACTION_WITH_SCHOOL_STAFF,
        4,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        402,
        FIELD_INTERACTION_WITH_SCHOOL_STAFF,
        4,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        403,
        FIELD_INTERACTION_WITH_SCHOOL_STAFF_TEXT,
        5,
        1,
        null,
        ifYesDescribeLabel,
        writeInDisable(
          FIELD_INTERACTION_WITH_SCHOOL_STAFF,
          yesNoNAReasonEnable
        ),
        'write-in-64-rem'
      )
    ]
  },

  {
    id: 6,
    description:
      '4.	Did you or your team have any interactions with students that your supervisor should know about?',
    type: QuestionType.GROUP,
    caption:
      '4.	Did you or your team have any interactions with students that your supervisor should know about?',
    class: 'text-h6',
    children: [
      valueRadio(
        501,
        FIELD_INTERACTION_WITH_STUDENTS,
        6,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        502,
        FIELD_INTERACTION_WITH_STUDENTS,
        6,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        503,
        FIELD_INTERACTION_WITH_STUDENTS_TEXT,
        7,
        1,
        null,
        ifYesDescribeLabel,
        writeInDisable(FIELD_INTERACTION_WITH_STUDENTS, yesNoNAReasonEnable),
        'write-in-64-rem'
      )
    ]
  },

  {
    id: 8,
    description:
      '5.	Did you or your team have any issues implementing COVID-19 precautions as listed in MyNAEP?',
    type: QuestionType.GROUP,
    caption:
      '5.	Did you or your team have any issues implementing COVID-19 precautions as listed in MyNAEP?',
    class: 'text-h6',
    children: [
      valueRadio(
        601,
        FIELD_ISSUES_IMPLEMENTING_COVID_PROCEDURES,
        8,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        602,
        FIELD_ISSUES_IMPLEMENTING_COVID_PROCEDURES,
        8,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        603,
        FIELD_ISSUES_IMPLEMENTING_COVID_PROCEDURES_TEXT,
        9,
        1,
        null,
        ifYesDescribeLabel,
        writeInDisable(
          FIELD_ISSUES_IMPLEMENTING_COVID_PROCEDURES,
          yesNoNAReasonEnable
        ),
        'write-in-64-rem'
      )
    ]
  },

  {
    id: 10,
    description:
      '6.	In the preassessment review call, SCs specified COVID-19 procedures and/or precautions. On assessment day, did any of these procedures and/or precautions change? ',
    type: QuestionType.GROUP,
    caption:
      '6.	In the preassessment review call, SCs specified COVID-19 procedures and/or precautions. On assessment day, did any of these procedures and/or precautions change? ',
    class: 'text-h6',
    children: [
      valueRadio(
        701,
        FIELD_DID_COVID_PROCEDURES_CHANGE,
        10,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        702,
        FIELD_DID_COVID_PROCEDURES_CHANGE,
        10,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      valueCheckbox(
        703,
        FIELD_COVID_CHANGED_STUDENT_INSTRUCTION_OPTIONS,
        11,
        1,
        CovidPrecautionsThatChanged.STUDENT_INSTRUCTION_OPTIONS,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.STUDENT_INSTRUCTION_OPTIONS
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        704,
        FIELD_PARENTAL_CHOICE,
        11,
        2,
        CovidPrecautionsThatChanged.PARENTAL_CHOICE,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.PARENTAL_CHOICE
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        705,
        FIELD_HYBRID_INSTRUCTION,
        11,
        3,
        CovidPrecautionsThatChanged.HYBRID_INSTRUCTION,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.HYBRID_INSTRUCTION
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        706,
        FIELD_STAGGERED_START_TIMES,
        11,
        4,
        CovidPrecautionsThatChanged.STAGGERED_START_TIMES,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.STAGGERED_START_TIMES
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        707,
        FIELD_EXTENDED_SCHOOL_DAY,
        11,
        5,
        CovidPrecautionsThatChanged.EXTENDED_SCHOOL_DAY,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.EXTENDED_SCHOOL_DAY
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        708,
        FIELD_NUMBER_OF_STUDENTS_ALLOWED_IN_ROOM,
        11,
        6,
        CovidPrecautionsThatChanged.NUMBER_OF_STUDENTS_ALLOWED_IN_ROOM,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.NUMBER_OF_STUDENTS_ALLOWED_IN_ROOM
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        709,
        FIELD_SDELL_STUDENTS_ATTENDED_ON_ADDITIONAL_DAYS,
        11,
        7,
        CovidPrecautionsThatChanged.SDELL_STUDENTS_ATTENDED_ON_ADDITIONAL_DAYS,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.SDELL_STUDENTS_ATTENDED_ON_ADDITIONAL_DAYS
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        710,
        FIELD_VISITOR_RESTRICTIONS,
        11,
        8,
        CovidPrecautionsThatChanged.VISITOR_RESTRICTIONS,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.VISITOR_RESTRICTIONS
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        711,
        FIELD_PPE_REQUIREMENTS_FOR_VISITORS,
        11,
        9,
        CovidPrecautionsThatChanged.PPE_REQUIREMENTS_FOR_VISITORS,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.PPE_REQUIREMENTS_FOR_VISITORS
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        712,
        FIELD_TIME_LIMIT_IN_BUILDING,
        11,
        10,
        CovidPrecautionsThatChanged.TIME_LIMIT_IN_BUILDING,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.TIME_LIMIT_IN_BUILDING
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      ),
      valueCheckbox(
        713,
        FIELD_SCREENING_TO_ENTER_SITE,
        11,
        11,
        CovidPrecautionsThatChanged.SCREENING_TO_ENTER_SITE,
        CovidPrecautionsThatChangedDisplayName[
          CovidPrecautionsThatChanged.SCREENING_TO_ENTER_SITE
        ],
        writeInDisable(FIELD_DID_COVID_PROCEDURES_CHANGE, yesNoNAReasonEnable)
      )
    ]
  },

  {
    id: 12,
    description:
      '7.	Did any other COVID-19 procedures and/or precautions change that were not covered above?',
    type: QuestionType.GROUP,
    caption:
      '7.	Did any other COVID-19 procedures and/or precautions change that were not covered above?',
    class: 'text-h6',
    children: [
      valueRadio(
        801,
        FIELD_OTHER_SPECIFY,
        12,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        802,
        FIELD_OTHER_SPECIFY,
        12,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        803,
        FIELD_OTHER_SPECIFY_TEXT,
        13,
        1,
        null,
        ifYesDescribeLabel,
        writeInDisable(FIELD_OTHER_SPECIFY, yesNoNAReasonEnable),
        'write-in-64-rem'
      )
    ]
  },

  {
    id: 14,
    description:
      '8.	Did anything happen on assessment day that requires immediate attention from your supervisor?',
    type: QuestionType.GROUP,
    caption:
      '8.	Did anything happen on assessment day that requires immediate attention from your supervisor?',
    class: 'text-h6',
    children: [
      valueRadio(
        901,
        FIELD_ATTENTION_FROM_SV,
        14,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        902,
        FIELD_ATTENTION_FROM_SV,
        14,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        903,
        FIELD_ATTENTION_FROM_SV_TEXT,
        15,
        1,
        null,
        ifYesDescribeLabel,
        writeInDisable(FIELD_ATTENTION_FROM_SV, yesNoNAReasonEnable),
        'write-in-64-rem'
      )
    ]
  },

  // below 2 questions added for VSF-47
  {
    id: 1000,
    name: "group",
    type: QuestionType.GROUP,
    caption: "9. Were students wearing masks during the assessment?",
    class: "text-h6",
    children: [
      valueRadio(
    10001,
    "students-masked",
    200,
    1,
    'All or nearly all of the students were wearing masks',
    'All or nearly all of the students were wearing masks',
    "null"
  ),
valueRadio(
    10002,
    "students-masked",
    200,
    2,
    'More than half of the students were wearing masks',
    'More than half of the students were wearing masks',
    "null"
  ),
valueRadio(
    10003,
    "students-masked",
    200,
    3,
    'About half of the students were wearing masks',
    'About half of the students were wearing masks',
    "null"
  ),
valueRadio(
    10004,
    "students-masked",
    200,
    4,
    'Fewer than half of the students were wearing masks',
    'Fewer than half of the students were wearing masks',
    "null"
  ),
valueRadio(
    10005,
    "students-masked",
    200,
    5,
    'None of the students were wearing masks',
    'None of the students were wearing masks',
    "null"
  )]
  },

  {
    id: 1001,
    name: "group",
    type: QuestionType.GROUP,
    caption: "10. Did the school have social distancing for students while taking NAEP (e.g. 3 feet between students or partitions between students)?",
    class: "text-h6",
    children: [
      valueRadio(
    10011,
    "social-distancing",
    201,
    1,
    'Yes',
    'Yes',
    "null"
     ),
     valueRadio(
    10012,
    "social-distancing",
    201,
    2,
    'No',
    'No',
    "null"
    )]
  }
]

export default assessmentDebrief

