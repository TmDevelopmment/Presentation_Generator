import { Project } from "@/generated/prisma/client";
import { Slide, Theme } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
    slides: Slide[]
    project: Project | null
    setSlides: (slides: Slide[]) => void
    setProject: (project: Project) => void
    currentTheme: Theme
    setCurrentTheme: (theme: Theme) => void
}

const defaultTheme: Theme = {
    name: "Default",
    fontFamily: "Arial, sans-serif",
    fontColor: "#333333",
    backgroundColor: "#ffffff",
    slideBackgroundColor: "#ffffff",
    accentColor: "#007bff",
    navbarColor: "#ffffff",
    sidebarColor: "#f8f9fa",
    type: "light"
}

export const useSlideStore = create(
    persist<SlideState>((set) => ({
        slides: [],
        setSlides: (slides: Slide[]) => set({ slides }),
        project: null,
        setProject: (project: Project) => set({ project }),
        currentTheme: defaultTheme,
        setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
    }), {
        name: "slide-storage",
    })
)