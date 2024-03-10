'use client'

import { useOptimistic, useRef, useState } from 'react'
import type { Item } from '@prisma/client'
import { createItemAction } from '@/app/actions'
import Element from '@/components/element'
import SubmitButton from '@/components/submit-button'

export default function Elements({ items }: { items: Item[] }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem: Item) => {
      return [...state, newItem]
    }
  )

  const [query, setQuery] = useState('')

  async function action(data: FormData) {
    const id = crypto.randomUUID()
    const title = data.get('title')
    if (typeof title !== 'string' || !title) return
    if (title === '') return

    const newItem = {
      id: id,
      title,
    }

    formRef.current?.reset()
    addOptimisticItem(newItem)

    const result = await createItemAction(id, title)

    if (result?.error) {
      console.error(result.error)
    }
  }

  const filteredItems =
    query === ""
      ? []
      : items.filter(
        (el) =>
          el.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <>
      <form
        ref={formRef}
        action={action}
        autoComplete='off'
        className='mt-2 flex flex-col items-center gap-3'
      >
        <input
          type='text'
          autoComplete='off'
          name='title'
          placeholder='Add a new item'
        />
        <SubmitButton />
      </form>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type='text'
        autoComplete='off'
        name='query'
        placeholder='Search'
        className="w-full" />

      {query.length > 1 &&
        filteredItems?.map(
          el =>
            <div className='mt-2' key={el.id}>{el.title}</div>
        )}

      <ul className='mt-4 flex flex-col gap-1'>
        {optimisticItems?.map(el => <Element key={el.id} todo={el} />)}
      </ul>

    </>
  )
}


