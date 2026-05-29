"use client"

import { motion, AnimatePresence } from 'framer-motion';
import usePromptStore from '@/store/usePromptStore';
import CreatePage from './CreatePage/CreatePage';
import { useRouter } from 'next/navigation';
import CreateAiPage from './CreateAiPage/CreateAiPage';
import CreateScratchPage from './CreateScratchPage/CreateScratchPage';

type Props = {}

const RenderPage = (props: Props) => {

    const router = useRouter();

    const { page, setPage } = usePromptStore();

    const handleSelectOption = (option: string) => {
        if (option === "template") {
            router.push("/templates");
        } else if (option === "create-scratch") {
            setPage("create-scratch");
        } else if (option === "creative-ai") {
            setPage("creative-ai");
        }
    }

    const renderStep = () => {
        switch (page) {
            case "create":
                return <CreatePage onSelectOpetion={handleSelectOption} />
            case "creative-ai":
                return <CreateAiPage onBack={() => setPage("create")} />
            case "create-scratch":
                return <CreateScratchPage onBack={() => setPage("create")} />
            default:
                return null;
        }
    }

  return (
    <AnimatePresence mode="wait">
        <motion.div key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}>
            {renderStep()}
        </motion.div>

    </AnimatePresence>
  )
}

export default RenderPage