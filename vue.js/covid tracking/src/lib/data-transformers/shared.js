export function ifNullish(v, d) {
  return v === void 0 || v === null ? d : v
}

export function phoneScriptGenerator(data) {
  if (data === void 0 || data === null) {
    return [
      {
        type: 'PHONE_BODY',
        componentName: 'html-display-plugin',
        data: '<p>No data received</p>',
      },
    ]
  }
  try {
    const { PHONE_HEADER, PHONE_BODY, PHONE_ENDING } = JSON.parse(data)

    return [
      {
        type: 'PHONE_HEADER',
        componentName: 'html-display-plugin',
        data: PHONE_HEADER,
      },
      {
        type: 'PHONE_REACHED_PERSON_ACTION',
        componentName: 'phone-reached-plugin',
      },
      {
        type: 'PHONE_BODY',
        componentName: 'html-display-plugin',
        data: PHONE_BODY,
      },
      {
        type: 'PHONE_ENDING',
        componentName: 'html-display-plugin',
        data: PHONE_ENDING,
      },
    ]
  } catch (e) {
    console.error(data, e)
    return [
      {
        type: 'PHONE_HEADER',
        componentName: 'html-display-plugin',
        data: '<p>Header not defined in script</p>',
      },
      {
        type: 'PHONE_REACHED_PERSON_ACTION',
        componentName: 'phone-reached-plugin',
      },
      {
        type: 'PHONE_BODY',
        componentName: 'html-display-plugin',
        data: data,
      },
      {
        type: 'PHONE_ENDING',
        componentName: 'html-display-plugin',
        data: '',
      },
    ]
  }
}

export function voicemailScriptGenerator(text) {
  return [
    {
      type: 'PHONE_BODY',
      componentName: 'html-display-plugin',
      data: text || 'No data received',
    },
  ]
}

export function emailScriptGenerator(text) {
  return [
    {
      type: 'EMAIL_TO_CC',
      componentName: 'all-email-display-plugin',
    },
    {
      type: 'EMAIL_BODY',
      componentName: 'html-display-plugin',
      data: text || 'No data received',
    },
    {
      type: 'SEND_EMAIL',
      componentName: 'send-email-plugin',
    },
  ]
}

export function emailNoNotesScriptGenerator(text) {
  return [
    {
      type: 'EMAIL_TO_CC',
      componentName: 'all-email-display-plugin',
    },
    {
      type: 'EMAIL_BODY',
      componentName: 'html-display-plugin',
      data: text || 'No data received',
    },
    {
      type: 'SEND_EMAIL',
      componentName: 'send-email-no-notes-plugin',
    },
  ]
}
