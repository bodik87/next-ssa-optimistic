'use client'

import { useOptimistic } from 'react'
import { Item } from '@prisma/client'
import { updateItemAction } from '@/app/actions'
import { DeleteForm } from './delete-form'

export default function Element({ todo }: { todo: Item }) {
  const [optimisticTodo, updateTodo] = useOptimistic(
    todo, (todo) => { return { ...todo } }
  )

  async function handleChange(title: string) {

    const result = await updateItemAction(optimisticTodo.id, title)

    if (result?.error) {
      console.error(result.error)
    }
  }

  return (
    <li className='flex items-center justify-between gap-3'>
      <label
        htmlFor={optimisticTodo.id}
        className='cursor-pointer peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through'
      >
        {optimisticTodo.title}
      </label>

      <DeleteForm id={optimisticTodo.id} />
    </li>
  )
}
