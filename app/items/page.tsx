import Element from '@/components/element'
import { getItems } from '@/lib/items'
import { Suspense } from 'react'

export default async function Items() {
  const { items = [] } = await getItems()

  return (
    <Suspense fallback={<p className='mt-4'>Loading...</p>}>
      <ul className='mt-4 flex flex-col gap-1'>
        {items.sort(
          (a, b) => (a.title as any > b.title as any) - (a.title as any < b.title as any))
          .map(el =>
            <Element key={el.id} item={el} />
          )}
      </ul>
    </Suspense>
  )
}
