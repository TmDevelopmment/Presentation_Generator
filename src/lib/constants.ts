import { BookTemplate, FolderIcon, HomeIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { stagger, type Transition, type Variants } from "framer-motion";
import { Theme } from "./types";

export const data = {
    user: {
        name: "John Doe",
        email: "",
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    
    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: HomeIcon
        },
        {
            title: "Templates",
            url: "/templates",
            icon: BookTemplate
        },
        {
            title: "Trash",
            url: "/trash",
            icon: TrashIcon
        },
        {
            title: "Settings",
            url: "/settings",
            icon: SettingsIcon
        }
    ]
}

const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
}

export const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, },
    transition: {
        staggerChildren: 0.1,
    },
}

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: {
        type: "spring",
        stiffness: 100,
    },
}

export const themes: Theme[] = [
    {
        name: "Default",
        fontFamily: "Arial, sans-serif",
        fontColor: "#333333",
        backgroundColor: "#ffffff",
        slideBackgroundColor: "#ffffff",
        accentColor: "#007bff",
        navbarColor: "#ffffff",
        sidebarColor: "#f8f9fa",
        type: "light"
    },
    {
        name: "Dark Mode",
        fontFamily: "Arial, sans-serif",
        fontColor: "#ffffff",
        backgroundColor: "#333333",
        slideBackgroundColor: "#333333",
        accentColor: "#007bff",
        navbarColor: "#333333",
        sidebarColor: "#333333",
        type: "dark"
    },
    {
        name: "Aurora Light",
        fontFamily: "Inter, sans-serif",
        fontColor: "#1f2937",
        backgroundColor: "#f8fafc",
        slideBackgroundColor: "#ffffff",
        accentColor: "#2563eb",
        gradientBgColor: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 45%, #ffffff 100%)",
        navbarColor: "#ffffff",
        sidebarColor: "#e2e8f0",
        type: "light",
    },
    {
        name: "Midnight Slate",
        fontFamily: "Inter, sans-serif",
        fontColor: "#e2e8f0",
        backgroundColor: "#0f172a",
        slideBackgroundColor: "#111827",
        accentColor: "#38bdf8",
        gradientBgColor: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #334155 100%)",
        navbarColor: "#111827",
        sidebarColor: "#1e293b",
        type: "dark",
    },
    {
        name: "Sunset Coral",
        fontFamily: "Georgia, serif",
        fontColor: "#3f1d1d",
        backgroundColor: "#fff7f5",
        slideBackgroundColor: "#fff1ee",
        accentColor: "#f97316",
        gradientBgColor: "linear-gradient(135deg, #ffe4d6 0%, #fff7f5 50%, #ffd6cc 100%)",
        navbarColor: "#fff1ee",
        sidebarColor: "#ffd7c9",
        type: "light",
    },
    {
        name: "Forest Night",
        fontFamily: "Inter, sans-serif",
        fontColor: "#ecfdf5",
        backgroundColor: "#052e16",
        slideBackgroundColor: "#064e3b",
        accentColor: "#34d399",
        gradientBgColor: "linear-gradient(135deg, #052e16 0%, #064e3b 52%, #14532d 100%)",
        navbarColor: "#064e3b",
        sidebarColor: "#134e4a",
        type: "dark",
    },
    {
        name: "Paper Ink",
        fontFamily: "Merriweather, serif",
        fontColor: "#111827",
        backgroundColor: "#fafaf9",
        slideBackgroundColor: "#fefefe",
        accentColor: "#7c3aed",
        gradientBgColor: "linear-gradient(135deg, #f5f3ff 0%, #fafaf9 45%, #ede9fe 100%)",
        navbarColor: "#f8fafc",
        sidebarColor: "#e7e5e4",
        type: "light",
    },
]

export const CreatePageCard = [
    {
        title: "Use a",
        highlightedText: "Template",
        description: "Start with a pre-designed template and customize it to your needs.",
        type: "template",
    },
    {
        title: "Generate with",
        highlightedText: "Creative AI",
        description: "Let our AI generate a presentation for you based on your input.",
        type: "creative-ai",
        highlight: true,
    },
    {
        title: "Start from",
        highlightedText: "Scratch",
        description: "Create a presentation from a blank canvas and unleash your creativity.",
        type: "create-scratch",
    }
]