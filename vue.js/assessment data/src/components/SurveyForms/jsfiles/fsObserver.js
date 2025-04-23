import QuestionType from 'src/components/SurveyForms/jsfiles/questionType'
import {
  YesNoNA,
  YesNo,
  YesNoDisplayName,
  OverallSatisfiedAgreeDisagree,
  OverallSatisfiedAgreeDisagreeDisplayName
} from 'src/components/SurveyForms/jsfiles/enums'
import {
  enableOnNoOrNA,
  reasonWriteIn,
  staticLabel,
  valueRadio,
  writeInDisable,
  yesNoNAReasonEnable,
  yesNoNAReasonEnableOnNo
} from 'src/components/SurveyForms/jsfiles/SurveyFormBase'

const FIELD_OVERALL_SATISFIED = 'overall-satisfied' // 1-1-1 to 1-1-4
const FIELD_ARRIVE_ON_TIME = 'arrive-on-time'
const FIELD_ARRIVE_ON_TIME_TEXT = 'arrive-on-time-text'
const FIELD_WEAR_NAEP_BADGE = 'wear-naep-badge'
const FIELD_WEAR_NAEP_BADGE_TEXT = 'wear-naep-badge-text'
const FIELD_HAD_ALL_MATERIALS = 'had-all-materials'
const FIELD_HAD_ALL_MATERIALS_TEXT = 'had-all-materials-text'
const FIELD_COURTESY_TO_STAFF = 'courtesy-to-staff'
const FIELD_COURTESY_TO_STAFF_TEXT = 'courtesy-to-staff-text'
const FIELD_COURTESY_TO_STUDENTS = 'courtesy-to-students'
const FIELD_COURTESY_TO_STUDENTS_TEXT = 'courtesy-to-students-text'
const FIELD_COURTESY_TO_NAEP_TEAM = 'courtesy-to-naep-team'
const FIELD_COURTESY_TO_NAEP_TEAM_TEXT = 'courtesy-to-naep-team-text'
const FIELD_PREPARE_TO_PROTOCOL = 'prepare-to-protocol'
const FIELD_PREPARE_TO_PROTOCOL_TEXT = 'prepare-to-protocol-text'
const FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_BEFORE =
  'implement-naep-covid-protocols-before'
const FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_BEFORE_TEXT =
  'implement-naep-covid-protocols-before-text'
const FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_BEFORE =
  'implement-school-covid-protocols-before'
const FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_BEFORE_TEXT =
  'implement-school-covid-protocols-before-text'

const FIELD_MEET_WITH_SC_ABOUT_REFUSALS = 'meet-with-sc-about-refusals'
const FIELD_MEET_WITH_SC_ABOUT_REFUSALS_TEXT =
  'meet-with-sc-about-refusals-text'
const FIELD_RECORD_SDELL_CHANGES = 'record-sdell-changes'
const FIELD_RECORD_SDELL_CHANGES_TEXT = 'record-sdell-changes-text'
const FIELD_REVIEW_ACCOMM_INFO = 'review-accomm-info'
const FIELD_REVIEW_ACCOMM_INFO_TEXT = 'review-accomm-info-text'
const FIELD_COMPLETE_NDAS = 'complete-ndas'
const FIELD_COMPLETE_NDAS_TEXT = 'complete-ndas-text'

const FIELD_START_ON_TIME = 'start-on-time'
const FIELD_START_ON_TIME_TEXT = 'start-on-time-text'
const FIELD_READ_SCRIPT_VERBATIM = 'read-script-verbatim'
const FIELD_READ_SCRIPT_VERBATIM_TEXT = 'read-script-verbatim-text'
const FIELD_PROVIDE_PLANNED_ACCOMM = 'provide-planned-accomm'
const FIELD_PROVIDE_PLANNED_ACCOMM_TEXT = 'provide-planned-accomm-text'
const FIELD_FOLLOWED_PROTOCOL = 'followed-protocol'
const FIELD_FOLLOWED_PROTOCOL_TEXT = 'followed-protocol-text'

