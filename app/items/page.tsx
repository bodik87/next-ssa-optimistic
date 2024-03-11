"use client"

import { useStore } from '../store';
import Element from '@/components/element'

export default function Items() {
  const storedItems = useStore((state) => state.storedItems);
  return (
    <ul className='mt-4 flex flex-col gap-1'>
      {storedItems.sort(
        (a, b) => (a.title as any > b.title as any) - (a.title as any < b.title as any))
        .map(el =>
          <Element key={el.id} item={el} />
        )}
    </ul>
  )
}
