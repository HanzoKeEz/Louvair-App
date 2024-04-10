import * as React from 'react'

function BuyButtonComponent() {
  return (
    <button
      buy-button-id='{{BUY_BUTTON_ID}}'
      publishable-key='{{PUBLISHABLE_KEY}}'
      customer-session-client-secret='{{CLIENT_SECRET}}'
    >
      Subscribe
    </button>
  )
}

export default BuyButtonComponent
