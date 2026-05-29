"use client";

import { Project } from "@/generated/prisma/client";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/constants";
import ProjectsCard from "../project-card";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Map through projects and display them */}
      {projects?.map((project, index) => (
        <ProjectsCard
          key={index}
          projectId={project.id}
          title={project.title}
          createdAt={project.createdAt.toString()}
          isDeleted={project.isDeleted}
          slideData={project.slides}
          themeName={project.themeName}
          // src={
          //     project.thumbnail ||
          //     "https://plus.unsplash.com/premium_photo-1661766169984-9b1c8e5a0c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          // }
        />
      ))}
    </motion.div>
  );
};

export default Projects;
