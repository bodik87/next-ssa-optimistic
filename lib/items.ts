import prisma from "@/lib/prisma";

export async function getItems() {
  try {
    const items = await prisma.item.findMany();
    return { items };
  } catch (error) {
    return { error };
  }
}

export async function createItem(id: string, title: string) {
  try {
    const item = await prisma.item.create({ data: { id, title } });
    return { item };
  } catch (error) {
    return { error };
  }
}

export async function getItemById(id: string) {
  try {
    const item = await prisma.item.findUnique({ where: { id } });
    return { item };
  } catch (error) {
    return { error };
  }
}

export async function updateItem(id: string, title: string) {
  try {
    const item = await prisma.item.update({
      where: { id },
      data: { title },
    });
    return { item };
  } catch (error) {
    return { error };
  }
}

export async function deleteItem(id: string) {
  try {
    await prisma.item.delete({
      where: { id },
    });
  } catch (error) {
    return { error };
  }
}