const FIELD_CALM_AND_PROFESSIONAL = 'calm-and-professional'
const FIELD_CALM_AND_PROFESSIONAL_TEXT = 'calm-and-professional-text'
const FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_DURING =
  'implement-naep-covid-protocols-during'
const FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_DURING_TEXT =
  'implement-naep-covid-protocols-during-text'
const FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_DURING =
  'implement-school-covid-protocols-during'
const FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_DURING_TEXT =
  'implement-school-covid-protocols-during-text'
const FIELD_DISMISS_ACCORDING_TO_PLAN = 'dismiss-according-to-plan'
const FIELD_DISMISS_ACCORDING_TO_PLAN_TEXT = 'dismiss-according-to-plan-text'

const FIELD_ADMIN_TASKS_TO_PROTOCOL = 'admin-tasks-to-protocol'
const FIELD_ADMIN_TASKS_TO_PROTOCOL_TEXT = 'admin-tasks-to-protocol-text'
const FIELD_ACCOUNT_FOR_MATERIALS = 'account-for-materials'
const FIELD_ACCOUNT_FOR_MATERIALS_TEXT = 'account-for-materials-text'
const FIELD_CLEAN_FOLLOWING_NAEP_COVID_PROTOCOLS =
  'clean-following-naep-covid-protocols'
const FIELD_CLEAN_FOLLOWING_NAEP_COVID_PROTOCOLS_TEXT =
  'clean-following-naep-covid-protocols-text'
const FIELD_CLEAN_FOLLOWING_SCHOOL_COVID_PROTOCOLS =
  'clean-following-school-covid-protocols'
const FIELD_CLEAN_FOLLOWING_SCHOOL_COVID_PROTOCOLS_TEXT =
  'clean-following-school-covid-protocols-text'

const FIELD_COMPLETE_SESSION_DEBRIEFING_FORM =
  'complete-session-debriefing-form'
const FIELD_COMPLETE_SESSION_DEBRIEFING_FORM_TEXT =
  'complete-session-debriefing-form-text'
const FIELD_MEET_WITH_THE_SC = 'meet-with-the-sc'
const FIELD_MEET_WITH_THE_SC_TEXT = 'meet-with-the-sc-text'
const FIELD_SCHEDULE_MAKEUP = 'schedule-makeup'
const FIELD_SCHEDULE_MAKEUP_TEXT = 'schedule-makeup-text'

const FIELD_ATTENTION_FROM_FM = 'attention-from-fm'
const FIELD_ATTENTION_FROM_FM_TEXT = 'attention-from-fm-text'
const FIELD_PLANNING_ANOTHER_OBSERVATION = 'planning-another-observation'
const FIELD_ADDITIONAL_INFO = 'additional-info'
const FIELD_ADDITIONAL_INFO_TEXT = 'additional-info-text'

