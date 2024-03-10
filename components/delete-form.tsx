import { deleteItemAction } from "@/app/actions";
import Button from "./button";

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
      <Button label="Delete" color="delete" />
    </form>
  );
}
