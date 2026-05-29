import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { containerVariants, itemVariants } from '@/lib/constants';
import useCreativeAiStore from '@/store/useCreativeAiStore';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2, RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import CardList from '../common/CardList';

type Props = {
    onBack: () => void;
}

const CreateAiPage = ({ onBack }: Props) => {

    const router = useRouter();
    const { currentAiPrompt, setCurrentAiPrompt, outlines, resetOutlines } = useCreativeAiStore();
    const [numberOfCards, setNumberOfCards] = useState(0);
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        onBack();
    }

    const resetCards = () => {
        setEditingCard(null);
        setSelectedCard(null);
        setEditText("");
        setCurrentAiPrompt("");
        setNumberOfCards(0);
        resetOutlines();
    }

    return (

        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Button
                onClick={handleBack}
                variant="outline"
                className="mb-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <motion.div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-primary">Generate with
                    <span className="text-vivid ml-2">Creative AI</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                    Generate a presentation based on your prompt.
                </p>
            </motion.div>
            <motion.div
                className="bg-primary/10 p-4 rounded-xl"
                variants={itemVariants}>
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                        placeholder='Enter Prompt and add to the cards'
                        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent grow"
                        required
                        value={currentAiPrompt || ""}
                        onChange={(e) => setCurrentAiPrompt(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                        <Select
                            value={numberOfCards.toString()}
                            onValueChange={(value) => setNumberOfCards(parseInt(value))}
                        >
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                <SelectValue placeholder="Select number of cards" />
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                                {outlines.length === 0 ? (
                                    <SelectItem
                                        value="0"
                                        className="font-semibold"
                                    >
                                        No Cards
                                    </SelectItem>
                                ) : (
                                    Array.from({
                                        length: outlines.length
                                    },
                                        (_, i) => i + 1).map((num) => (
                                            <SelectItem
                                                key={num}
                                                value={num.toString()}
                                                className="font-semibold"
                                            >
                                                {num} {num === 1 ? "Card" : "Cards"}
                                            </SelectItem>
                                        )
                                        )
                                )}
                            </SelectContent>
                        </Select>

                        <Button
                            onClick={resetCards}
                            variant="destructive"
                            size="icon"
                            aria-label="Reset cards"
                        >
                            {loading ? (
                                <RotateCw className="animate-spin" />
                            ) : (
                                <RotateCw  />
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
            <div className="w-full flex justify-center items-center">
                <Button
                className="font-medium text-lg flex gap-2 items-center py-4 px-6"
                // onClick={generateOutlines}
                disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                        <Loader2 className="animate-spin mr-2" />
                        Generating...
                        </>
                    ) : (
                        "Generate Outlines"
                    )}
                </Button>
            </div>

            <CardList />
        </motion.div>
    )
}

export default CreateAiPage