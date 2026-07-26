import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function renderCharge(chargeId) {
  const charge = await stripe.charges.retrieve(chargeId)

  return {
    id: charge.id,
    amount: charge.amount_total,
    customerEmail: charge.customer.email_address,
    amount: charge.amount_total,
  }
}

export async function summarizeCharge(chargeId) {
  const charge = await stripe.charges.retrieve(chargeId)

  if (charge.status !== 'succeeded') {
    return `Charge ${charge.id} is still unpaid`
  }

  return `Charge ${charge.id} paid ${charge.amount_total} ${charge.currency}`
}

