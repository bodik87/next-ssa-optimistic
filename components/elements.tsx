'use client'

import { useOptimistic, useRef, useState } from 'react'
import type { Item } from '@prisma/client'
import { createItemAction } from '@/app/actions'
import Element from '@/components/element'
import Button from '@/components/button'

export default function Elements({ items }: { items: Item[] }) {
  const formRef = useRef<HTMLFormElement>(null)
  const queryRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState('')

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem: Item) => {
      return [...state, newItem]
    }
  )

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

  const handleClick = () => {
    setQuery("")
    queryRef.current?.focus()
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
        className='w-full flex flex-col gap-3'
      >
        <input
          type='text'
          autoComplete='off'
          name='title'
          placeholder='Add a new item'
        />
        <Button label='Create' color='create' />
      </form>

      {optimisticItems.length > 0 && (
        <div className='mt-8 relative'>
          <input
            ref={queryRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            type='search'
            autoComplete='off'
            name='query'
            placeholder='Search' />

          {query && <div onClick={handleClick} className='cursor-pointer p-3 absolute right-px top-1/2 -translate-y-1/2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>}

        </div>
      )}

      {query.length > 1 && filteredItems.length > 0 &&
        <div className='mt-2 flex flex-col gap-2'>
          {filteredItems?.map(
            el =>
              <div className='p-2 border even:bg-gray-100 rounded-md' key={el.id}>{el.title}</div>
          )}
        </div>}

      <ul className='mt-4 flex flex-col gap-1'>
        {optimisticItems?.map(el => <Element key={el.id} todo={el} />)}
      </ul>

    </>
  )
}


