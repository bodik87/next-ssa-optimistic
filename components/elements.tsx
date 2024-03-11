'use client'

import { useOptimistic, useRef, useState } from 'react'
import type { Item } from '@prisma/client'
import { createItemAction } from '@/app/actions'
import Button from '@/components/button'
import Link from 'next/link'
import { useStore } from '@/app/store'

export default function Elements({ items }: { items: Item[] }) {

  const addItemsToStore = useStore((state) => state.addItemsToStore);

  const formRef = useRef<HTMLFormElement>(null)
  const queryRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState('')
  const [visibleCreateForm, setVisibleCreateForm] = useState(false)

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem: Item) => {
      return [...state, newItem]
    }
  )

  async function action(data: FormData) {
    const id = crypto.randomUUID()
    const title = data.get('title') as string
    const rack = data.get('rack') as string
    const place = data.get('place') as string
    const info = data.get('info') as string
    if (typeof title !== 'string' || !title) return

    const newItem = { id, title, rack, place, info }

    formRef.current?.reset()
    setVisibleCreateForm(false)
    addOptimisticItem(newItem)

    const result = await createItemAction(id, title, rack, place, info)

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
            .includes(query.toLowerCase().replace(/\s+/g, "")) || el?.info
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
      );


  return (
    <>
      <Link href={"/items"}
        onClick={() => addItemsToStore(items)}
        className='mb-2 w-full link text-center bg-gray-300'>
        All items
      </Link>

      {visibleCreateForm &&
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
              placeholder='Title'
              required
            />
            <div className='flex gap-3'>
              <input
                type='text'
                autoComplete='off'
                name='rack'
                placeholder='Rack'
              />
              <input
                type='text'
                autoComplete='off'
                name='place'
                placeholder='Place'
              />
            </div>
            <input
              type='text'
              autoComplete='off'
              name='info'
              placeholder='Info'
            />
            <Button label='Create' color='create' width='full' />

          </form>
          <button
            type='button'
            className='mt-2 w-full'
            onClick={() => setVisibleCreateForm(false)}>
            Cancel
          </button>
        </>
      }

      {!visibleCreateForm &&
        <button
          type='button'
          className='mt-2 w-full bg-green-600 text-white'
          onClick={() => setVisibleCreateForm(true)}>
          Create item
        </button>
      }

      {optimisticItems.length > 0 && (
        <div className='mt-8 relative'>
          <input
            ref={queryRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            type='search'
            autoComplete='off'
            name='query'
            placeholder='Search'
            className='border-yellow-500' />

          {query && <div onClick={handleClick} className='cursor-pointer p-3 absolute right-px top-1/2 -translate-y-1/2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>}

        </div>
      )}

      {query.length > 1 && filteredItems.length > 0 &&
        <div className='mt-2 flex flex-col gap-2 h-36 overflow-y-auto'>
          {filteredItems?.map(
            el =>
              <div key={el.id} className='p-2 flex flex-col border even:bg-gray-100 rounded-md'>
                <div className='flex justify-between'>
                  <span className='font-semibold'>{el.title}</span>
                  {el.rack && el.place && <span>{el.rack} / {el.place}</span>}
                </div>

                {el.info && <small>{el.info}</small>}
              </div>
          )}
        </div >}
    </>
  )
}


