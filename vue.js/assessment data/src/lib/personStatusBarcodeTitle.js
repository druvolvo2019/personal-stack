export default function(person) {
  switch (person.computedStatus()) {
    case 'completedOnline':
      return ''
    case 'hasBarcode':
    case 'hasBarcodeAdd':
      return `Barcode ${person.barcode}`
    case 'needsBarcode':
      return '<span class="text-negative"> Assign paper barcode</span>'
    case 'error':
      const missing = ['firstName', 'lastName']
        .filter(key => person[key] == null)
        .join(' and ')
      return `<span class="text-negative">There is an error with the person. Missing ${missing}.</span>`
    case 'noId':
      return 'There is an error. This person does not have an id. Please notify the help desk.'
    default:
      return `Impossible situation. Unknown status ${person.computedStatus()}`
  }
}
