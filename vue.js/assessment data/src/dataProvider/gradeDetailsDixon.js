import teachers from 'TeacherList.json'
import students from 'StudentList.json'
import sessions from 'SessionList.json'

const school = {
  sessionType: 'DS',
  gradeLevel: '8',
  schoolId: '020307',
  ncesAssignedSchoolId: '120039000560',
  leaAssignedSchoolId: 'FL-13-6351',
  schoolName: 'Dixon Middle School',
  schoolAddress: '21300 Eastern Ave',
  schoolAddressCity: 'Tampa',
  schoolAddressState: 'FL',
  schoolAddressZip: '33601-2950',
  schoolTelephoneNumber: '(337) 850-2699',
  ncesAssignedLeaId: '1200390',
  schoolSessionBeginDate: 'January 7'
}

// scheduledAssessmentDate: 'Mon, Feb 5, 6:45 AM',
// scheduledAssessmentDate: 'February 5',

const grade = {
  gradeId: '1220501',
  gradeLevel: '8',
  get schoolName() {
    return this.school.schoolName
  },
  principalName: 'Sarah Jones',
  principal: {
    firstName: 'Sarah',
    lastName: 'Bernard',
    personId: '1014438',
    isComplete: false,
    barcode: undefined
  },
  principalTelephoneNumber: '(337) 850-2699',
  principalEmail: 'jbulnes1@dadeschools.net',
  coordinatorName: 'Tom Hitchens',
  coordinatorTelephoneNumber: '(337) 850-2699',
  coordinatorEmail: 'vezewike@dadeschools.net',
  scheduledAssessmentDate: 'Mon, Feb 5, 6:45 AM',
  assignedFieldArea: 'T11:FL-1/6',
  assignedAssessmentCoordinator: 'Sally Richardson',
  isLive: true,
  assessmentComplete: false,
  originalComplete: false,
  makeupComplete: false,
  schoolQuestionnaireType: '964',
  teacherQuestionnaireType: '980',
  school,
  teachers,
  students,
  sessions
}

Object.defineProperty(grade, 'schoolName', {
  get: function() {
    return this.school.schoolName
  }
})

Object.defineProperty(grade, 'principalName', {
  get: function() {
    return this.principal.fullName
  }
})

export default grade
