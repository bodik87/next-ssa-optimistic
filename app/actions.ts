"use server";

import { createItem, deleteItem, updateItem } from "@/lib/items";
import { revalidatePath } from "next/cache";

export async function createItemAction(id: string, title: string) {
  try {
    await createItem(id, title);
  } catch (error: any) {
    return { error: error?.message || "Failed to add todo." };
  } finally {
    revalidatePath("/");
  }
}

export async function updateItemAction(id: string, title: string) {
  try {
    await updateItem(id, title);
  } catch (error: any) {
    return { error: error?.message || "Failed to update todo." };
  } finally {
    revalidatePath("/");
  }
}

export async function deleteItemAction(id: string) {
  try {
    await deleteItem(id);
  } catch (error: any) {
    return { error: error?.message || "Failed to update todo." };
  } finally {
    revalidatePath("/");
  }
}
