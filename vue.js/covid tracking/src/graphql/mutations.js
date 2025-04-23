import gql from 'graphql-tag'

export const loginCIMSUser = /* GraphQL */ gql`
  mutation LoginCIMSUser($input: loginCIMSUserInput!) {
    LoginCIMSUser: loginCIMSUser(input: $input) {
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

export const logoutCIMSUser = /* GraphQL */ gql`
  mutation LogoutCIMSUser($input: logoutCIMSUserInput!) {
    LogoutCIMSUser: logoutCIMSUser(input: $input) {
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

export const registerCIMSUser = /* GraphQL */ gql`
  mutation RegisterCIMSUser($input: registerCIMSUserInput!) {
    RegisterCIMSUser: registerCIMSUser(input: $input) {
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

export const updateCIMSUser = /* GraphQL */ gql`
  mutation UpdateCIMSUser($input: updateCIMSUserInput!) {
    UpdateCIMSUser: updateCIMSUser(input: $input) {
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

export const updateCIMSUserPassword = /* GraphQL */ gql`
  mutation UpdateCIMSUserPassword($input: updateCIMSPasswordInput!) {
    UpdateCIMSUserPassword: updateCIMSUserPassword(input: $input) {
      status
      success
      errorMessage
   }
 }   
`

export const resetCIMSUserPassword = /* GraphQL */ gql`
  mutation ResetCIMSUserPassword($input: resetCIMSPasswordInput!) {
    ResetCIMSUserPassword: resetCIMSUserPassword(input: $input) {
      status
      success
      errorMessage
   }
 }   
`


export const processIncident = /* GraphQL */ gql`
  mutation ProcessIncident($input: processIncidentInput!) {
    ProcessIncident: processIncident(input: $input) {
      status
      success
      errorMessage
   }
 }   
`

export const updateIncidentDisable = /* GraphQL */ gql`
  mutation UpdateIncidentDisable($input: updateIncidentdisableInput!) {
    UpdateIncidentDisable: updateIncidentDisable(input: $input) {
      status
      success
      errorMessage
   }
 }   
`

export const updateIncident = /* GraphQL */ gql`
  mutation UpdateIncident($input: updateIncidentInput!) {
    UpdateIncident: updateIncident(input: $input) {
      status
      success
      errorMessage
   }
 }   
`

export const updateCIMSSchoolContact = /* GraphQL */ gql`
  mutation UpdateCIMSSchoolContact($input: updateSchoolContactInput!) {
    UpdateCIMSSchoolContact: updateCIMSSchoolContact(input: $input) {
      status
      success
      errorMessage
   }
 }   
`

export const processSchoolContact = /* GraphQL */ gql`
  mutation processSchoolContact($input: processSchoolContactInput!) {
    ProcessSchoolContact: processSchoolContact(input: $input) {
      status
      success
      errorMessage
   }
 }   
`
export const updateCIMSDistrictContact = /* GraphQL */ gql`
  mutation UpdateCIMSDistrictContact($input: updateDistrictContactInput!) {
    UpdateCIMSDistrictContact: updateCIMSDistrictContact(input: $input) {
      status
      success
      errorMessage
   }
 }   
`

export const processDistrictContact = /* GraphQL */ gql`
  mutation processDistrictContact($input: processDistrictContactInput!) {
    ProcessDistrictContact: processDistrictContact(input: $input) {
      status
      success
      errorMessage
   }
 }   
`
export const contactAssignment = /* GraphQL */ gql`
  mutation contactAssignment($input: ContactAssignmentInput!) {
    ContactAssignment: contactAssignment(input: $input) {
      status
      success
      errorMessage
   }
 }   
`


export const sendCIMSEmail = /* GraphQL */ gql`
  mutation sendCIMSEmail($input: sendEmailInput!) {
    SendCIMSEmail: sendCIMSEmail(input: $input) {
      status
      success
      errorMessage
   }
 }   
`

export const callHandled = /* GraphQL */ gql`
  mutation callHandled($loggedInId: ID!,
                       $contactId: Int!,
                       $locationKind: CallHandledLocationKind!,
		                   $kind: CallHandledKind!
  ) {
    CallHandled: callHandled(loggedInId: $loggedInId, 
                             contactId: $contactId,
		                         locationKind: $locationKind,
		                         kind: $kind
    ) {
      status
      success
      errorMessage
   }
 }   
`
export const contactClosedState = /* GraphQL */ gql`
  mutation contactClosedState($loggedInId: ID!,
                       $contactId: Int!,
                       $locationKind: CallHandledLocationKind!,
		                   $isClosed: Boolean!
  ) {
    ContactClosedState: contactClosedState(loggedInId: $loggedInId, 
                             contactId: $contactId,
		                         locationKind: $locationKind,
		                         isClosed: $isClosed
    ) {
      status
      success
      errorMessage
   }
 }   
`

export const sendEmail = /* GraphQL */ gql`
  mutation sendEmail($loggedInId: ID!,
		                    $contactId: Int!,
		                    $locationKind: CallHandledLocationKind!,
		                    $to: String!,
		                    $cc: String!,
		                    $emailBody: String!,
		                    $notes: String
  ) {
    SendEmail: sendEmai(loggedInId: $loggedInId,
		                    contactId: $contactId,
		                    locationKind: $locationKind,
		                    to: $to,
		                    cc: $cc,
		                    emailBody: $emailBody,
		                    notes: $notes
    ) {
      status
      success
      errorMessage
   }
 }   
`
export const updateIncidentNotes = /* GraphQL */ gql`
  mutation updateIncidentNotes($input: updateIncidentNotesInput!) {
    UpdateIncidentNotes: updateIncidentNotes(input: $input) {
      status
      success
      errorMessage
   }
 }   
`