import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/auth";

export default async function Page() {
 const session = await getSession();
 return (
  <>
   {!session &&
    <form
     action={async (formData) => {
      "use server";
      await login(formData);
      // redirect("/");
     }}
    >
     <input type="text" name="login" placeholder="Login" />
     <button type="submit" className="mt-2 w-full bg-green-600 text-white">Login</button>
    </form>
   }

   {session &&
    <form
     action={async () => {
      "use server";
      await logout();
      redirect("/");
     }}
    >
     <button type="submit" className="mt-2 bg-red-600 text-white">Logout</button>
    </form>
   }

   <pre className="mt-2">{JSON.stringify(session, null, 2)}</pre>
  </>
 );
}