"use client";

import { useFormStatus } from "react-dom";
import { deleteItemAction } from "@/app/actions";

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' disabled={pending}>
      Delete
    </button>
  )
}

async function action(data: FormData) {
  const id = data.get('id')
  if (typeof id !== 'string' || !id) return

  const result = await deleteItemAction(id)

  if (result?.error) {
    console.error(result.error);

  }
}

export function DeleteForm({ id }: { id: string }) {

  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
}
