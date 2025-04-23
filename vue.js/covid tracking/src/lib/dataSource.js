import { useApolloClient } from '@vue/apollo-composable'

import {
  getCIMSUsers,
  getCIMSUser,
  getIncident,
  getIncidents,
  getCIMSSchool,
  getCIMSSchools,
  getCIMSDistrict,
  getCIMSDistricts,
  getIncidentCards,
  getIncidentDetails,
  getIncidentSummary,
  getContactLog,
  getNCESDetails
} from 'src/graphql/queries'

import {
  loginCIMSUser,
  logoutCIMSUser,
  registerCIMSUser,
  updateCIMSUser,
  updateCIMSSchoolContact,
  processSchoolContact,
  updateCIMSDistrictContact,
  processDistrictContact,
  sendCIMSEmail,
  processIncident,
  updateIncident,
  updateIncidentDisable,
  callHandled,
	contactClosedState,
	sendEmail,
  contactAssignment,
  updateCIMSUserPassword,
  resetCIMSUserPassword,
  updateIncidentNotes
} from 'src/graphql/mutations'

async function runQuery(graphQL) {
  const { resolveClient } = useApolloClient()
  const client = resolveClient()
  const result = await client.query(graphQL)
  ////console.log({ result })

  ////console.log('result.data=', result.data)
  return result.data
}

async function runLocalQuery(q) {
  return runQuery(makeQueryLocal(q))
}

export function makeQueryLocal(q) {
  return {
    ...q,
    context: {
      clientName: 'local',
    },
  }
}

/*
QUERIES FUNCTIONS FACTORY
-----------------
*/

function GetIncidentFactory(anid) {
  return {
    query: getIncident,
    variables: {
      fldstaffid: anid,
    },
  }
}

function GetIncidentsFactory(aninput) {
  return {
    query: getIncidents,
    variables: {
      input: aninput,
    },
  }
}

function GetCIMSSchoolFactory(anid) {
  return {
    query: getCIMSSchool,
    variables: {
      frame_n_: anid,
    },
  }
}

function GetCIMSSchoolsFactory(aninput) {
  return {
    query: getCIMSSchools,
    variables: {
      input: aninput,
    },
  }
}

function GetCIMSUserFactory(anid) {
  return {
    query: getCIMSUser,
    variables: {
      userid: anid,
    },
  }
}

function GetCIMSUsersFactory(aninput) {
  return {
    query: getCIMSUsers,
    variables: {
      input: aninput,
    },
  }
}

function GetCIMSDistrictFactory(anid) {
  return {
    query: getCIMSDistrict,
    variables: {
      leaid: anid,
    },
  }
}
function GetCIMSDistrictsFactory(aninput) {
  return {
    query: getCIMSDistricts,
    variables: {
      input: aninput,
    },
  }
}


function GetContactLogFactory(aninput) {
  return {
    query: getContactLog,
    variables: {
      id: aninput.id,
      locationKind:aninput.locationKind
    },
  }
}

function GetNCESDetailsFactory(aninput) {
  return {
    query: getContactLog,
    variables: {
      incidentId: aninput.incidentId,
      kind:aninput.kind
    },
  }
}


function GetIncidentCardsFactory(aninput) {
  return {
    query: getIncidentCards,
    variables: {
      input: aninput,
    },
  }
}

export function GetIncidentDetailsFactory(aninput) {
  return {
    query: getIncidentDetails,
    variables: {
      input: aninput,
    },
  }
}

function GetIncidentSummaryFactory(aninput) {
  return {
    query: getIncidentSummary,
    variables: {
      input: aninput,
    },
  }
}

/*
MUTATIONS FUNCTIONS FACTORY
--------------------------
*/

function ProcessIncidentFactory(updateInput) {
  return {
    mutation: processIncident,
    variables: { input: updateInput },
  }
}

function UpdateIncidentFactory(updateInput) {
  return {
    mutation: updateIncident,
    variables: { input: updateInput },
  }
}

