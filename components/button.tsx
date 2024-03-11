'use client'

import { useFormStatus } from "react-dom"

type ButtonProps = {
  label: string
  color: "create" | "delete"
  width: "full" | "fit"
}

export default function Button({ label, color, width }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className={`${color === "create" ? "bg-green-600" : "bg-red-500"} text-white ${width === "full" ? "w-full" : "w-fit"}`} disabled={pending}>
      {label}
    </button >
  )
}