import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/auth";

export default async function Page() {
 const session = await getSession();
 return (
  <>
   <form
    action={async (formData) => {
     "use server";
     await login(formData);
     redirect("/");
    }}
   >
    <input type="text" name="login" placeholder="Login" />
    <button type="submit">Login</button>
   </form>

   <form
    action={async () => {
     "use server";
     await logout();
     redirect("/");
    }}
   >
    <button type="submit">Logout</button>
   </form>

   <pre>{JSON.stringify(session, null, 2)}</pre>
  </>
 );
}