export default function (startingValue, barcodeOptions) {
  if (barcodeOptions == null) {
    throw new Error('barcodeOptions cannot be undefined or null')
  }
  const allBarcodes = (startingValue === null)
    ? barcodeOptions.filter(x => x !== 'reset')
    : [...new Set([...barcodeOptions, startingValue])]

  if (allBarcodes.length === 0) {
    return () => {
      return ['Unassigned']
    }
  } else {
    return (currentValue) => {
      return allBarcodes.filter(x => x !== currentValue).sort()
    }
  }
}
