import { uid } from 'quasar'

const $listeners = {}

export const dataErrorListener = {
  subscribe(subscriber) {
    const key = uid()
    $listeners[key] = result => {
      subscriber(result)
    }

    return () => {
      delete $listeners[key]
    }
  },
  publish(result) {
    Object.keys($listeners).forEach(x => {
      $listeners[x](result)
    })
  }
}
