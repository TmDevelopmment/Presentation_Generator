import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Project } from "@/generated/prisma/browser";
import { Button } from "@base-ui/react";
import { JsonValue } from "@prisma/client/runtime/client";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects = [] }: Props) => {

    const router = useRouter();
    const { setSlides } = useSlideStore();

    const handleClick = (projectId: string, slides: JsonValue) => {
        if (!projectId || !slides) {
            toast.error('Project not found',
                {
                    description: "The selected project could not be found or has no slides.",
                    style: { backgroundColor: "#f87171", color: "#fff" },
                }
            );
            return;
        }

        setSlides(JSON.parse(JSON.stringify(slides)))
        router.push(`/presentation/${projectId}`);
    }

  return (
    recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Open</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0 ? (
          recentProjects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton
                tooltip={project.title}
                className="hover:bg-primary-80"
              >

                <Button
                  onClick={() => handleClick(project.id, project.slides)}
                  className="w-full justify-start"
                >
                    <span className="truncate">{project.title}</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              <span className="truncate">No recent projects</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
    ) : (
        ""
    )
  );
};

export default RecentOpen;
