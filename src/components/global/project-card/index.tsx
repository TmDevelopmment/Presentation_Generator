"use client";


import { itemVariants, themes } from "@/lib/constants";
import { JsonValue } from "@prisma/client/runtime/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Slide } from "@/lib/types";
import ThumnailPreview from "./thumnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import { deleteProject, recoverProject } from "@/actions/project";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted: boolean;
  slideData: JsonValue;
  themeName?: string;
};

const ProjectsCard = ({
  projectId,
  title,
  createdAt,
  isDeleted,
  slideData,
  themeName,
}: Props) => {

  const { setSlides } = useSlideStore();
  const router = useRouter();

  const handleNavigation = () => {
    const setSlides = JSON.parse(JSON.stringify(slideData));
    setSlides(setSlides);
    router.push(`/presentation/${projectId}`);
  }

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Oppse!", { description: "Something went wrong,Project not found" });
      return;
    }

    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200 ) {
        throw new Error('Failed to recover project')
      }
      setOpen(false)
      router.refresh();
      toast("Success", { description: "Project Recovered Successfully" });
    } catch (error) {
      toast("Oppse!", { description: "Something went wrong.Please contact support" });
    }
  }

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Oppse!", { description: "Something went wrong,Project not found" });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200 ) {
        throw new Error('Failed to delete project')
      }
      setOpen(false)
      router.refresh();
      toast("Success", { description: "Project Deleted Successfully" });
    } catch (error) {
      toast("Oppse!", { description: "Something went wrong.Please contact support" });
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${isDeleted && "hover:bg-muted/50"} `}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer">
        {/* <ThumnailPreview 
        theme={theme}
        // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        /> */}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}Test
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {timeAgo(createdAt)}
            </p>
            {isDeleted ? (
              <AlertDialogBox
                className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                description="Are you sure you want to delete this project?"
                loading={loading}
                onClick={handleRecover}
                open={open}
                handleOpen={() => setOpen(!open)}
              >
                <Button 
                size="sm"
                variant="ghost"
                className="bg-background-80 dark:hover:bg-background-90"
                disabled={loading}>
                  {loading ? (
                    <>
                    <Loader2 className="animate-spin"/>
                    Loading...
                    </>
                  ) : (
                    "Recover"
                  )}
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
              description="This will delete your project and send to trash"
              className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600/80 dark:hover:bg-red-700"
              onClick={handleDelete}
              loading={loading}
              open={open}
              handleOpen={() => setOpen(!open)}
              >
                <Button
                size="sm"
                variant="ghost"
                className="bg-background-80 dark:hover:bg-background-90"
                disabled={loading}
                >
                  Delete
                </Button>

              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsCard;
