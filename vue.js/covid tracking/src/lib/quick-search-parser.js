export function convertTemplateToTypedArray(template) {
  const rawArray = Array.isArray(template)
    ? template
    : Object.keys(template || {})

  return rawArray.flatMap((item) => {
    if (typeof item === 'object') {
      return Object.keys(item).map((key) => {
        return {
          kind: item[key],
          key,
        }
      })
    } else {
      return {
        kind: 'any',
        key: item,
      }
    }
  })
}

export function parse(input, template) {
  const parsedValues = input.match(/\\?.|^$/g).reduce(
    (p, c) => {
      if (c === '"') {
        p.quote ^= 1
      } else if (!p.quote && c === ' ') {
        p.a.push('')
      } else {
        p.a[p.a.length - 1] += c.replace(/\\(.)/, '$1')
      }
      return p
    },
    { a: [''] }
  ).a

  const result = {}
  const text = []
  const allowedValues = convertTemplateToTypedArray(template)
  parsedValues.forEach((x) => {
    if (x.match(/\S:\S/)) {
      const [key, ...v] = x.split(':')
      const value = v.join(':')
      const foundKey =
        allowedValues.length === 0
          ? {
              kind: 'any',
              key,
            }
          : allowedValues.find((x) => x.key === key)
      if (foundKey !== void 0) {
        if (result[key] === void 0) {
          result[key] = []
        }
        switch (foundKey.kind.toLowerCase()) {
          case 'boolean':
            result[key].push(value.toLowerCase().startsWith('t'))
            break
          default:
            result[key].push(value)
        }
      } else {
        text.push(x)
      }
    } else {
      text.push(x)
    }
  })
  return {
    ...result,
    ___text: text,
  }
}
