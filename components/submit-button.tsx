'use client'

import { useFormStatus } from "react-dom"

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className='w-full' disabled={pending}>
      Add Item
    </button>
  )
}