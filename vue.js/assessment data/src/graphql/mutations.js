import gql from 'graphql-tag'

export const UpdateMakeupSession = /* GraphQL */ gql`
  mutation UpdateMakeupSession(
    $visitId: ID!
    $input: updateMakeupSessionInput!
  ) {
    UpdateMakeupSession: updateMakeupSession(visitId: $visitId, input: $input) {
      success
      status
      errorMessage
      visitId
    }
  }
`

export const UpdateMissingDemographics = /* GraphQL */ gql`
  mutation UpdateMissingDemographics($input: updateMissingDemographicsInput!) {
    UpdateMissingDemographics: updateMissingDemographics(input: $input) {
      success
      status
      errorMessage
    }
  }
`

export const RefreshToken = /* GraphQL */ gql`
  query RefreshToken($refreshtoken: ID!) {
    RefreshToken: refreshToken(refreshtoken: $refreshtoken) {
      success
      token
      issueTime
      expiredTime
      expiredIn
      refreshToken
      user {
        firstname
        lastname
        uid
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

export const addTeacher = /* GraphQL */ gql`
  mutation AddTeacher($gradeId: ID!, $visitId: ID!, $person: AddTeacherInput!) {
    AddTeacher: addTeacher(
      gradeId: $gradeId
      visitId: $visitId
      person: $person
    ) {
      success
      status
      errorMessage
      teacher {
        personId
        lastName
        firstName
        subjects
        barcode
      }
    }
  }
`

export const updateBarcode = /* GraphQL */ gql`
  mutation UpdateBarcode($visitId: ID!, $input: updateBarCodeInput!) {
    UpdateBarcode: updateBarcode(visitId: $visitId, input: $input) {
      success
      status
      errorMessage
    }
  }
`
export const updateAssessmentNotes = /* GraphQL */ gql`
  mutation UpdateAssessmentNotes($input: updateAssessmentNotesInput!) {
    UpdateAssessmentNotes: updateAssessmentNotes(input: $input) {
      success
      status
      errorMessage
    }
  }
`
export const updateNDA = /* GraphQL */ gql`
  mutation UpdateNDA($input: updateNDAInput!) {
    UpdateNDA: updateNDA(input: $input) {
      success
      status
      errorMessage
    }
  }
`
export const updateQuexResponses = /* GraphQL */ gql`
  mutation UpdateQuexResponses($input: updateQuexResponseInput!) {
    UpdateQuexResponses: updateQuexResponse(input: $input) {
      success
      status
      errorMessage
    }
  }
`
export const signOut = /* GraphQL */ gql`
  mutation SignOut($username: ID!) {
    SignOut: signOut(username: $username) {
      success
      message
    }
  }
`

export const updateTeacher = gql`
  mutation UpdateTeacher($visitId: ID!, $input: updateTeacherInput!) {
    updateTeacher(visitId: $visitId, input: $input) {
      success
      status
      errorMessage
      teacher {
        personId
        lastName
        firstName
        subjects
        barcode
      }
    }
  }
`

export const deleteTeacher = gql`
  mutation DeleteTeacher($visitId: ID!, $personId: ID!) {
    deleteTeacher(visitId: $visitId, personId: $personId) {
      success
      status
      message
      visitId
    }
  }
`
