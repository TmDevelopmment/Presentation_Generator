"use client"

import { getProjectById } from '@/actions/project';
import { themes } from '@/lib/constants';
import { useSlideStore } from '@/store/useSlideStore';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './_components/NavBar/Navbar';
import LayoutPreview from './_components/editor-sidebar/leftsidebar/LayoutPreview';
import Editor from './_components/editor/Editor';
import EditorSidebar from './_components/right-sidebar';

type Props = {}

const Page = (props: Props) => {
    
    const params = useParams();
    const { setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const { setProject, currentTheme, setCurrentTheme, setSlides, project,slides } = useSlideStore();
    
    useEffect(() => {
        (async () => {
            try {
                const res = await getProjectById(params.presentationId as string);
                if (res.status !== 200 || !res?.project) {
                    toast.error("Error", {
                        description: res.error || "Failed to load project"
                    })
                    redirect("/dashboard");
                }

                const findTheme = themes.find((theme) => theme.name === res.project.themeName);
                setTheme(findTheme?.type === "dark" ? "dark" : "light");
                setProject(res.project);
                setSlides(JSON.parse(JSON.stringify(res.project.slides)));
            } catch (error) {
                console.error("Error loading project", error);
                toast.error("Error", {
                    description: "Failed to load project"
                })
                redirect("/dashboard");
            } finally {
                setIsLoading(false);
            }
        })()
    }, [params.presentationId])

    if (isLoading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Loader2 className='w-8 h-8animate-spin text-primary' />
            </div>
        )
    }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen flex flex-col">
            <Navbar presentationId={params.presentationId as string}/>
            <div className="flex-1 flex overflow-hidden pt-16"
            style={{
                color: currentTheme.accentColor,
                fontFamily: currentTheme.fontFamily,
                backgroundColor: currentTheme.backgroundColor
            }}>
                <LayoutPreview/>
                <div className="flex-1 ml-64 pr-16">
                    <Editor isEditable={true}/>
                </div>
                <EditorSidebar />
            </div>
        </div>
    </DndProvider>
  )
}

export default Page