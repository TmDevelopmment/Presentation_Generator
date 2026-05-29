import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type OutlineStore = {
    outlines: OutlineCard[];
    resetOutlines: () => void;
    addOutline: (card: OutlineCard) => void;
    addMultipleOutlines: (cards: OutlineCard[]) => void;
};

const useScratchStore = create<OutlineStore>()(
    devtools(
        persist(
            (set) => ({
                outlines: [],
                resetOutlines: () => set({ outlines: [] }),
                addOutline: (outlines: OutlineCard) =>
                    set((state) => ({ outlines: [...state.outlines, outlines] })),
                addMultipleOutlines: (outlines: OutlineCard[]) =>
                    set((state) => ({ outlines: [...outlines] }))
            }),
            {
                name: "scratch",
            },
        ),
    ),
);

export default useScratchStore;
