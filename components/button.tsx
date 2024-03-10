'use client'

import { useFormStatus } from "react-dom"

type ButtonProps = {
  label: string
  color: "create" | "delete"
}

export default function Button({ label, color }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className={`${color === "create" ? "bg-blue-600" : "bg-red-500"} text-white`} disabled={pending}>
      {label}
    </button >
  )
}