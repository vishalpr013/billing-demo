import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function renderCharge(chargeId) {
  const charge = await stripe.charges.retrieve(chargeId)

  return {
    id: charge.id,
    amount: charge.amount,
    customerEmail: charge.customer.email,
    paid: charge.paid,
  }
}

export async function summarizeCharge(chargeId) {
  const charge = await stripe.charges.retrieve(chargeId)

  if (!charge.paid) {
    return `Charge ${charge.id} is still unpaid`
  }

  return `Charge ${charge.id} paid ${charge.amount} ${charge.currency}`
}

