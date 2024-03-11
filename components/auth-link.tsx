import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function AuthLink() {
 const session = await getSession();
 return (
  <>
   {!session && (
    <Link href={`/auth`} className='link bg-black text-white mb-2'>
     Auth
    </Link>
   )}
  </>
 )
}
