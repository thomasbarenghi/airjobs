interface ValueLabelObject {
  value: string
  label: string
}

export const convertArrayToValueLabelArray = (inputArray: string[]): ValueLabelObject[] => {
  const valueLabelArray: ValueLabelObject[] = inputArray.map((item) => ({
    value: item,
    label: item
  }))
  return valueLabelArray
}
