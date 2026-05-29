import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import useCreativeAiStore from "@/store/useCreativeAiStore";
import usePromptStore from "@/store/usePromptStore";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "sonner";

type Props = {};

const RecentPrompts = (props: Props) => {
    const { prompts, setPage } = usePromptStore();
    const { addMulipleOutlines, setCurrentAiPrompt } = useCreativeAiStore();


    const handleEdit = (id: string) => {
        const prompt = prompts.find((p) => p?.id === id);
        if (prompt) {
            setPage("creative-ai");
            addMulipleOutlines(prompt?.outlines);
            setCurrentAiPrompt(prompt?.title);
        }

        toast.error("Error", {
            description: "Prompt not found",
        })
    }

    return (
        <motion.div variants={containerVariants} className="space-y-4 !mt-20">
            <motion.h2
                variants={itemVariants}
                className="text-2xl font-semibold text-center"
            >
                Your Recent Prompts
            </motion.h2>
            <motion.div
                variants={containerVariants}
                className="space-y-2 w-full lg:max-w-[80%] mx-auto"
            >

                {prompts.map((prompt) => (
                    <motion.div
                        key={prompt.id}
                        variants={itemVariants}>
                        <Card className="p-4 flex items-start justify-between hover:bg-accent/50 transition-colors duration-300">
                            <div className="max-w-[70%]">
                                <h3 className="text-lg font-medium">
                                    {prompt?.title}
                                </h3>
                                <p className="font-semibold text-sm text-muted-foreground">
                                    {timeAgo(prompt.createdAt)}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-vivid">Creative AI</span>

                                <Button
                                    variant="default"
                                    size="sm"
                                    className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-100 text-primary"
                                    onClick={() => handleEdit(prompt?.id)}
                                >
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default RecentPrompts;