export const fsObserverQs = [
  staticLabel(
    100,
    'Field Staff Observer Form',
    'Questionnaire header',
    'text-h4 q-pb-md'
  ),
  {
    id: 200,
    description:
      '1. How satisfied were you with the overall NAEP team performance?',
    type: QuestionType.GROUP,
    caption:
      '1. How satisfied were you with the overall NAEP team performance?',
    class: 'text-h6',
    children: [
      valueRadio(
        201,
        FIELD_OVERALL_SATISFIED,
        102,
        1,
        OverallSatisfiedAgreeDisagree.COMPLETELY_SATISFIED,
        OverallSatisfiedAgreeDisagreeDisplayName[
          OverallSatisfiedAgreeDisagree.COMPLETELY_SATISFIED
        ]
      ),
      valueRadio(
        202,
        FIELD_OVERALL_SATISFIED,
        102,
        2,
        OverallSatisfiedAgreeDisagree.SOMEWHAT_SATISFIED,
        OverallSatisfiedAgreeDisagreeDisplayName[
          OverallSatisfiedAgreeDisagree.SOMEWHAT_SATISFIED
        ]
      ),
      valueRadio(
        204,
        FIELD_OVERALL_SATISFIED,
        102,
        3,
        OverallSatisfiedAgreeDisagree.SOMEWHAT_UNSATISFIED,
        OverallSatisfiedAgreeDisagreeDisplayName[
          OverallSatisfiedAgreeDisagree.SOMEWHAT_UNSATISFIED
        ]
      ),
      valueRadio(
        205,
        FIELD_OVERALL_SATISFIED,
        102,
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
    'NAEP Team Performance before the assessment',
    'section header',
    'text-h6'
  ),
  {
    id: 400,
    description: '2. Before the assessment, did every member of the NAEP team:',
    caption: '2. Before the assessment, did every member of the NAEP team:',
    type: QuestionType.GRID,
    columns: ['row-caption', 'yes', 'no', 'na-dno', 'reason'],
    class: 'text-h6',
    children: [
      {
        id: 401,
        children: [
          staticLabel(402, '', null, 'grid-cell-wrap column-width-shorter'),
          staticLabel(403, 'Yes', null, 'grid-cell-wrap'),
          staticLabel(404, 'No', null, 'grid-cell-wrap'),
          staticLabel(
            405,
            'Not Applicable/ Did not Observe',
            null,
            'grid-cell-wrap'
          ),
          staticLabel(
            406,
            'If No or Not Applicable, please explain',
            null,
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 407,
        children: [
          staticLabel(
            408,
            'Arrive on time',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            409,
            FIELD_ARRIVE_ON_TIME,
            109,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            410,
            FIELD_ARRIVE_ON_TIME,
            109,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            411,
            FIELD_ARRIVE_ON_TIME,
            109,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            412,
            FIELD_ARRIVE_ON_TIME_TEXT,
            109,
            4,
            null,
            null,
            writeInDisable(FIELD_ARRIVE_ON_TIME, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 413,
        children: [
          staticLabel(
            414,
            'Wear the NAEP badge and appropriate attire',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            415,
            FIELD_WEAR_NAEP_BADGE,
            114,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            416,
            FIELD_WEAR_NAEP_BADGE,
            114,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            417,
            FIELD_WEAR_NAEP_BADGE,
            114,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            418,
            FIELD_WEAR_NAEP_BADGE_TEXT,
            114,
            4,
            null,
            null,
            writeInDisable(FIELD_WEAR_NAEP_BADGE, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 419,
        children: [
          staticLabel(
            420,
            'Appear organized and prepared, had all materials needed',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            421,
            FIELD_HAD_ALL_MATERIALS,
            119,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            422,
            FIELD_HAD_ALL_MATERIALS,
            119,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            423,
            FIELD_HAD_ALL_MATERIALS,
            119,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            424,
            FIELD_HAD_ALL_MATERIALS_TEXT,
            119,
            4,
            null,
            null,
            writeInDisable(FIELD_HAD_ALL_MATERIALS, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 425,
        children: [
          staticLabel(
            426,
            'Display professional demeanor and courtesy to school staff',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            427,
            FIELD_COURTESY_TO_STAFF,
            124,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            428,
            FIELD_COURTESY_TO_STAFF,
            124,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            429,
            FIELD_COURTESY_TO_STAFF,
            124,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            430,
            FIELD_COURTESY_TO_STAFF_TEXT,
            124,
            4,
            null,
            null,
            writeInDisable(FIELD_COURTESY_TO_STAFF, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 431,
        children: [
          staticLabel(
            432,
            'Display professional demeanor and courtesy to students',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            433,
            FIELD_COURTESY_TO_STUDENTS,
            129,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            434,
            FIELD_COURTESY_TO_STUDENTS,
            129,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            435,
            FIELD_COURTESY_TO_STUDENTS,
            129,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            436,
            FIELD_COURTESY_TO_STUDENTS_TEXT,
            129,
            4,
            null,
            null,
            writeInDisable(FIELD_COURTESY_TO_STUDENTS, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 437,
        children: [
          staticLabel(
            438,
            'Display professional demeanor and courtesy to other NAEP team members',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            439,
            FIELD_COURTESY_TO_NAEP_TEAM,
            134,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            440,
            FIELD_COURTESY_TO_NAEP_TEAM,
            134,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            441,
            FIELD_COURTESY_TO_NAEP_TEAM,
            134,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            442,
            FIELD_COURTESY_TO_NAEP_TEAM_TEXT,
            134,
            4,
            null,
            null,
            writeInDisable(
              FIELD_COURTESY_TO_NAEP_TEAM,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 443,
        children: [
          staticLabel(
            444,
            'Prepare the testing room according to protocol',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            445,
            FIELD_PREPARE_TO_PROTOCOL,
            139,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            446,
            FIELD_PREPARE_TO_PROTOCOL,
            139,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            447,
            FIELD_PREPARE_TO_PROTOCOL,
            139,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            448,
            FIELD_PREPARE_TO_PROTOCOL_TEXT,
            139,
            4,
            null,
            null,
            writeInDisable(FIELD_PREPARE_TO_PROTOCOL, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 449,
        children: [
          staticLabel(
            450,
            'Implement NAEP COVID-19 protocols',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            451,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_BEFORE,
            144,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            452,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_BEFORE,
            144,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            453,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_BEFORE,
            144,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            454,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_BEFORE_TEXT,
            144,
            4,
            null,
            null,
            writeInDisable(
              FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_BEFORE,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 449,
        children: [
          staticLabel(
            450,
            "Implement the school's COVID-19 protocols",
            null,
            'grid-cell-wrap column-width-shorter '
          ),
          valueRadio(
            451,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_BEFORE,
            149,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            452,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_BEFORE,
            149,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            453,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_BEFORE,
            149,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            454,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_BEFORE_TEXT,
            149,
            4,
            null,
            null,
            writeInDisable(
              FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_BEFORE,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      }
    ]
  },
  {
    id: 500,
    description: '3. Before the assessment, did the AC:',
    caption: '3. Before the assessment, did the AC:',
    type: QuestionType.GRID,
    columns: ['row-caption', 'yes', 'no', 'na-dno', 'reason'],
    class: 'text-h6',
    children: [
      {
        id: 501,
        children: [
          staticLabel(502, '', null, 'grid-cell-wrap column-width-shorter'),
          staticLabel(503, 'Yes', null, 'grid-cell-wrap'),
          staticLabel(504, 'No', null, 'grid-cell-wrap'),
          staticLabel(
            505,
            'Not Applicable/ Did not Observe',
            null,
            'grid-cell-wrap'
          ),
          staticLabel(
            506,
            'If No or Not Applicable, please explain',
            null,
            'grid-cell-wrap'
          )
        ]
      },
      {
        id: 507,
        children: [
          staticLabel(
            508,
            'Meet with SC to inquire about parent/student refusals and other changes',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            509,
            FIELD_MEET_WITH_SC_ABOUT_REFUSALS,
            155,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            510,
            FIELD_MEET_WITH_SC_ABOUT_REFUSALS,
            155,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            511,
            FIELD_MEET_WITH_SC_ABOUT_REFUSALS,
            155,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            512,
            FIELD_MEET_WITH_SC_ABOUT_REFUSALS_TEXT,
            155,
            4,
            null,
            null,
            writeInDisable(
              FIELD_MEET_WITH_SC_ABOUT_REFUSALS,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },
      {
        id: 513,
        children: [
          staticLabel(
            514,
            'Record any changes in SD/ELL status or accommodations and  make needed updates',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            515,
            FIELD_RECORD_SDELL_CHANGES,
            160,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            516,
            FIELD_RECORD_SDELL_CHANGES,
            160,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            517,
            FIELD_RECORD_SDELL_CHANGES,
            160,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            518,
            FIELD_RECORD_SDELL_CHANGES_TEXT,
            160,
            4,
            null,
            null,
            writeInDisable(FIELD_RECORD_SDELL_CHANGES, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },
      {
        id: 519,
        children: [
          staticLabel(
            520,
            'Review accommodation information with team and school staff assisting',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            521,
            FIELD_REVIEW_ACCOMM_INFO,
            165,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            522,
            FIELD_REVIEW_ACCOMM_INFO,
            165,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            523,
            FIELD_REVIEW_ACCOMM_INFO,
            165,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            524,
            FIELD_REVIEW_ACCOMM_INFO_TEXT,
            165,
            4,
            null,
            null,
            writeInDisable(FIELD_REVIEW_ACCOMM_INFO, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },
      {
        id: 525,
        children: [
          staticLabel(
            526,
            'Complete NDAs with observers, as needed',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            527,
            FIELD_COMPLETE_NDAS,
            170,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            528,
            FIELD_COMPLETE_NDAS,
            170,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            529,
            FIELD_COMPLETE_NDAS,
            170,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            530,
            FIELD_COMPLETE_NDAS_TEXT,
            170,
            4,
            null,
            null,
            writeInDisable(FIELD_COMPLETE_NDAS, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      }
    ]
  },
  staticLabel(
    600,
    'NAEP Team Performance during the assessment',
    'section header',
    'text-h6'
  ),
  {
    id: 700,
    description: '4. During the assessment, did the NAEP team:',
    caption: '4. During the assessment, did the NAEP team:',
    type: QuestionType.GRID,
    columns: ['row-caption', 'yes', 'no', 'na-dno', 'reason'],
    class: 'text-h6',
    children: [
      {
        id: 701,
        children: [
          staticLabel(702, '', null, 'grid-cell-wrap column-width-shorter'),
          staticLabel(703, 'Yes', null, 'grid-cell-wrap'),
          staticLabel(704, 'No', null, 'grid-cell-wrap'),
          staticLabel(
            705,
            'Not Applicable/ Did not Observe',
            null,
            'grid-cell-wrap'
          ),
          staticLabel(
            706,
            'If No or Not Applicable, please explain',
            null,
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 707,
        children: [
          staticLabel(
            708,
            'Start all group(s) on time',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            709,
            FIELD_START_ON_TIME,
            177,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            710,
            FIELD_START_ON_TIME,
            177,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            711,
            FIELD_START_ON_TIME,
            177,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            712,
            FIELD_START_ON_TIME_TEXT,
            177,
            4,
            null,
            null,
            writeInDisable(FIELD_START_ON_TIME, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 713,
        children: [
          staticLabel(
            714,
            'Read script verbatim',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            715,
            FIELD_READ_SCRIPT_VERBATIM,
            182,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            716,
            FIELD_READ_SCRIPT_VERBATIM,
            182,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            717,
            FIELD_READ_SCRIPT_VERBATIM,
            182,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            718,
            FIELD_READ_SCRIPT_VERBATIM_TEXT,
            182,
            4,
            null,
            null,
            writeInDisable(FIELD_READ_SCRIPT_VERBATIM, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 719,
        children: [
          staticLabel(
            720,
            'Provide student accommodations as planned',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            721,
            FIELD_PROVIDE_PLANNED_ACCOMM,
            187,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            722,
            FIELD_PROVIDE_PLANNED_ACCOMM,
            187,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            723,
            FIELD_PROVIDE_PLANNED_ACCOMM,
            187,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            724,
            FIELD_PROVIDE_PLANNED_ACCOMM_TEXT,
            187,
            4,
            null,
            null,
            writeInDisable(
              FIELD_PROVIDE_PLANNED_ACCOMM,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 725,
        children: [
          staticLabel(
            726,
            'Attend to student questions following protocol',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            727,
            FIELD_FOLLOWED_PROTOCOL,
            192,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            728,
            FIELD_FOLLOWED_PROTOCOL,
            192,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            729,
            FIELD_FOLLOWED_PROTOCOL,
            192,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            730,
            FIELD_FOLLOWED_PROTOCOL_TEXT,
            192,
            4,
            null,
            null,
            writeInDisable(FIELD_FOLLOWED_PROTOCOL, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 731,
        children: [
          staticLabel(
            732,
            'Handle unexpected situations calmly and professionally',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            733,
            FIELD_CALM_AND_PROFESSIONAL,
            197,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            734,
            FIELD_CALM_AND_PROFESSIONAL,
            197,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            735,
            FIELD_CALM_AND_PROFESSIONAL,
            197,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            736,
            FIELD_CALM_AND_PROFESSIONAL_TEXT,
            197,
            4,
            null,
            null,
            writeInDisable(
              FIELD_CALM_AND_PROFESSIONAL,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 737,
        children: [
          staticLabel(
            738,
            'Implement NAEP COVID-19 protocols',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            739,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_DURING,
            202,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            740,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_DURING,
            202,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            741,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_DURING,
            202,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            742,
            FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_DURING_TEXT,
            202,
            4,
            null,
            null,
            writeInDisable(
              FIELD_IMPLEMENT_NAEP_COVID_PROTOCOLS_DURING,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 731,
        children: [
          staticLabel(
            732,
            "Implement the school's COVID-19 protocols",
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            733,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_DURING,
            207,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            734,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_DURING,
            207,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            735,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_DURING,
            207,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            736,
            FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_DURING_TEXT,
            207,
            4,
            null,
            null,
            writeInDisable(
              FIELD_IMPLEMENT_SCHOOL_COVID_PROTOCOLS_DURING,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },
      {
        id: 743,
        children: [
          staticLabel(
            744,
            'Dismiss students according to plans',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            745,
            FIELD_DISMISS_ACCORDING_TO_PLAN,
            212,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            746,
            FIELD_DISMISS_ACCORDING_TO_PLAN,
            212,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            747,
            FIELD_DISMISS_ACCORDING_TO_PLAN,
            212,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            748,
            FIELD_DISMISS_ACCORDING_TO_PLAN_TEXT,
            212,
            4,
            null,
            null,
            writeInDisable(
              FIELD_DISMISS_ACCORDING_TO_PLAN,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      }
    ]
  },
  staticLabel(
    800,
    'NAEP Team Performance after the assessment',
    'section header',
    'text-h6'
  ),
  {
    id: 900,
    description: '5. After the assessment, did the NAEP team:',
    caption: '5. After the assessment, did the NAEP team:',
    type: QuestionType.GRID,
    columns: ['row-caption', 'yes', 'no', 'na-dno', 'reason'],
    class: 'text-h6',
    children: [
      {
        id: 901,
        children: [
          staticLabel(902, '', null, 'grid-cell-wrap column-width-shorter'),
          staticLabel(903, 'Yes', null, 'grid-cell-wrap'),
          staticLabel(904, 'No', null, 'grid-cell-wrap'),
          staticLabel(
            905,
            'Not Applicable/ Did not Observe',
            null,
            'grid-cell-wrap'
          ),
          staticLabel(
            906,
            'If No or Not Applicable, please explain',
            null,
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 907,
        children: [
          staticLabel(
            908,
            'Finish all administrative tasks according to protocol',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            909,
            FIELD_ADMIN_TASKS_TO_PROTOCOL,
            219,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            910,
            FIELD_ADMIN_TASKS_TO_PROTOCOL,
            219,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            911,
            FIELD_ADMIN_TASKS_TO_PROTOCOL,
            219,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            912,
            FIELD_ADMIN_TASKS_TO_PROTOCOL_TEXT,
            219,
            4,
            null,
            null,
            writeInDisable(
              FIELD_ADMIN_TASKS_TO_PROTOCOL,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 913,
        children: [
          staticLabel(
            914,
            'Account for all NAEP equipment and materials',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            915,
            FIELD_ACCOUNT_FOR_MATERIALS,
            224,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            916,
            FIELD_ACCOUNT_FOR_MATERIALS,
            224,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            917,
            FIELD_ACCOUNT_FOR_MATERIALS,
            224,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            918,
            FIELD_ACCOUNT_FOR_MATERIALS_TEXT,
            224,
            4,
            null,
            null,
            writeInDisable(
              FIELD_ACCOUNT_FOR_MATERIALS,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 919,
        children: [
          staticLabel(
            920,
            'Clean up materials following NAEP COVID-19 protocols',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            921,
            FIELD_CLEAN_FOLLOWING_NAEP_COVID_PROTOCOLS,
            229,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            922,
            FIELD_CLEAN_FOLLOWING_NAEP_COVID_PROTOCOLS,
            229,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            923,
            FIELD_CLEAN_FOLLOWING_NAEP_COVID_PROTOCOLS,
            229,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            924,
            FIELD_CLEAN_FOLLOWING_NAEP_COVID_PROTOCOLS_TEXT,
            229,
            4,
            null,
            null,
            writeInDisable(
              FIELD_CLEAN_FOLLOWING_NAEP_COVID_PROTOCOLS,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 919,
        children: [
          staticLabel(
            920,
            "Clean up materials following the school' COVID-19 protocols",
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            921,
            FIELD_CLEAN_FOLLOWING_SCHOOL_COVID_PROTOCOLS,
            234,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            922,
            FIELD_CLEAN_FOLLOWING_SCHOOL_COVID_PROTOCOLS,
            234,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            923,
            FIELD_CLEAN_FOLLOWING_SCHOOL_COVID_PROTOCOLS,
            234,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            924,
            FIELD_CLEAN_FOLLOWING_SCHOOL_COVID_PROTOCOLS_TEXT,
            234,
            4,
            null,
            null,
            writeInDisable(
              FIELD_CLEAN_FOLLOWING_SCHOOL_COVID_PROTOCOLS,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      }
    ]
  },

  {
    id: 1000,
    description: '6. After the assessment, did the AC:',
    caption: '6. After the assessment, did the NAEP AC:',
    type: QuestionType.GRID,
    columns: ['row-caption', 'yes', 'no', 'na-dno', 'reason'],
    class: 'text-h6',
    children: [
      {
        id: 1001,
        children: [
          staticLabel(1002, '', null, 'grid-cell-wrap column-width-shorter'),
          staticLabel(1003, 'Yes', null, 'grid-cell-wrap'),
          staticLabel(1004, 'No', null, 'grid-cell-wrap'),
          staticLabel(
            1005,
            'Not Applicable/ Did not Observe',
            null,
            'grid-cell-wrap'
          ),
          staticLabel(
            1006,
            'If No or Not Applicable, please explain',
            null,
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 1007,
        children: [
          staticLabel(
            1008,
            'Complete session debriefing form',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            1009,
            FIELD_COMPLETE_SESSION_DEBRIEFING_FORM,
            240,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            1010,
            FIELD_COMPLETE_SESSION_DEBRIEFING_FORM,
            240,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            1011,
            FIELD_COMPLETE_SESSION_DEBRIEFING_FORM,
            240,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            1012,
            FIELD_COMPLETE_SESSION_DEBRIEFING_FORM_TEXT,
            240,
            4,
            null,
            null,
            writeInDisable(
              FIELD_COMPLETE_SESSION_DEBRIEFING_FORM,
              yesNoNAReasonEnableOnNo
            ),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 1013,
        children: [
          staticLabel(
            1014,
            'Meet with the SC',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            1015,
            FIELD_MEET_WITH_THE_SC,
            245,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            1016,
            FIELD_MEET_WITH_THE_SC,
            245,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            1017,
            FIELD_MEET_WITH_THE_SC,
            245,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            1018,
            FIELD_MEET_WITH_THE_SC_TEXT,
            245,
            4,
            null,
            null,
            writeInDisable(FIELD_MEET_WITH_THE_SC, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      },

      {
        id: 1019,
        children: [
          staticLabel(
            1020,
            'Schedule make-up date, if needed',
            null,
            'grid-cell-wrap column-width-shorter'
          ),
          valueRadio(
            1021,
            FIELD_SCHEDULE_MAKEUP,
            250,
            1,
            YesNoNA.YES,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            1022,
            FIELD_SCHEDULE_MAKEUP,
            250,
            2,
            YesNoNA.NO,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          valueRadio(
            1023,
            FIELD_SCHEDULE_MAKEUP,
            250,
            3,
            YesNoNA.NOT_APPLICABLE,
            null,
            'grid-cell-wrap',
            enableOnNoOrNA
          ),
          reasonWriteIn(
            1024,
            FIELD_SCHEDULE_MAKEUP_TEXT,
            250,
            4,
            null,
            null,
            writeInDisable(FIELD_SCHEDULE_MAKEUP, yesNoNAReasonEnableOnNo),
            'grid-cell-wrap'
          )
        ]
      }
    ]
  },

  {
    id: 1100,
    description:
      '7.	Did anything happen on assessment day that required your intervention or needs follow-up from you or your field manager?',
    type: QuestionType.GROUP,
    caption:
      '7.	Did anything happen on assessment day that required your intervention or needs follow-up from you or your field manager?',
    class: 'text-h6',
    children: [
      valueRadio(
        1101,
        FIELD_ATTENTION_FROM_FM,
        255,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        1102,
        FIELD_ATTENTION_FROM_FM,
        255,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        1103,
        FIELD_ATTENTION_FROM_FM_TEXT,
        255,
        3,
        null,
        'Please explain the situation here...',
        writeInDisable(FIELD_ATTENTION_FROM_FM, yesNoNAReasonEnable),
        'write-in-64-rem'
      )
    ]
  },

  {
    id: 1200,
    description: '8.	Are you planning another observation of this team?',
    type: QuestionType.GROUP,
    caption: '8.	Are you planning another observation of this team?',
    class: 'text-h6',
    children: [
      valueRadio(
        1201,
        FIELD_PLANNING_ANOTHER_OBSERVATION,
        259,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        1202,
        FIELD_PLANNING_ANOTHER_OBSERVATION,
        259,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      )
    ]
  },

  {
    id: 1300,
    description:
      '9.	Do you have any additonal information to report about this observation that you have not already recorded in the questions above?',
    type: QuestionType.GROUP,
    caption:
      '9.	Do you have any additonal information to report about this observation that you have not already recorded in the questions above?',
    class: 'text-h6',
    children: [
      valueRadio(
        1301,
        FIELD_ADDITIONAL_INFO,
        262,
        1,
        YesNo.YES,
        YesNoDisplayName[YesNo.YES]
      ),
      valueRadio(
        1302,
        FIELD_ADDITIONAL_INFO,
        262,
        2,
        YesNo.NO,
        YesNoDisplayName[YesNo.NO]
      ),
      reasonWriteIn(
        1303,
        FIELD_ADDITIONAL_INFO_TEXT,
        262,
        3,
        null,
        'Record any additional information here...',
        writeInDisable(FIELD_ADDITIONAL_INFO, yesNoNAReasonEnable),
        'write-in-64-rem'
      )
    ]
  }
]
