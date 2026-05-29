import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CreativeAiStore = {
    outlines: OutlineCard[] | [];
    currentAiPrompt: string;
    setCurrentAiPrompt: (prompt: string) => void;
    addMultipleOutlines: (outlines: OutlineCard[]) => void;
    addOutline: (outline: OutlineCard) => void;
    resetOutlines: () => void;
}

const useCreativeAiStore = create<CreativeAiStore>()(
    persist((set) => ({
        outlines: [],
        currentAiPrompt: "",
        setCurrentAiPrompt: (prompt: string) => {
            set({ currentAiPrompt: prompt });
        },
        addMultipleOutlines: (outlines: OutlineCard[]) => {
            set((state) => ({
                outlines: [...state.outlines, ...outlines],
            }));
        },
        addOutline: (outline: OutlineCard) => {
            set((state) => ({
                outlines: [...state.outlines, outline],
            }));
        },
        resetOutlines: () => {
            set({ outlines: [] });
        }
    }),
        {
            name: "creative-ai",
        }
    )
);

export default useCreativeAiStore