import { deleteAllProjects } from '@/actions/project'
import AlertDialogBox from '@/components/global/alert-dialog'
import { Button } from '@/components/ui/button'
import { Project } from '@/generated/prisma/client'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    Projects: Project[]
}

const DeleteAllButton = ({Projects}: Props) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDeleteAllProjects = async () => {
        setLoading(true);

        if (Projects.length === 0 || !Projects) {
            setLoading(false);
            toast.error("Oppse!", { description: "No projects found to delete" });
            setOpen(false);
            return;
        }

        try {
            const res = await deleteAllProjects(Projects.map((project) => project.id));

            if (res.status !== 200) {
                throw new Error('Failed to delete projects');
            }

            toast.success("Success!", { description: res.message });
            router.refresh();
            setOpen(false);
        } catch (error) {
            toast.error("Oppse!", { description: "Something went wrong.Please contact support" });
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

  return (
    <AlertDialogBox
        description="This action cannot be undone.This will permanently delete all your projects and remove your data from our servers."
        className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600
        dark:hover:bg-red-700"
        onClick={handleDeleteAllProjects}
        loading={loading}
        handleOpen={() => setOpen(!open)}
        open={open}
        >
            <Button
            size={'lg'}
            className="bg-background-80 rounded-lg dark:hover:bg-background-90 text-pretty font-semibold hover:text-white">
                <Trash className='mr-2 h-4 w-4'/>
                Delete All
            </Button>
    </AlertDialogBox>
  )
}