function UpdateIncidentDisableFactory(updateInput) {
  return {
    mutation: updateIncidentDisable,
    variables: { input: updateInput },
  }
}

function LoginCIMSUserFactory(updateInput) {
  return {
    mutation: loginCIMSUser,
    variables: { input: updateInput },
  }
}

function LogoutCIMSUserFactory(updateInput) {
  return {
    mutation: logoutCIMSUser,
    variables: { input: updateInput },
  }
}

function RegisterCIMSUserFactory(updateInput) {
  return {
    mutation: registerCIMSUser,
    variables: { input: updateInput },
  }
}

function UpdateCIMSUserFactory(updateInput) {
  return {
    mutation: updateCIMSUser,
    variables: { input: updateInput },
  }
}

resetCIMSUserPassword

function UpdateCIMSUserPasswordFactory(updateInput) {
  return {
    mutation: updateCIMSUserPassword,
    variables: { input: updateInput },
  }
}


function ResetCIMSUserPasswordFactory(updateInput) {
  return {
    mutation: resetCIMSUserPassword,
    variables: { input: updateInput },
  }
}

function UpdateCIMSSchoolContactFactory(updateInput) {
  return {
    mutation: updateCIMSSchoolContact,
    variables: { input: updateInput },
  }
}

function ProcessSchoolContactFactory(updateInput) {
  return {
    mutation: processSchoolContact,
    variables: { input: updateInput },
  }
}

function UpdateCIMSDistrictContactFactory(updateInput) {
  return {
    mutation: updateCIMSDistrictContact,
    variables: { input: updateInput },
  }
}

function ProcessDistrictContactFactory(updateInput) {
  return {
    mutation: processDistrictContact,
    variables: { input: updateInput },
  }
}

function contactAssignmentFactory(updateInput) {
    return {
      mutation: contactAssignment,
      variables: { input: updateInput },
    }
  }

function SendCIMSEmailFactory(updateInput) {
  return {
    mutation: sendCIMSEmail,
    variables: { input: updateInput },
  }
}

function UpdateIncidentNotesFactory(updateInput) {
  return {
    mutation: updateIncidentNotes,
    variables: { input: updateInput },
  }
}


function CallHandledFactory(updateInput) {
  return {
    mutation: callHandled,
    variables: { input: updateInput },
  }
}

function ContactClosedStateFactory(updateInput) {
  return {
    mutation: contactClosedState,
    variables: { input: updateInput },
  }
}

function SendEmailFactory(updateInput) {
  return {
    mutation: sendEmail,
    variables: { input: updateInput },
  }
}
	
/*
PUBLIC FUNCTIONS
----------------
*/

/*anid is userid */
export async function runGetIncident(anid) {
  //console.log( '------------------- runGetIncident -------------------------------')
  //console.log('anid=', anid)

  let q = GetIncidentFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetIncident ---------------------------')
  return result.GetIncident.data
}

/*anid is userid */
export async function runGetIncidents(anid) {
  ////console.log('------------------- runGetIncidents -------------------------------')
  ////console.log('anid=', anid)

  let q = GetIncidentsFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetIncidents ---------------------------')
  return result.GetIncidents.data
}

/*anid is userid */
export async function runGetCIMSSchool(anid) {
  //console.log('------------------- runGetCIMSSchool -------------------------------')
  let q = GetCIMSSchoolFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetCIMSSchool ---------------------------')
  return result.GetCIMSSchool.data
}

export async function runGetCIMSSchools(anid) {
  //console.log('------------------- runGetCIMSSchools -------------------------------')
  let q = GetCIMSSchoolsFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetCIMSSchools ---------------------------')
  return result.GetCIMSSchools.data
}

/*anid is userid */
export async function runGetCIMSDistrict(anid) {
  //console.log('------------------- runGetCIMSDistrict -------------------------------')
  let q = GetCIMSDistrictFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetCIMSDistrict ---------------------------')
  return result.GetCIMSDistrict.data
}

