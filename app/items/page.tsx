import Element from '@/components/element'
import { getItems } from '@/lib/items'
import React from 'react'

export default async function Items() {
 const { items = [] } = await getItems()
 return (
  <>
   <ul className='mt-4 flex flex-col gap-1'>
    {items.map(el => <Element key={el.id} todo={el} />)}
   </ul>
  </>
 )
}
