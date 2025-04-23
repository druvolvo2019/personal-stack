import gql from 'graphql-tag'

export const GetExtSurveyHistory = gql`
  query GetExtSurveyHistory($input: QaReadInput!) {
    getExtSurveyHistory(input: $input) {
      body
      operation
      status
      success
    }
  }
`

export const GetQuexAnswers = /* GraphQL */ gql`
  query GetQuexAnswers($visitId: ID!) {
    GetQuexAnswers: getQuexAnswers(visitId: $visitId) {
      status
      success
      errorMessage
      data {
        quexid
        trackingdt
        updateduid
        quexdata {
          quexId
          visitId
          responses {
            tag
            choiceId
            questionId
            reasontext
            value
          }
        }
        firstname
        lastname
        userRole
      }
    }
  }
`

export const GetTeachers = /* GraphQL */ gql`
  query GetTeachers($gradeId: ID!) {
    GetTeachers: getTeachers(gradeId: $gradeId) {
      status
      success
      body {
        personId
        lineNumber
        lastName
        firstName
        gradeLevel
        isComplete
        barcode
      }
    }
  }
`

export const GetAvailableBarcodes = /* GraphQL */ gql`
  query GetAvailableBarcodes($gradeId: ID!) {
    GetAvailableBarcodes: getAvailableBarcodes(gradeId: $gradeId) {
      status
      success
      body {
        principalQuestionnaire
        teacherQuestionnaire
      }
    }
  }
`

export const GetNDA = /* GraphQL */ gql`
  query GetNDA($visitId: ID!) {
    GetNDA: getNDA(visitId: $visitId) {
      success
      status
      body {
        ndaId
        email
        name
      }
    }
  }
`

export const GetValidTRAList = /* GraphQL */ gql`
  query GetValidTRAList {
    GetValidTRAList: getValidTRAList {
      success
      status
      body {
        superTerritoryCode
        stateCode
        territoryCode
        regionCode
        areaCode
      }
    }
  }
`
export const SignIn = /* GraphQL */ gql`
  query SignIn($username: ID!, $password: ID!) {
    SignIn: signIn(username: $username, password: $password) {
      success
      message
      token
      issueTime
      expiredTime
      expiredIn
      refreshToken
      user {
        firstname
        lastname
        uid
        userRole
        tra {
          staffID
          roleTypeCode
          superTerritoryCode
          territoryCode
          stateCode
          regionCode
          areaCode
        }
      }
    }
  }
`

