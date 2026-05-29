import { Button } from '@/components/ui/button';
import { containerVariants, CreatePageCard, itemVariants } from '@/lib/constants';
import { motion } from 'framer-motion';
import React from 'react'
import RecentPrompts from '../GenerateAI/RecentPrompts';
import usePromptStore from '@/store/usePromptStore';

type Props = {
  onSelectOpetion: (option: string) => void;
}

const CreatePage = ({ onSelectOpetion }: Props) => {

  const { prompts, setPage } = usePromptStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      <motion.div
        variants={itemVariants}
        className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          How would you like to get started?
        </h1>
        <p className="text-black dark:text-white text-sm font-medium">
          Choose an option below to create a new presentation.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-4">
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`${option.highlight ? "bg-vivid-gradient" : "hover:bg-vivid-gradient border"}
          rounded-xl p-px transition-all duration-300 ease-in-out`}
          >
            <motion.div
              className="w-full p-4 flex flex-col gap-y-6 items-center bg-white dark:bg-black rounded-xl"
              whileHover={{
                transition: { duration: 0.1 },
              }}>
              <div className="flex flex-col items-start w-full gap-y-3">
                <div className="">
                  <p className="text-primary text-lg font-semibold">{option.title}</p>
                  <p className={`${option.highlight ? "text-vivid" : "text-primary"} text-4xl font-bold`}>{option.highlightedText}</p>
                </div>
                <p className="text-black dark:text-white text-xs font-medium">
                  {option.description}
                </p>
              </div>
              <motion.div
                className="self-end"
                whileHover={{
                  scale: 1.06
                }}

                whileTap={{
                  scale: 0.95
                }}>
                <Button
                variant={option.highlight ? 'default' : 'outline'}
                className="w-fit rounded-xl font-bold"
                size="sm"
                onClick={() => onSelectOpetion(option.type)}>
                  {option.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  )
}

export default CreatePage