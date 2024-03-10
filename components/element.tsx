'use client'

import { useOptimistic } from 'react'
import { Item } from '@prisma/client'
import { updateItemAction } from '@/app/actions'
import { DeleteForm } from './delete-form'

export default function Element({ item }: { item: Item }) {
  const [optimisticItem, updateItem] = useOptimistic(
    item, (item) => { return { ...item } }
  )

  async function handleChange(title: string) {

    const result = await updateItemAction(optimisticItem.id, title)

    if (result?.error) {
      console.error(result.error)
    }
  }

  return (
    <li className='flex items-center justify-between gap-3'>
      <div key={optimisticItem.id} className='w-full p-2 flex flex-col border even:bg-gray-100 rounded-md'>
        <div className='flex justify-between'>
          <span className='font-semibold'>{optimisticItem.title}</span>
          {optimisticItem.rack && optimisticItem.place && <span>{optimisticItem.rack} / {optimisticItem.place}</span>}
        </div>

        {optimisticItem.info && <small>{optimisticItem.info}</small>}
        {optimisticItem.id.length > 3 && <DeleteForm id={optimisticItem.id} />}
      </div>
    </li>
  )
}
