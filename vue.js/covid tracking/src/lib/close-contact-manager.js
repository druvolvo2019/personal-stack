export function closeContactCompleted(
  v,
  currentLocation,
  contactCompleted,
  emit
) {
  const result = {
    ...v,
    ...currentLocation.value,
  }
  currentLocation.value.location.hasBeenNotified = v.closed
    ? 'CONTACTED'
    : 'NOT_CONTACTED'
  contactCompleted.value = v.closed
  emit('closeContact', result)
}

export function shouldShowContactCompleted(currentLocation) {
  return currentLocation.value.location?.hasBeenNotified !== 'NOT_READY'
}
