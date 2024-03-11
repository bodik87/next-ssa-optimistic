import { Item } from "@prisma/client";
import { create } from "zustand";

type Store = {
  storedItems: Item[];
  addItemsToStore: (itemsArray: Item[]) => void;
};

export const useStore = create<Store>()((set) => ({
  storedItems: [],
  addItemsToStore: (itemsArray) => set(() => ({ storedItems: itemsArray })),
}));
