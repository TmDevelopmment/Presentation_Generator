import { Project } from "@/generated/prisma/client";
import { ContentItem, Slide, Theme } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
    slides: Slide[]
    project: Project | null
    setSlides: (slides: Slide[]) => void
    setProject: (project: Project) => void
    currentSlide: number
    currentTheme: Theme
    removeSlide: (id: string) => void
    setCurrentTheme: (theme: Theme) => void
    getOrderdSlides: () => Slide[]
    reorderSlides: (fromIndex: number, toIndex: number) => void
    addSlideAtIndex: (slide: Slide, index: number) => void
    setCurrentSlide: (index: number) => void
    updateContentItem: (
        slideId: string,
        contentId: string,
        newContent: string | string[] | string[][]
    ) => void
    addComponentInSlide: (
        slideId: string,
        item: ContentItem,
        parentId: string,
        index: number
    ) => void
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
    persist<SlideState>((set, get) => ({
        slides: [],
        setSlides: (slides: Slide[]) => set({ slides }),
        project: null,
        setProject: (project: Project) => set({ project }),
        currentTheme: defaultTheme,
        setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
        getOrderdSlides: () => {
            const state = get();
            return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
        },
        reorderSlides: (fromIndex: number, toIndex: number) => {
            set((state) => {
                const newSlides = [...state.slides];
                const [removed] = newSlides.splice(fromIndex, 1);
                newSlides.splice(toIndex, 0, removed);
                return {
                    slides: newSlides.map((slide, index) => ({
                        ...slide,
                        slideOrder: index,
                    }))
                };
            });
        },
        currentSlide: 0,
        removeSlide: (id: string) => {
            set((state) => {
                const newSlides = state.slides.filter((slide) => slide.id !== id);
                return { slides: newSlides };
            });
        },
        addSlideAtIndex: (slide, index) => {
            set((state) => {
                const newSlides = [...state.slides];
                newSlides.splice(index, 0, { ...slide, id: uuidv4() });
                newSlides.forEach((slide, i) => {
                    slide.slideOrder = i;
                });
                return { slides: newSlides, currentSlide: index };
            });
        },
        setCurrentSlide: (index: number) => set({ currentSlide: index }),
        updateContentItem: (slideId, contentId, newContent) => {
            set((state) => {
                const updateContentRecursively = (item: ContentItem): ContentItem => {
                    if (item.id === contentId) {
                        return { ...item, content: newContent };
                    }
                    if (
                        Array.isArray(item.content) &&
                        item.content.every((i) => typeof i !== 'string')
                    ) {
                        return {
                            ...item,
                            content: item.content.map((subItem) => {
                                if (typeof subItem !== 'string') {
                                    return updateContentRecursively(subItem as ContentItem);
                                }
                                return subItem;
                            }) as ContentItem[],
                        };
                    }
                    return item;
                };
                return {
                    slides: state.slides.map((slide) =>
                        slide.id === slideId
                            ? {
                                ...slide,
                                content: updateContentRecursively(slide.content)
                            }
                            : slide
                    ),
                };
            });
        },
        addComponentInSlide: (slideId, item, parentId, index) => {
            set((state) => {
                const updatedSlides = state.slides.map((slide) => {
                    const updateContentRecursively = (
                        content: ContentItem
                    ): ContentItem => {
                        if (content.id === parentId && Array.isArray(content.content)) {
                            const updatedContent = [...content.content];
                            updatedContent.splice(index, 0, item);

                            return { ...content, content: updatedContent as unknown as string[] };
                        }
                        return content
                    }
                    return {
                        ...slide,
                        content: updateContentRecursively(slide.content)
                    }
                });
                return { slides: updatedSlides };
            })
        }

    }), {
        name: "slide-storage",
    })
)