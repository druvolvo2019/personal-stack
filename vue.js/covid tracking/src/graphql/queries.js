import gql from 'graphql-tag'

export const getCIMSUsers = /* GraphQL */ gql`
  query GetCIMSUsers($input: CIMSUserFilterInput!) {
    GetCIMSUsers: getCIMSUsers(input: $input) {
      status
      success
      errorMessage
      data {
        userid
        userfirstname
        userlastname
        useremail
        flgsysactive
        flglocked
        flgdisabled
        password
        fldrole
      }
    }
  }
`

export const getCIMSUser = /* GraphQL */ gql`
  query GetCIMSUser($userid: ID!) {
    GetCIMSUser: getCIMSUser(userid: $userid) {
      status
      success
      errorMessage
      data {
        userid
        userfirstname
        userlastname
        useremail
        flgsysactive
        flglocked
        flgdisabled
        password
        fldrole
      }
    }
  }
`

export const getCIMSSchool = /* GraphQL */ gql`
  query GetCIMSSchool($frame_n_: ID!) {
    GetCIMSSchool: getCIMSSchool(frame_n_: $frame_n_) {
      status
      success
      errorMessage
      data {
        frame_n_
        school_name
        leaid
      }
    }
  }
`
export const getCIMSSchools = /* GraphQL */ gql`
  query GetCIMSSchools($input: SchoolFilterInput!) {
    GetCIMSSchools: getCIMSSchools(input: $input) {
      status
      success
      errorMessage
      data {
        frame_n_
        school_name
        leaid
      }
    }
  }
`

export const getCIMSDistrict = /* GraphQL */ gql`
  query GetCIMSDistrict($leaid: ID!) {
    GetCIMSDistrict: getCIMSDistrict(leaid: $leaid) {
      status
      success
      errorMessage
      data {
        leaid
        district_name
        flgtuda
        state
      }
    }
  }
`
export const getCIMSDistricts = /* GraphQL */ gql`
  query GetCIMSDistricts($input: DistrictFilterInput!) {
    GetCIMSDistricts: getCIMSDistricts(input: $input) {
      status
      success
      errorMessage
      data {
        leaid
        district_name
        flgtuda
        state
      }
    }
  }
`

export const getContactLog = /* GraphQL */ gql`
  query GetContactLog($locationKind: CallHandledLocationKind!, $id: String!) {
    GetContactLog: getContactLog(locationKind: $locationKind, id: $id) {
      status
      success
      errorMessage
      data {
        cifreferenceid
        contactlogtypedesc
        createdDate
        createdTime
        createddt
        fldcontactcodedesc
        fldcontactid
        fldcontactlogid
        fldincidentid
        updateduesrname
      }
    }
  }
`


export const getNCESDetails = /* GraphQL */ gql`
  query GetNCESDetails($incidentId: ID!, $kind: NCESContactKind) {
    GetNCESDetails: getNCESDetails(incidentId: $incidentId, kind: $kind) {
      finalContact
      initialContact
      states {
        contactStatus
        fips
        hasBeenNotified
        id
        incidentCount
        isContactRequired
        name
        schoolCount
        contacts {
          emailScript
          emaileddt
          fldcontactcode
          fldcontactdesc
          fldemail
          fldincidentid
          fldname
          fldphone
          flgemailed
          flgphoned
          flgstatus
          flgvoicemailed
          noCallsCompletedScript
          phoneScript
          phoneddt
          phoneext
          updatedbyuserid
          updateddt
          voicemailScript
          voicemaileddt
        }
      }
  }
}

`





export const getIncident = /* GraphQL */ gql`
  query GetIncident($fldstaffid: ID!) {
    GetIncident: getIncident(fldstaffid: $fldstaffid) {
      status
      success
      errorMessage
      data {
        fldincidentid
        fldstaffid
        first_and_last_name
        fldwinsid
        fldcreateddt
        choice_received_covid19_vaccine
        date_received_covid19_vaccine
        choice_work_outside_home
        choice_exposure_or_positive
        date_last_exposed
        choice_begun_quarantine
        date_begun_quarantine
        choice_taken_test
        date_test_taken
        choice_positive_test
        date_positive_test
        choice_have_recovered
        choice_experiencing_symptoms
        date_when_tested
        date_positive_result
        choice_started_isolation
        date_started_isolation
        choice_experienced_symptoms
        date_symptoms_started
        flgstatus
        flgdisable
      }
    }
  }
`

export const getIncidents = /* GraphQL */ gql`
  query GetIncidents($input: IncidentFilterInput!) {
    GetIncidents: getIncidents(input: $input) {
      status
      success
      errorMessage
      data {
        fldincidentid
        fldstaffid: ID
        first_and_last_name
        fldwinsid
        fldcreateddt
        choice_received_covid19_vaccine
        date_received_covid19_vaccine
        choice_work_outside_home
        choice_exposure_or_positive
        date_last_exposed
        choice_begun_quarantine
        date_begun_quarantine
        choice_taken_test
        date_test_taken
        choice_positive_test_positive
        date_positive_test_positive
        choice_positive_test_exposure
        date_positive_test_exposure
        choice_have_recovered_positive
        choice_have_recovered_exposure
        choice_experiencing_symptoms
        date_when_tested
        date_positive_result
        choice_started_isolation
        date_started_isolation
        choice_experienced_symptoms
        date_symptoms_started
        flgstatus
        flgdisable
        cifreferenceid
        fldcifsubmissiontype
        tra
        schoolcontactagent
        districtcontactagent
        fldnotes
      }
    }
  }
`

