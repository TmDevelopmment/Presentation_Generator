import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/add-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAllProjects, getRecentProjects } from "@/actions/project";
import UpperInfoBar from "@/components/global/upper-info-bar";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkUser = await onAuthenticateUser();

  if (!checkUser.user) {
    redirect("/sign-in");
  }

  const allProjects = await getAllProjects();
  const recentProjects = await getRecentProjects();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          user={checkUser.user}
          recentProjects={recentProjects.projects || []}
          />
          <SidebarInset>
            <UpperInfoBar user={checkUser.user}/>
            {children}
          </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
