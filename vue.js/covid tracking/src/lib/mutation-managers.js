import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export function useCallHandled(
  userid,
  locationKind,
  $q,
  graphQLContext = {},
  refetchQueries = undefined
) {
  const { mutate: callHandledMutation, onDone: callHandledDone } = useMutation(
    gql`
      mutation CallHandledMutation(
        $loggedInId: ID!
        $contactId: Int!
        $locationKind: CallHandledLocationKind!
        $kind: CallHandledKind!
      ) {
        callHandled(
          loggedInId: $loggedInId
          contactId: $contactId
          locationKind: $locationKind
          kind: $kind
        ) {
          success
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      context: graphQLContext,
      refetchQueries,
    }
  )

  function onCallHandled(context) {
    const { contact, event } = context
    const params = {
      loggedInId: userid,
      contactId: contact.id,
      locationKind: locationKind,
      kind: event,
    }
    callHandledMutation(params)
    $q.notify({
      type: 'positive',
      message: 'Call Handled',
    })
  }
  return {
    callHandledMutation,
    callHandledDone,
    onCallHandled,
  }
}

export function useSendEmailMutation(
  userid,
  locationKind,
  $q,
  router,
  graphQLContext = {},
  refetchQueries = undefined
) {
  const {
    mutate: sendEmailMutation,
    onDone: onEmailSendDone,
    error: emailError,
  } = useMutation(
    gql`
      mutation SendEmail(
        $loggedInId: ID!
        $contactId: Int!
        $locationKind: CallHandledLocationKind!
        $to: String!
        $cc: String!
        $emailBody: String!
        $notes: String
      ) {
        sendEmail(
          loggedInId: $loggedInId
          contactId: $contactId
          locationKind: $locationKind
          to: $to
          cc: $cc
          emailBody: $emailBody
          notes: $notes
        ) {
          success
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      context: graphQLContext,
      refetchQueries,
    }
  )

  function onSendEmail(data) {
    const { context, withNotes, notes } = data
    const selectedScriptType = context.currentTemplate.scriptType
    let emailBody = context.primaryContact.rawScripts[selectedScriptType]
    if (withNotes) {
      emailBody = emailBody + `<p>Notes:</p><p>${notes}</p>`
    }

    const params = {
      loggedInId: userid,
      contactId: context.primaryContact.id,
      locationKind: locationKind,
      to: context.primaryContact.email,
      cc: context.carbonCopies.map((cc) => cc.email).join(','),
      emailBody,
      notes: notes,
    }

    sendEmailMutation(params)
    $q.notify({
      type: 'positive',
      message: 'Email sent',
    })
  }

  return {
    onSendEmail,
    onEmailSendDone,
    emailError,
  }
}

export function useCloseContactMutation(
  userid,
  locationKind,
  $q,
  graphQLContext = {},
  refetchQueries = undefined
) {
  const { mutate: closeContactMutation, onDone: closeContactDone } =
    useMutation(
      gql`
        mutation Mutation(
          $loggedInId: ID!
          $contactId: Int!
          $locationKind: CallHandledLocationKind!
          $isClosed: Boolean!
        ) {
          contactClosedState(
            loggedInId: $loggedInId
            contactId: $contactId
            locationKind: $locationKind
            isClosed: $isClosed
          ) {
            success
          }
        }
      `,
      {
        fetchPolicy: 'network-only',
        context: graphQLContext,
        refetchQueries,
      }
    )
  function onCloseContact(context) {
    const params = {
      loggedInId: userid,
      contactId: context.contact.id,
      locationKind: locationKind,
      isClosed: context.closed,
    }

    closeContactMutation(params)
    $q.notify({
      type: 'positive',
      message: context.closed ? 'Contact Closed' : 'Contact Reopened',
    })
  }

  return {
    onCloseContact,
    closeContactDone,
  }
}
