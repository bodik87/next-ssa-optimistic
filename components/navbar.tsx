'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <>
      <Link href={`/auth`} className='link bg-black text-white mb-2'>
        Auth
      </Link>

      {pathname !== "/" &&
        <Link href={`/`} className='link bg-black text-white mb-2'>
          Back
        </Link>
      }
    </>
  )
}
