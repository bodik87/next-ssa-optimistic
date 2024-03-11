import { getItems } from '@/lib/items';
import Element from '@/components/element'

export default async function Items() {
  const { items = [] } = await getItems()
  return (
    <ul className='mt-4 flex flex-col gap-1'>
      {items.sort(
        (a, b) => (a.title as any > b.title as any) - (a.title as any < b.title as any))
        .map(el =>
          <Element key={el.id} item={el} />
        )}
    </ul>
  )
}