export async function runGetCIMSDistricts(anid) {
  //console.log('------------------- runGetCIMSDistricts -------------------------------')
  let q = GetCIMSDistrictsFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetCIMDistricts ---------------------------')
  return result.GetCIMSDistricts.data
}

export async function runGetContactLog(anid) {
  //console.log('------------------- runGetContactLog -------------------------------')
  let q = GetContactLogFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetContactLog ---------------------------')
  return result.GetContactLog.data
}

export async function runGetNCESDetails(anid) {
  //console.log('------------------- runGetNCESDetails -------------------------------')
  let q = GetNCESDetailsFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetNCESDetails ---------------------------')
  return result.GetNCESDetailsdata
}


/*anid is userid */
export async function runGetCIMSUser(anid) {
  //console.log('------------------- runGetCIMSUser --------------------------------')
  let q = GetCIMSUserFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetCIMSUser ----------------------------')
  return result.GetCIMSUser.data
}

export async function runGetCIMSUsers(anid) {
  //console.log('------------------- runGetCIMSUsers -------------------------------')
  let q = GetCIMSUsersFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end runGetCIMSUsers ---------------------------')
  return result.GetCIMSUsers.data
}

export async function runGetIncidentCards(anid) {
  //console.log('------------------- runGetIncidentCards --------------------------------')
  let q = GetIncidentCardsFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end GetIncidentCards ----------------------------')
  return result.GetIncidentCards.data
}

export async function runGetIncidentDetails(anid) {
  //console.log('------------------- runGetIncidentDetails --------------------------------')
  let q = GetIncidentDetailsFactory(anid)
  let result = await runLocalQuery(q)
  console.log(
    '------------------- end GetIncidentDetails ----------------------------'
  )
  return result.GetIncidentDetails.data
}

export async function runGetIncidentSummary(anid) {
  //console.log('------------------- runGetIncidentSummary --------------------------------')
  let q = GetIncidentSummaryFactory(anid)
  let result = await runQuery(q)
  //console.log('------------------- end GetIncidentSummary ----------------------------')
  return result.GetIncidentSummary.data
}

function runMutation(q) {
  const { resolveClient } = useApolloClient()
  const client = resolveClient()
  return client.mutate(q)
}

export async function runSaveLogin(payload) {
  //console.log('------------------- runLoginCIMSUser ------------------------------')
  let q = LoginCIMSUserFactory(payload)
  try {
    let res = await runMutation(q)
    let result = await res.data.LoginCIMSUser
    //console.log('success=', result.success)
    //console.log('status=', result.status)
    //console.log('result=', result)
    if (!result.success && result.status === 401) {
      res = await runMutation(q)
      //console.log('runLoginCIMSUser 2', res)
      result = await res.data.LoginCIMSUser
    }
    //console.log('------------------- end runLoginCIMSUser --------------------------')
    return result
  } catch (e) {
    //console.log(e)
    throw new Error('Error logging in')
  }
}

export async function runProcessIncident(payload) {
  //console.log('------------------- runProcessIncident ------------------------------')
  let q = ProcessIncidentFactory(payload)
  try {
    let res = await runMutation(q)
    let result = await res.data.ProcessIncident
    //console.log('success=', result.success)
    //console.log('status=', result.status)
    //console.log('result=', result)
    if (!result.success && result.status === 401) {
      res = await runMutation(q)
      //console.log('ProcessIncident 2', res)
      result = await res.data.ProcessIncident
    }
    //console.log('------------------- end runProcessIncident --------------------------')
    return result
  } catch (e) {
    //console.log(e)
    throw new Error('Error logging in')
  }
}

export async function runUpdateIncident(payload) {
  //console.log('------------------- runUpdateIncident ------------------------------')
  let q = UpdateIncidentFactory(payload)
  try {
    let res = await runMutation(q)
    let result = await res.data.UpdateIncident
    //console.log('success=', result.success)
    //console.log('status=', result.status)
    //console.log('result=', result)
    if (!result.success && result.status === 401) {
      res = await runMutation(q)
      //console.log('UpdateIncident 2', res)
      result = await res.data.UpdateIncident
    }
    //console.log('------------------- end runUpdateIncident --------------------------')
    return result
  } catch (e) {
    //console.log(e)
    throw new Error('Error logging in')
  }
}

