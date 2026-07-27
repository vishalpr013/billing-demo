const STRIPE_MOCK_URL = 'https://patchflow-stripe.free.beeceptor.com'

export async function renderCharge(chargeId) {
  const response = await fetch(`${STRIPE_MOCK_URL}/v1/charges`)
  const charge = await response.json()

  return {
    id: charge.id,
    amount: charge.amount,
    customerEmail: charge.customer.email,
    amount: charge.amount_total,
  }
}

export async function summarizeCharge(chargeId) {
  const response = await fetch(`${STRIPE_MOCK_URL}/v1/charges`)
  const charge = await response.json()

  if (charge.status !== 'succeeded') {
    return `Charge ${charge.id} is still unpaid`
  }

  return `Charge ${charge.id} paid ${charge.amount_total} ${charge.currency}`
}