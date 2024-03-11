"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BackLink() {
 const pathname = usePathname()
 return (
  <>
   {pathname !== "/" &&
    <Link href={`/`} className='link bg-black text-white mb-2'>
     Back
    </Link>
   }
  </>
 )
}
