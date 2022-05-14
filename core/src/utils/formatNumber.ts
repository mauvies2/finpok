export const formatNumber = (
  value: number,
  {
    fractionDigits = undefined,
    symbol = '',
    symbolPosition = 'before',
    sign = undefined,
    noPositiveSign = false,
    unit = '',
    parenthesis = false,
    maximumSignificantDigits = undefined,
    abs = false,
  }: {
    fractionDigits?: number
    symbol?: string
    sign?: boolean
    noPositiveSign?: boolean
    unit?: string
    symbolPosition?: 'before' | 'after'
    parenthesis?: boolean
    maximumSignificantDigits?: number
    abs?: boolean
  } = {}
) => {
  const absValue = value ? Math.abs(value) : 0

  const number = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(absValue)

  const parenthesisBeginningBuilder = parenthesis ? '(' : ''
  const parenthesisFinalBuilder = parenthesis ? ')' : ''
  // eslint-disable-next-line no-nested-ternary
  const signBuilder = sign !== undefined ? (sign ? (noPositiveSign ? '' : '+') : '-') : ''
  const symbolBeforeBuilder = symbolPosition === 'before' || symbolPosition === undefined ? symbol : ''
  const symbolAfterBuilder = symbolPosition === 'after' ? symbol : ''
  const unitBuilder = unit ? ` ${unit}` : ''

  return `${parenthesisBeginningBuilder}${signBuilder}${symbolBeforeBuilder}${number}${symbolAfterBuilder}${unitBuilder}${parenthesisFinalBuilder}`
}
