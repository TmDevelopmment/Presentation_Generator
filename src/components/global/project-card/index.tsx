"use client";

import { Project } from "@/generated/prisma/client";
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

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  src: string;
  isDeleted: boolean;
  slideData: JsonValue;
  themeName?: string;
};

const ProjectsCard = ({
  projectId,
  title,
  createdAt,
  src,
  isDeleted,
  slideData,
  themeName,
}: Props) => {
  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const slides = Array.isArray(slideData) ? (slideData as unknown as Slide[]) : [];
  const firstSlide = slides[0];

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error", { description: "Project Not Found" });
      return;
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${isDeleted && "hover:bg-muted/50"} `}
    >
      <div className="relative aspect-16/10 overflow-hidden rounded-lg cursor-pointer">
        {firstSlide ? <ThumnailPreview slide={firstSlide} theme={theme} /> : null}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
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
              ""
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsCard;
