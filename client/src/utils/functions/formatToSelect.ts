interface ValueLabelObject {
  value: string
  label: string
}

/**
 * Converts an array of strings into an array of objects with 'value' and 'label' properties.
 * @param inputArray - The input array of strings to be converted.
 * @returns An array of objects where each object has a 'value' and 'label' property.
 */
export const convertArrayToValueLabelArray = (inputArray: string[]): ValueLabelObject[] =>
  inputArray.map((item) => ({
    value: item,
    label: item
  }))
