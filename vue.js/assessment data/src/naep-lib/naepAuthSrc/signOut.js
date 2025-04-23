export async function naepSignOut(
  authClient,
  storage,
  loggedInUser,
  publisher,
  reason = 'user-action'
) {
  const signOutMutation = `
      mutation SignOut($username: ID!) {
        SignOut: signOut(username: $username) {
          success
        }
      }
    `

  const mutation = username => {
    return {
      mutation: signOutMutation,
      variables: {
        username
      },
      fetchPolicy: 'no-cache'
    }
  }
  await loggedInUser.setActiveTra(null)
  await loggedInUser.setActiveVisit(null)
  const username = await loggedInUser.username()
  storage.signOut(username)
  // If for some reason the username is undefined (it shouldn't be), we don't want to lock up the application
  if (username) {
    try {
      await authClient.mutate(mutation(username))
    } catch (e) {
      // ignore
    }
  }

  publisher('info:signed-out', {
    reason
  })
}
