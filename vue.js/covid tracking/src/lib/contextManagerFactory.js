export function contextManagerFactory(templates, contacts, currentContact) {
  return function (tab) {
    const currentTemplate = templates.find((x) => x.id === tab)
    if (currentTemplate === void 0) {
      console.error({ templates, contacts, currentContact })
      throw new Error(`Cannot find tab with id ${tab}`)
    }
    const primaryContact = contacts.find(
      (x) => x.type === currentTemplate.primaryType
    )

    const carbonCopies = contacts.filter((x) => {
      return !x.toOnly && x.type !== currentTemplate.primaryType
    })

    const currentScript =
      primaryContact === void 0
        ? undefined
        : primaryContact[currentTemplate.scriptType]

    return {
      templates: templates,
      contacts: contacts,
      currentTemplate: currentTemplate,
      primaryContact,
      carbonCopies,
      currentContact,
      currentScript,
    }
  }
}
