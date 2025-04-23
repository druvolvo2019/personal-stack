import TemplateFn from './baseTemplate'
import MakeupWorksheetCard from '../components/MakeupWorksheetCard.vue'

const baseLine = {
  sessId: 13,
  groupsAssessed: false,
  studentsWithdrawn: 0,
  studentsExcluded: 0,
  studentsAbsent: 0,
  studentsRefused: 0,
  studentsNoEquipment: 0,
  studentsFTVirtualLearner: 0,
  studentsPTVirtualLearner: 0,
  attendancePercentage: 100,
  studentsInSample: 100,
  studentsToBeAssessed: 100,
  studentsAssessed: 0,
  makeupDate: null,
  makeupTime: null,
  makeupLocation: null,
  makeupDateTime: null,
}

const noAssessedStudents = [baseLine]

const AssessedStudents = [
  {
    ...baseLine,
    groupsAssessed: true
  }
]

const hasMakeupAssigned = [
  {
    ...baseLine,
    makeupDate: '01/01/2021',
    makeupTime: '10:00 AM',
    makeupLocation: 'Cafeteria',
  },
]

const showsOnlyTheLocationWithoutDateTime = [
  {
    ...baseLine,
    studentsAbsent: 33,
    makeupLocation: 'nowhere',
  },
]

const makeupDateWithoutLocation = [
  {
    ...baseLine,
    studentsAbsent: 33,
    makeupDate: '01/01/2021',
    makeupTime: '10:00 AM',
  },
]

const doesNotRequireMakeup = [
  {
    ...baseLine,
    studentsAbsent: 3,
  },
]

const triggersRequiredMakeup = [
  {
    ...baseLine,
    studentsAbsent: 33,
  },
]

export default {
  title: 'Application/MakeupWorksheetCard',
  component: MakeupWorksheetCard,
}

const Template = TemplateFn({
  components: { MakeupWorksheetCard },
  template: `
   <makeup-worksheet-card 
     :sessions="sessions"
   /> 
 `
})

export const NoGroupsAssessedCanOfferMakeup = Template({
  sessions: noAssessedStudents
})

export const GroupsAssessed = Template({
  sessions: AssessedStudents
})

export const HaveOnlyLocation = Template({
  sessions: showsOnlyTheLocationWithoutDateTime,
})

export const HaveOnlyDateTime = Template({
  sessions: makeupDateWithoutLocation,
})

export const AttendanceAbove90NoMakeup = Template({
  sessions: doesNotRequireMakeup,
})

export const AttendanceBelow90ShouldOfferMakeup = Template({
  sessions: triggersRequiredMakeup,
})

export const MakeupHasBeenCreated = Template({
  sessions: hasMakeupAssigned,
})
