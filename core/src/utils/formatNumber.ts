const formatNumber = (
  value: number,
  {
    fractionDigits = undefined,
    symbol = '',
    symbolPosition = 'before',
    sign = undefined,
    unit = '',
    parenthesis = false,
    maximumSignificantDigits = undefined,
  }: {
    fractionDigits?: number
    symbol?: string
    sign?: boolean
    unit?: string
    symbolPosition?: 'before' | 'after'
    parenthesis?: boolean
    maximumSignificantDigits?: number
  } = {}
) => {
  const absValue = Math.abs(value)

  const number = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(absValue)

  const parenthesisBeginningBuilder = parenthesis ? '(' : ''
  const parenthesisFinalBuilder = parenthesis ? ')' : ''
  const signBuilder = sign !== undefined ? (sign ? '+' : '-') : ''
  const symbolBeforeBuilder = symbolPosition === 'before' || symbolPosition === undefined ? symbol : ''
  const symbolAfterBuilder = symbolPosition === 'after' ? symbol : ''
  const unitBuilder = unit ? ' ' + unit : ''

  return `${parenthesisBeginningBuilder}${signBuilder}${symbolBeforeBuilder}${number}${symbolAfterBuilder}${unitBuilder}${parenthesisFinalBuilder}`
}

export default formatNumber