export async function runUpdateIncidentDisable(payload) {
  //console.log('------------------- runUpdateIncidentDisable ------------------------------')
  let q = UpdateIncidentDisableFactory(payload)
  try {
    let res = await runMutation(q)
    let result = await res.data.UpdateIncidentDisable
    //console.log('success=', result.success)
    //console.log('status=', result.status)
    //console.log('result=', result)
    if (!result.success && result.status === 401) {
      res = await runMutation(q)
      //console.log('UpdateIncidentDisable 2', res)
      result = await res.data.pdateIncidentDisable
    }
    //console.log('------------------- end runUpdateIncidentDisable --------------------------')
    return result
  } catch (e) {
    //console.log(e)
    throw new Error('Error logging in')
  }
}

// payload is userid, userfirstname, userlastname, useremail, fldlogindate, fldloggedoutdate, flgsysactive, flglocked, flgdisabled, password, fldrole
export async function runSaveLogout(payload) {
  //console.log('------------------- runLogoutCIMSUser -----------------------------')
  let q = LogoutCIMSUserFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.LogoutCIMSUser
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runLogoutCIMSUser 2', res)
    result = await res.data.LogoutCIMSUser
  }
  //console.log('------------------- end runLogoutCIMSUser -------------------------')
  return result
}

// payload is userid, userfirstname, userlastname, useremail, fldlogindate, fldloggedoutdate, flgsysactive, flglocked, flgdisabled, password, fldrole
export async function runSaveRegister(payload) {
  //console.log('------------------- runRegisterCIMSUser ---------------------------')
  let q = RegisterCIMSUserFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.RegisterCIMSUser
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('RegisterCIMSUser 2', res)
    result = await res.data.RegisterCIMSUser
  }
  //console.log('------------------- end RegisterCIMSUser --------------------------')
  return result
}

// payload is userid, userfirstname, userlastname, useremail, fldlogindate, fldloggedoutdate, flgsysactive, flglocked, flgdisabled, password, fldrole
export async function runUpdateUserProfile(payload) {
  console.log('------------------- runUpdateUserProfile ---------------------------')
  let q = UpdateCIMSUserFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.UpdateCIMSUser
  console.log('success=', result.success)
  console.log('status=', result.status)
  console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    console.log('runUpdateUserProfile 2', res)
    result = await res.data.UpdateCIMSUser
  }
  //console.log('------------------- end runUpdateUserProfile --------------------------')
  return result
}

// payload is userid, userfirstname, userlastname, useremail, fldlogindate, fldloggedoutdate, flgsysactive, flglocked, flgdisabled, password, fldrole
export async function runUpdateUserPassword(payload) {
  //console.log('------------------- runUpdateUser ---------------------------')
  let q = UpdateCIMSUserPasswordFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.UpdateCIMSUserPassword
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runUpdateCIMSUserPassword 2', res)
    result = await res.data.UpdateCIMSUserPassword
  }
  //console.log('------------------- end runUpdateCIMSUserPassword --------------------------')
  return result
}

// payload is userid, userfirstname, userlastname, useremail, fldlogindate, fldloggedoutdate, flgsysactive, flglocked, flgdisabled, password, fldrole
export async function runResetUserPassword(payload) {
  //console.log('------------------- runUpdateUser ---------------------------')
  let q = ResetCIMSUserPasswordFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.ResetCIMSUserPassword
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runUpdateCIMSUserPassword 2', res)
    result = await res.data.ResetCIMSUserPassword
  }
  //console.log('------------------- end runResetCIMSUserPassword --------------------------')
  return result
}


