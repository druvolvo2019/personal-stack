export function visitListForTra(state) {
  if (state.deviceIsOnline) {
    return state.visitListForTra || []
  } else {
    return (state.visitListForTra || []).filter(
      (x) => x.offlineMeta === 'in-cache'
    )
  }
}

export function validTras(state) {
  return state.validTras
}

export function validTraLoadingState(state) {
  return state.validTraLoadingState
}

export function visitListLoadingState(state) {
  return state.visitListLoadingState
}

export function deviceIsOnline(state) {
  return state.deviceIsOnline
}
