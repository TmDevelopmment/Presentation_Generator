import { Delete } from 'lucide-react'
import React from 'react'
import DeleteAllButton from './DeleteAllButton'
import { deleteProject, getDeletedProjects } from '@/actions/project'
import NotFound from '@/components/global/not-found'
import Projects from '@/components/global/projects'


const page = async () => {

    const deleteProjects = await getDeletedProjects();

    if (deleteProjects.status !== 200 || !deleteProjects.data) return <NotFound />

    return (
        <div className="flex flex-col gap-6 relative">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">Trash</h1>
                    <p className="text-base font-normal dark:text-secondary">
                        All your deleted presentations
                    </p>
                </div>
                <DeleteAllButton Projects={deleteProjects.data} />
            </div>
            {deleteProjects.data.length > 0 ? (
                <Projects projects={deleteProjects.data} />
            ) : (
                <NotFound />
            )}
        </div>
    )
}

export default page