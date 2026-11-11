export type Currency = 'JOD' | 'USD'

const JOD_TO_USD_RATE = 1.41044

export const useCurrency = () => {
  const currency = useCookie<Currency>('currency', {
    default: () => 'JOD',
    watch: true
  })

  const setCurrency = (curr: Currency) => {
    currency.value = curr
  }

  const toggleCurrency = () => {
    currency.value = currency.value === 'JOD' ? 'USD' : 'JOD'
  }

  const formatPrice = (priceJod: number | string | null | undefined): string => {
    if (priceJod === null || priceJod === undefined || priceJod === '') return ''
    const num = typeof priceJod === 'string' ? parseFloat(priceJod) : priceJod
    if (isNaN(num)) return ''

    if (currency.value === 'USD') {
      const usdValue = Math.round(num * JOD_TO_USD_RATE)
      return `$${usdValue.toLocaleString('en-US')}`
    }

    return `${num.toLocaleString('en-US')} JOD`
  }

  return {
    currency,
    setCurrency,
    toggleCurrency,
    formatPrice
  }
}

