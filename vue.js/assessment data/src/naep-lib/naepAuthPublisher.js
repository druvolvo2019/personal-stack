import { uid, date } from 'quasar'
let $listeners = {}

function subscribeToAll(key, fn) {
  $listeners[key] = {
    fn,
    allow() {
      return true
    }
  }
}

function subscribeToType(key, kind, fn) {
  $listeners[key] = {
    fn,
    allow(event) {
      return event.kind === kind
    }
  }
}

function subscribeToSpecific(key, action, fn) {
  const [kind, code] = action.split(':')
  $listeners[key] = {
    fn,
    allow(event) {
      return event.kind === kind && event.code == code
    }
  }
}

function internalSubscribe(maybeAction, fn, parent) {
  const key = uid()
  if (typeof maybeAction === 'function') {
    subscribeToAll(key, maybeAction)
  } else if (maybeAction.includes(':')) {
    subscribeToSpecific(key, maybeAction, fn)
  } else {
    subscribeToType(key, maybeAction, fn)
  }
  return {
    and(maybeAction, fn) {
      return internalSubscribe(maybeAction, fn, this)
    },
    unsubscribe() {
      delete $listeners[key]
      if (parent) parent.unsubscribe()
    }
  }
}

export function subscribe(maybeAction, fn) {
  return internalSubscribe(maybeAction, fn)
}

export function publish(event) {
  const timestamp = new Date()
  const formattedTimestamp = date.formatDate(
    timestamp,
    'YYYY-MM-DDTHH:mm:ss.SSSZ'
  )
  const publishEvent = {
    timestamp: formattedTimestamp,
    ...event
  }
  Object.values($listeners).map(listener => {
    if (listener.allow(event)) listener.fn(publishEvent)
  })
}

export function naepAuthPublisher(action, payload = {}) {
  function adjustPayloadForError(payload) {
    if (payload.error) {
      const { error, ...p1 } = payload
      return {
        ...p1,
        error: {
          message: payload.message,
          stack: payload.stack
        }
      }
    } else {
      return payload
    }
  }
  const [kind, code] = action.split(':')
  publish({ kind, code, ...adjustPayloadForError(payload) })
}

export function inspect() {
  const result = {}
  Object.keys($listeners).forEach(x => {
    const listener = $listeners[x]
    result[x] = {
      fn: listener.fn.toString(),
      allow: listener.allow.toString()
    }
  })
  return result
}

export function clearAll() {
  $listeners = {}
}
