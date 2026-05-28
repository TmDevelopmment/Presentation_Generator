import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";

export default async function DashboardPage() {

    const allProjects = await getAllProjects();

    return (
        <div className="max-w-7xl flex flex-col gap-6 relative p-4">
            <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">Projects</h1>
                    <p className="text-base font-normal dark:text-secondary">Manage your projects and create new ones.</p>
                </div>
            </div>

            {/* Projects */}
            {allProjects.projects && allProjects.projects.length > 0 ? (
                <Projects projects={allProjects.projects}/>
            ) : (
                <NotFound />
            )}
        </div>
    );
}