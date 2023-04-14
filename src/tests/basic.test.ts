import { assert, expect, test } from 'vitest'
import supabase from '../components/SupabaseClient'
import Stripe from 'stripe'


// Edit an assertion and save to see HMR in action

test('Math.sqrt()', () => {
  expect(Math.sqrt(4)).toBe(2)
  expect(Math.sqrt(144)).toBe(12)
  expect(Math.sqrt(2)).toBe(Math.SQRT2)
})

test('JSON', () => {
  const input = {
    foo: 'hello',
    bar: 'world',
  }

  const output = JSON.stringify(input)

  expect(output).eq('{"foo":"hello","bar":"world"}')
  assert.deepEqual(JSON.parse(output), input, 'matches original')
})

test('supabaseUpdate', async () => {
  const session = { "id": "cs_test_a1mwft2zapG7HMEYd1DXLdT8Ln8USPvj33M3Hx6l1ieomLVr3g7btl59yl", "object": "checkout.session", "after_expiration": null, "allow_promotion_codes": null, "amount_subtotal": 4000, "amount_total": 4320, "automatic_tax": { "enabled": true, "status": "complete" }, "billing_address_collection": null, "cancel_url": "https://stripe.cat-test-codes.pages.dev/cancel", "client_reference_id": "150b04bf-130c-4c74-b145-c79046c5e314", "consent": null, "consent_collection": null, "created": 1681418223, "currency": "usd", "currency_conversion": null, "custom_fields": [], "custom_text": { "shipping_address": null, "submit": null }, "customer": null, "customer_creation": "if_required", "customer_details": { "address": { "city": "Lacona", "country": "US", "line1": "367 Center Road", "line2": null, "postal_code": "13083", "state": "NY" }, "email": "achievement.testing@test.com", "name": "adadsf", "phone": null, "tax_exempt": "none", "tax_ids": [] }, "customer_email": "achievement.testing@test.com", "expires_at": 1681504623, "invoice": null, "invoice_creation": { "enabled": false, "invoice_data": { "account_tax_ids": null, "custom_fields": null, "description": null, "footer": null, "metadata": {}, "rendering_options": null } }, "livemode": false, "locale": null, "metadata": {}, "mode": "payment", "payment_intent": "pi_3MwWtSBRZLMDvS4R1Y8ttzhZ", "payment_link": null, "payment_method_collection": "always", "payment_method_options": {}, "payment_method_types": ["card"], "payment_status": "paid", "phone_number_collection": { "enabled": false }, "recovered_from": null, "setup_intent": null, "shipping_address_collection": null, "shipping_cost": null, "shipping_details": null, "shipping_options": [], "status": "complete", "submit_type": null, "subscription": null, "success_url": "https://stripe.cat-test-codes.pages.dev/thankyou", "total_details": { "amount_discount": 0, "amount_shipping": 0, "amount_tax": 320 }, "url": null }
  await supabase.from('profile').update({
    Payment_status: true,
  }).eq('order_number', session.client_reference_id)
  expect(await supabase.from('profile').select('Payment_status').match({order_number: session.client_reference_id})).toBe(true)
})