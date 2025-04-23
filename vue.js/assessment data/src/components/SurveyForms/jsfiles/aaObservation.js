import QuestionType from 'src/components/SurveyForms/jsfiles/questionType'
import {
  alwaysEnable,
  enableExceedDidNotMeet,
  reasonWriteIn,
  staticLabel,
  valueRadio,
  writeInDisable,
  staticList,
} from 'src/components/SurveyForms/jsfiles/SurveyFormBase'

const AA_NAME = 'aa-name'
const SESSION_NUM = 'session-num'
const GROUP_NAME = 'group'
const ATT_SCHEDULE_EQUIPMENT = 'att-schedule-equipment'
const ATT_SCHEDULE_EQUIPMENT_TEXT = 'att-schedule-equipment-text'
const TEAMWORK_RATING = 'teamwork'
const TEAMWORK_RATING_TEXT = 'teamwork-text'
const KNOWLEDGE_SKILLS_PERFORMANCE = 'knowledge-skills-performance'
const KNOWLEDGE_SKILLS_PERFORMANCE_TEXT = 'knowledge-skills-performance-text'
const STRENGTH_WEAKNESS = 'strength-weakness'

const aaObservationQs = [
  staticLabel(100, 'AA Observation', 'Questionnaire header', 'text-h4 q-pb-md'),
  /*  {
    id: 480,
    type: QuestionType.GROUP,
    caption: 'AA Name:',
    class: 'text-h6',
    children: [selectText(2135, AA_NAME, 481, 1)],
  },
  {
    id: 482,
    type: QuestionType.GROUP,
    caption: 'Session #:',
    class: 'text-h6',
    children: [selectText(2136, SESSION_NUM, 482, 1)],
  },
  {
    id: 483,
    type: QuestionType.GROUP,
    caption: 'Group:',
    class: 'text-h6',
    children: [selectText(2137, GROUP_NAME, 483, 1)],
  },
*/
  staticLabel(
    110,
    'Attendance/On Schedule/Equipment Care',
    'section header',
    'text-h6'
  ),
  {
    id: 485,
    type: QuestionType.GROUP,
    caption:
      '_Overall, rate how the AA did with **attendance/on schedule/equipment care** on assessment day.  Use the list of tasks below to help determine the overall rating._',
    class: 'text-h6',
    children: [
      staticList(2014, 'Tasks for Attendance/On Schedule/Equipment Care', [
        'Arrived on time',
        'Helped unload DBA equipment',
        'Wore NAEP ID Badge',
        'Had appropriate materials (manual, session scripts, reference materials)',
        'Set up equipment correctly',
        'Wiped down equipment after setting up',
        'Distributed ancillaries appropriately',
        'Correctly set up in disconnected mode',
        'Prepared for accomodations',
        'Dismissed students according to protocol',
      ]),
      valueRadio(2010, ATT_SCHEDULE_EQUIPMENT, 485, 1, 'Exceeded', 'Exceeded'),
      valueRadio(2011, ATT_SCHEDULE_EQUIPMENT, 485, 2, 'Met', 'Met'),
      valueRadio(
        2012,
        ATT_SCHEDULE_EQUIPMENT,
        485,
        3,
        'Did Not Meet',
        'Did Not Meet'
      ),
      valueRadio(
        2013,
        ATT_SCHEDULE_EQUIPMENT,
        485,
        4,
        'Did Not Observe',
        'Did Not Observe'
      ),
      reasonWriteIn(
        2015,
        ATT_SCHEDULE_EQUIPMENT_TEXT,
        485,
        5,
        null,
        'If you gave an AA an Exceeded or Did Not Meet, provide details explaining why the AA received this rating.',
        writeInDisable(ATT_SCHEDULE_EQUIPMENT, enableExceedDidNotMeet),
        'write-in-64-rem'
      ),
    ],
  },
  staticLabel(486, 'Teamwork', 'section header', 'text-h6'),
  {
    id: 487,
    type: QuestionType.GROUP,
    caption:
      '_Overall, rate how the AA did with **teamwork** on assessment day.  Use the list of tasks below to help determine the overall rating._',
    class: 'text-h6',
    children: [
      staticList(2019, 'Tasks for Teamwork', [
        'Assisted AC, as requested',
        'Assisted AC with transfer of Admin Codes into admin interface',
        'Assisted in checking that all equipment and materials packed according to procedure',
        'Appropriately handled difficult situations',
        'Moved around the room to monitor session',
        'Responded appropriately to observers',
        'Collected Student Login Cards, equipment accessories, and ancillaries',
        'Distributed certificates (if applicable)',
      ]),
      valueRadio(2020, TEAMWORK_RATING, 487, 1, 'Exceeded', 'Exceeded'),
      valueRadio(2021, TEAMWORK_RATING, 487, 2, 'Met', 'Met'),
      valueRadio(2022, TEAMWORK_RATING, 487, 3, 'Did Not Meet', 'Did Not Meet'),
      valueRadio(
        2023,
        TEAMWORK_RATING,
        487,
        4,
        'Did Not Observe',
        'Did Not Observe'
      ),
      reasonWriteIn(
        2025,
        TEAMWORK_RATING_TEXT,
        487,
        5,
        null,
        'If you gave an AA an Exceeded or Did Not Meet, provide details explaining why the AA received this rating.',
        writeInDisable(TEAMWORK_RATING, enableExceedDidNotMeet),
        'write-in-64-rem'
      ),
    ],
  },
  staticLabel(488, 'Knowledge/Skills/Performance', 'section header', 'text-h6'),
  {
    id: 489,
    type: QuestionType.GROUP,
    caption:
      '_Overall, rate how the AA did with **knowledge/skills/performance** on assessment day.  Use the list of tasks below to help determine the overall rating._',
    class: 'text-h6',
    children: [
      staticList(2029, 'Tasks for Knowledge/Skills/Performance', [
        'Concealed materials that would assist students (as or if) directed',
        'Helped students enter login IDs as necessary',
        'Helped students enter teacher numbers as necessary',
        'Read script verbatim with fluency',
        'Used the QxQs to answer questions',
        'Correctly followed troubleshooting procedures for technical issues',
        'Reported technical issues correctly',
        'Verified that data was on the admin tablet before shutting down student tablets',
      ]),
      valueRadio(
        2030,
        KNOWLEDGE_SKILLS_PERFORMANCE,
        489,
        1,
        'Exceeded',
        'Exceeded'
      ),
      valueRadio(2031, KNOWLEDGE_SKILLS_PERFORMANCE, 489, 2, 'Met', 'Met'),
      valueRadio(
        2032,
        KNOWLEDGE_SKILLS_PERFORMANCE,
        489,
        3,
        'Did Not Meet',
        'Did Not Meet'
      ),
      valueRadio(
        2033,
        KNOWLEDGE_SKILLS_PERFORMANCE,
        489,
        4,
        'Did Not Observe',
        'Did Not Observe'
      ),
      reasonWriteIn(
        2035,
        KNOWLEDGE_SKILLS_PERFORMANCE_TEXT,
        489,
        5,
        null,
        'If you gave an AA an Exceeded or Did Not Meet, provide details explaining why the AA received this rating.',
        writeInDisable(KNOWLEDGE_SKILLS_PERFORMANCE, enableExceedDidNotMeet),
        'write-in-64-rem'
      ),
    ],
  },
  {
    id: 490,
    type: QuestionType.GROUP,
    caption:
      '_AC: Comment on **weakness of the AA** to be addressed and **strengths of the AA**._',
    class: 'text-h6',
    children: [
      reasonWriteIn(
        2035,
        STRENGTH_WEAKNESS,
        490,
        1,
        null,
        'Please comment...',
        null, //writeInDisable(STRENGTH_WEAKNESS_TEXT, alwaysEnable),
        'write-in-64-rem'
      ),
    ],
  },
  /*
  {
    id: 200,
    type: QuestionType.GROUP,
    caption:
      '2. How satisfied were you with the overall NAEP team performance?',
    class: 'text-h6',
    children: [
      valueRadio(
        201,
        FIELD_OVERALL_SATISFIED,
        313,
        1,
        OverallSatisfiedAgreeDisagree.COMPLETELY_SATISFIED,
        OverallSatisfiedAgreeDisagreeDisplayName[
          OverallSatisfiedAgreeDisagree.COMPLETELY_SATISFIED
        ]
      ),
      valueRadio(
        202,
        FIELD_OVERALL_SATISFIED,
        313,
        2,
        OverallSatisfiedAgreeDisagree.SOMEWHAT_SATISFIED,
        OverallSatisfiedAgreeDisagreeDisplayName[
          OverallSatisfiedAgreeDisagree.SOMEWHAT_SATISFIED
        ]
      ),
      valueRadio(
        204,
        FIELD_OVERALL_SATISFIED,
        313,
        3,
        OverallSatisfiedAgreeDisagree.SOMEWHAT_UNSATISFIED,
        OverallSatisfiedAgreeDisagreeDisplayName[
          OverallSatisfiedAgreeDisagree.SOMEWHAT_UNSATISFIED
        ]
      ),
      valueRadio(
        205,
        FIELD_OVERALL_SATISFIED,
        313,
        4,
        OverallSatisfiedAgreeDisagree.COMPLETELY_UNSATISFIED,
        OverallSatisfiedAgreeDisagreeDisplayName[
          OverallSatisfiedAgreeDisagree.COMPLETELY_UNSATISFIED
        ]
      )
    ]
  },
  staticLabel(
    300,
    'NAEP Team Performance ++before++ the assessment',
    'section header',
    'text-h6'
  ),

  {
    id: 1200,
    type: QuestionType.GROUP,
    caption: '10.	Are you planning another observation of this team?',
    class: 'text-h6',
    children: [
      valueRadio(
        1201,
        FIELD_PLANNING_ANOTHER_OBSERVATION,
        469,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        1202,
        FIELD_PLANNING_ANOTHER_OBSERVATION,
        469,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      )
    ]
  },

  {
    id: 1300,
    type: QuestionType.GROUP,
    caption:
      '11.	Do you have any additonal information to report about this observation that you have not already recorded in the questions above?',
    class: 'text-h6',
    children: [
      valueRadio(
        1301,
        FIELD_ADDITIONAL_INFO,
        472,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        1302,
        FIELD_ADDITIONAL_INFO,
        472,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        1303,
        FIELD_ADDITIONAL_INFO_TEXT,
        472,
        3,
        null,
        ifYesDescribeLabel,
        writeInDisable(FIELD_ADDITIONAL_INFO, yesNoNAReasonEnable),
        'write-in-64-rem'
      )
    ]
  }
  */
]

export default aaObservationQs
