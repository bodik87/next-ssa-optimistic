import { getItems } from "@/lib/items";
import Elements from "@/components/elements";

export default async function Home() {
  const { items = [] } = await getItems()
  return (
    <main className="p-5">
      <Elements items={items} />
    </main>
  );
}