export const getIncidentCards = /* GraphQL */ gql`
  query GetIncidentCards($input: IncidentCardsFilterInput!) {
    GetIncidentCards: getIncidentCards(input: $input) {
      errorMessage
      status
      success
      data {
        fldincidentid
        fldstaffid
        first_and_last_name
        fldwinsid
        fldcreateddt
        flgdisable
        flgstatus
        incidentstatus
        cifreferenceid
        fldcifsubmissiontype
        fldcifsubmissiontypetext
        fldcifsubmissiontypecolor
        tra
        schoolcontactcount
        schoolcontactstatus
        schoolcontactuser
        schoolcontactdt
        districtcontactcount
        districtcontactstatus
        districtcontactuser
        districtcontactdt
        statecontactcount
        statecontactstatus
        statecontactuser
        statecontactdt
        ncesinitcontactstatus
        ncesinitcontactdt
        ncesinitcontactuser
        ncesfinalcontactstatus
        ncesfinalcontactdt
        ncesfinalcontactuser
        incidentstates
        incidentSchools {
          districtName
          jurisdiction
          naepid
          schoolName
        }
      }
    }
  }
`

export const getIncidentDetails = /* GraphQL */ gql`
  query GetIncidentDetails($input: IncidentDetailsFilterInput!) {
    GetIncidentDetails: getIncidentDetails(input: $input) {
      success
      status
      errorMessage
      data {
        fldincidentid
        schools {
          id
          name
          districtName
          jurisdiction
          grade
          hasBeenNotified
          assessmentDates
          makeupDates
          contacts {
            fldcontactid
            fldincidentid
            fldcontactcode
            fldcontactdesc
            fldname
            fldphone
            fldemail
            updatedbyuserid
            updateddt
            flgemailed
            emaileddt
            flgphoned
            phoneddt
            flgvoicemailed
            voicemaileddt
            flgstatus
            phoneScript
            voicemailScript
            emailScript
            noCallsCompletedScript
          }
        }
        districts {
          id
	        name
	        tudaDistrictFlag
	        jurisdiction
	        schoolcount
	        incidentcount
	        hasBeenNotified
          contacts {
            fldcontactid
            fldincidentid
            fldcontactcode
            fldcontactdesc
            fldname
            fldphone
            fldemail
            updatedbyuserid
            updateddt
            flgemailed
            emaileddt
            flgphoned
            phoneddt
            flgvoicemailed
            voicemaileddt
            flgstatus
            phoneScript
            voicemailScript
            emailScript
            noCallsCompletedScript
          }
        }
        states {
          fips
          hasBeenNotified
          id
          incidentCount
          isContactRequired
          name
          schoolCount
          contacts {
            fldcontactid
            fldincidentid
            fldcontactcode
            fldcontactdesc
            fldname
            fldphone
            fldemail
            updatedbyuserid
            updateddt
            flgemailed
            emaileddt
            flgphoned
            phoneddt
            flgvoicemailed
            voicemaileddt
            flgstatus
            phoneScript
            voicemailScript
            emailScript
            noCallsCompletedScript
          }
        }
        nces {
          id
          name
          contacts {
            fldcontactid
            fldincidentid
            fldcontactcode
            fldcontactdesc
            fldname
            fldphone
            fldemail
            updatedbyuserid
            updateddt
            flgemailed
            emaileddt
            flgphoned
            phoneddt
            flgvoicemailed
            voicemaileddt
            flgstatus
            phoneScript
            voicemailScript
            emailScript
            noCallsCompletedScript
          }
        }
      }
    }
  }
`

export const getIncidentSummary = /* GraphQL */ gql`
  query GetIncidentSummary($input: IncidentSummaryFilterInput!) {
    GetIncidentSummary: getIncidentSummary(input: $input) {
      success
      status
      errorMessage
      data {
        fldincidentid
        incidentform {
          fldincidentid
          fldstaffid
          first_and_last_name
          fldwinsid
          fldcreateddt
          choice_received_covid19_vaccine
          date_received_covid19_vaccine
          choice_work_outside_home
          choice_exposure_or_positive
          date_last_exposed
          choice_begun_quarantine
          date_begun_quarantine
          choice_taken_test
          date_test_taken
          choice_positive_test_positive
          date_positive_test_positive
          choice_positive_test_exposure
          date_positive_test_exposure
          choice_have_recovered_positive
          choice_have_recovered_exposure
          choice_experiencing_symptoms
          date_when_tested
          date_positive_result
          choice_started_isolation
          date_started_isolation
          choice_experienced_symptoms
          date_symptoms_started
          flgstatus
          incidentstatus
          flgdisable
          cifreferenceid
          fldcifsubmissiontype
          fldcifsubmissiontypetext
          fldcifsubmissiontypecolor
          tra
          schoolcontactcount
          schoolcountopen
          schoolcontactstatus
          districtcontactcount
          districtcountopen
          districtcontactstatus
          statecontactcount
          statecountopen
          statecontactstatus
          ncesinitcontactstatus
          ncesfinalcontactstatus
          incidentstates
          incidentleaids
          incidentschools
          incidentgrades
          schoolcontactagent
          districtcontactagent
          fldnotes
        }
      }
    }
  }
`
