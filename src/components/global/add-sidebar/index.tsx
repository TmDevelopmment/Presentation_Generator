"use client"

import { Project, User } from "@/generated/prisma/client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavMain from "@/components/global/add-sidebar/nav-main";
import RecentOpen from "@/components/global/add-sidebar/recet-open";
import NavFooter from "@/components/global/add-sidebar/nav-footer";
import { data } from "@/lib/constants";

const AppSidebar = ({ 
    recentProjects, 
    user, 
    ...props 
}: {
    recentProjects: Project[]
} & {
    user: User
} & React.ComponentProps<typeof Sidebar>) => {



    return (
        <Sidebar 
        collapsible="icon" 
        {...props}
        className="m-w-[212px] bg-background-90"
        >
            <SidebarHeader className="pt-6 px-3 pb-0">
                <SidebarMenuButton
                size="lg"
                className="data-[state=open]:text-sidebar-accent-foreground"
                >
                   <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                    <Avatar className="rounded-full">
                        <AvatarImage
                        src={user?.profileImage || undefined}
                        alt={"User Avatar"}
                        />
                        <AvatarFallback className="rounded-lg">
                            VI
                        </AvatarFallback>
                    </Avatar>
                   </div>
                   <span className="truncate text-primary text-3xl font-semibold">Vivid</span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="px-3 mt-10 gap-y-6">
                <NavMain items={data.navMain} />
                <RecentOpen recentProjects={recentProjects} />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter prismaUser={user}/>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;