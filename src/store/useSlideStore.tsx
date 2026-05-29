import { Project } from "@/generated/prisma/client";
import { Slide } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
    slides: Slide[]
    project: Project | null
    setSlides: (slides: Slide[]) => void
    setProject: (project: Project | null) => void
}

export const useSlideStore = create(
    persist<SlideState>((set) => ({
        slides: [],
        setSlides: (slides: Slide[]) => set({ slides }),
        project: null,
        setProject: (project: Project | null) => set({ project }),
    }), {
        name: "slide-storage",
    })
)