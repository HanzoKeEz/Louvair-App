'use client'

import { checkout } from '@/app/_actions/payment'
import { useState, useTransition } from 'react'
import { Button } from '@/app/_components/Button'

export function CheckoutPaymentButton() {
  const [isPending, transition] = useTransition()

  const handleCheckout = () => {
    transition(async () => {
      try {
        await checkout()
      } catch {
        alert('Failed to checkout')
      }
    })
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isPending}
    >
      PAY
    </Button>
  )
}
