const STRIPE_MOCK_URL = 'https://patchflow-stripe.free.beeceptor.com'

export async function renderCharge(chargeId) {
  const response = await fetch(`${STRIPE_MOCK_URL}/v1/charges`)
  const charge = await response.json()

  return {
    id: charge.id,
    amount: charge.amount_total,
    customerEmail: charge.customer.email_address,
    paid: charge.paid,
  }
}

export async function summarizeCharge(chargeId) {
  const response = await fetch(`${STRIPE_MOCK_URL}/v1/charges`)
  const charge = await response.json()

  if (!charge.paid) {
    return `Charge ${charge.id} is still unpaid`
  }

  return `Charge ${charge.id} paid ${charge.amount_total} ${charge.currency}`
}