export const GetSampledGrades = /* GraphQL */ gql`
  query GetSampledGrades($filter: SchoolsFilterInput!) {
    GetSampledGrades: getSampledGradeCard(input: $filter) {
      success
      status
      body {
        visitId
        gradeId
        gradeLevel
        schoolName
        principalName
        principalTelephoneNumber
        principalEmail
        coordinatorName
        coordinatorTelephoneNumber
        coordinatorEmail
        scheduledAssessmentDate
        assignedFieldArea
        assignedAssessmentCoordinator
        isLive
        isMakeup
        assessmentVisitDate
        assessmentComplete
        offlineMeta
        school {
          sessionType
          gradeLevel
          schoolId
          ncesAssignedSchoolId
          leaAssignedSchoolId
          schoolName
          schoolAddress
          schoolAddressCity
          schoolAddressState
          schoolAddressZip
          schoolTelephoneNumber
          ncesAssignedLeaId
          schoolSessionBeginDate
          schoolCounty
          districtName
          districtState
          flgTUDA
          isPublic
          schoolDistrictType
        }
        multipleTeamsACs {
          gradeId
          responsibility
          firstName
          lastName
          userName
          uid
        }
      }
    }
  }
`
export const GetSampledGrade = /* GraphQL */ gql`
  query GetSampledGrade($visitId: ID!) {
    GetSampledGrade: getSampledGrade(visitId: $visitId) {
      success
      status
      body {
        visitId
        gradeId
        gradeLevel
        schoolName
        principalName
        principalTelephoneNumber
        principalEmail
        coordinatorName
        coordinatorTelephoneNumber
        coordinatorEmail
        scheduledAssessmentDate
        scheduledArrivalDate
        assignedFieldArea
        assignedAssessmentCoordinator
        assignedACPhone
        eNAEPUsername
        isLive
        assessmentComplete
        originalComplete
        makeupComplete
        schoolQuestionnaireType
        teacherQuestionnaireType
        schoolStartTime
        schoolEndTime
        isMakeup
        assessmentNotes
        assessmentVisitDate
        numRegularAssessmentVisitDate
        agd_HITS
        prepTime
        schoolLunchStartTime1
        schoolLunchStartTime2
        schoolLunchStartTime3
        schoolLunchStartTime4
        schoolLunchStartTime5
        schoolLunchEndTime1
        schoolLunchEndTime2
        schoolLunchEndTime3
        schoolLunchEndTime4
        schoolLunchEndTime5
        assessmentArrivalDtVisible
        multipleTeamsACs {
          gradeId
          responsibility
          firstName
          lastName
          userName
          uid
        }
        students {
          studentId
          lineNumber
          session
          lastName
          firstName
          studentName
          room
          subject
          ancillary
          group
          loginId
          monthOfBirth
          yearOfBirth
          gender
          raceEthnicity
          schoolLunchStatus
          adminStatus
          sdStatus
          ellStatus
          assignedSessId
          studentQuestionnaireFlags
          accommodations
          missingDemographics
          studentQuestionnaireRefusal
        }
        teachers {
          personId
          lineNumber
          lastName
          firstName
          subjects
          isComplete
          barcode
        }
        logistics {
          whereToMeetTeam
          schoolDirection
          checkinProtocols
          firstFloorOrElevator
          placeToUnloadEquipment
          whereToMeet
          announcedMethod
          traumaticEvent
          enpDailyAnnounce
          cellPhonePolicy
          howContactSchool
          scheduleEvents
          emergencyProtocolsProc
          restroomBreak
          teacherInRoom
          tabletDismissPolicy
          dismissStuPolicy
          dismissExtended
          meetAfter
          sdcfFieldGlobalValue
          enpCommunityService
          covidSchoolProtocols
          covidHowToHandleSickStudents
          covidAnswerQuestionProtocols
          covidStaffWearMasks
          covidStudentWearMasks
          covidSocialDistancing
          covidSanitizing
          covidNeedVaccinated
          covidRequiredTestNegative
        }
        school {
          sessionType
          gradeLevel
          schoolId
          ncesAssignedSchoolId
          leaAssignedSchoolId
          schoolName
          schoolAddress
          schoolAddressCity
          schoolAddressState
          schoolAddressZip
          schoolTelephoneNumber
          ncesAssignedLeaId
          schoolSessionBeginDate
          schoolCounty
          districtName
          districtState
          flgTUDA
          isPublic
          schoolDistrictType
        }
        principal {
          personId
          firstName
          lastName
          isComplete
          barcode
        }
        sessions {
          groupId
          label
          sessId
          type
          time
          location
          studentCount
          assignedAdministrators
          schoolStaffName
          accommodations {
            code
            count
          }
        }
        makeupSessions {
          sessType
          makeupDate
          makeupTime
          makeupDateTime
          makeupLocation
          groupsAssessed
          studentsInSample
          studentsWithdrawn
          studentsExcluded
          studentsToBeAssessed
          studentsAbsent
          studentsRefused
          studentsAssessed
          attendancePercentage
          sessId
          studentsFTVirtualLearner
          studentsNoEquipment
          studentsPTVirtualLearner
        }
        availableSubjects {
          label
          value
        }
        extSurveys {
          extSurveyId
          extSurveyToken
          extSurveyCompleteDT
          quexId
        }
      }
    }
  }
`