export async function runUpdateSchoolContact(payload) {
  //console.log('------------------- runUpdateSchoolContact ---------------------------')
  let q = UpdateCIMSSchoolContactFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.UpdateCIMSSchoolContact
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runUpdateSchoolContact 2', res)
    result = await res.data.UpdateCIMSSchoolContact
  }
  //console.log('------------------- end runUpdateSchoolContact --------------------------')
  return result
}

export async function runUpdateDistrictContact(payload) {
  //console.log('------------------- runUpdateDistrictContact ---------------------------')
  let q = UpdateCIMSDistrictContactFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.UpdateCIMSDistrictContact
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runUpdateDistrictContact 2', res)
    result = await res.data.UpdateCIMSDistrictContact
  }
  //console.log('------------------- end runUpdateDistrictContact --------------------------')
  return result
}

export async function runProcessSchoolContact(payload) {
  //console.log('------------------- runProcessSchoolContact ---------------------------')
  let q = ProcessSchoolContactFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.ProcessSchoolContact
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('ProcessSchoolContact 2', res)
    result = await res.data.ProcessSchoolContact
  }
  //console.log('------------------- end runProcessSchoolContact --------------------------')
  return result
}

export async function runProcessDistrictContact(payload) {
  //console.log('------------------- runProcessDistrictContact ---------------------------')
  let q = ProcessDistrictContactFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.ProcessDistrictContact
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('ProcessDistrictContact 2', res)
    result = await res.data.ProcessDistrictContact
  }
  //console.log('------------------- end runProcessSchoolContact --------------------------')
  return result
}

export async function runContactAssignment(payload) {
    //console.log('------------------- runProcessDistrictContact ---------------------------')
    let q = contactAssignmentFactory(payload)
    let res = await runMutation(q)
    let result = await res.data.ContactAssignment
    //console.log('success=', result.success)
    //console.log('status=', result.status)
    //console.log('result=', result)
    if (!result.success && result.status === 401) {
      res = await runMutation(q)
      //console.log('ProcessDistrictContact 2', res)
      result = await res.data.ContactAssignment
    }
    //console.log('------------------- end runProcessSchoolContact --------------------------')
    return result
  }

export async function runSendCIMSEmail(payload) {
  //console.log('------------------- runSendCIMSEmail ---------------------------')
  let q = SendCIMSEmailFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.SendCIMSEmail
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runSendCIMSEmail 2', res)
    result = await res.data.SendCIMSEmail
  }
  //console.log('------------------- end runSendCIMSEmail --------------------------')
  return result
}


export async function runUpdateIncidentNotes(payload) {
  //console.log('------------------- runUpdateIncidentNotes ---------------------------')
  let q = UpdateIncidentNotesFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.UpdateIncidentNotes
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runUpdateIncidentNotes 2', res)
    result = await res.data.UpdateIncidentNotes
  }
  //console.log('------------------- end runUpdateIncidentNotes --------------------------')
  return result
}


export async function runCallHandled(payload) {
  //console.log('------------------- runCallHandled ---------------------------')
  let q = CallHandledFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.CallHandled
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runCallHandled 2', res)
    result = await res.data.CallHandled
  }
  //console.log('------------------- end runCallHandled --------------------------')
  return result
}


export async function runContactClosedState(payload) {
  //console.log('------------------- runContactClosedState ---------------------------')
  let q = ContactClosedStateFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.ContactClosedState
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runContactClosedState 2', res)
    result = await res.data.ContactClosedState
  }
  //console.log('------------------- end runContactClosedState --------------------------')
  return result
}

export async function runSendEmail(payload) {
  //console.log('------------------- runSendEmail ---------------------------')
  let q = SendEmailFactory(payload)
  let res = await runMutation(q)
  let result = await res.data.SendEmail
  //console.log('success=', result.success)
  //console.log('status=', result.status)
  //console.log('result=', result)
  if (!result.success && result.status === 401) {
    res = await runMutation(q)
    //console.log('runSendEmail 2', res)
    result = await res.data.SendEmail
  }
  //console.log('------------------- end runSendEmail --------------------------')
  return result
}
	
	
	
	
