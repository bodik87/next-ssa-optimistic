import Link from 'next/link'
import BackLink from './back-link'

export default function Navbar() {
  return (
    <>
      <BackLink />

      <div className='flex gap-4'>
        <Link href={`/auth`} className='link w-full border border-black mb-2'>
          Auth
        </Link>

        <Link href={"/items"}
          className='mb-2 w-full link text-center bg-gray-300'>
          All items
        </Link>
      </div>
    </>
  )
}
