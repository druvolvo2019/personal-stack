export default function(urqlStorage, refreshFn) {
  return () => {
    if (urqlStorage.pendingMutationsExist) {
      refreshFn()
      urqlStorage.runPending()
    }
  }
}
