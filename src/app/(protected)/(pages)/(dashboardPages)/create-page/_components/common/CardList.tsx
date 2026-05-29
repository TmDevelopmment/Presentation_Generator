import { OutlineCard } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Card from "./Card";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string) => void;
  setSelectedCard: (id: string) => void;
  addMultipleOutlines?: (cards: OutlineCard[]) => void;
};

const CardList = ({ 
  outlines, 
  editingCard, 
  selectedCard, 
  editText,
  addOutline,
  onEditChange,
  onCardSelect,
  onCardDoubleClick,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addMultipleOutlines
 }: Props) => {

  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(index + 1);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !dragOverIndex === null) return;

    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(card => card.id === draggedItem.id);
    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex, 0, removedCard);

    addMultipleOutlines(updatedCards.map((card, index) => ({ ...card, order: index + 1 })));
    setDraggedItem(null);
    setDragOverIndex(null);
  }
  

  return <motion.div
  className="space-y-2 -my-2"
  layout
  onDragOver={(e) => {
    e.preventDefault();
    if (outlines.length ===0 || e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20) {
      e.currentTarget.classList.add("border-b-2", "border-blue-500");
    } {
      onDragOver(e, outlines.length);
    }
  }}
  onDrop={(e) => {
    e.preventDefault();
    onDrop(e);
  }}>
    <AnimatePresence>
      {outlines.map((card, index) => (
        <React.Fragment key={card.id}>
          <Card
            card={card}
            isEditing={editingCard === card.id}
            isSelected={selectedCard === card.id}
            editText={editText}
            onEditChange={onEditChange}
            onEditBlur={() => setEditingCard(null)}
            onEditKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditingCard(null);
              }
            }}
            onCardClick={() => onCardSelect(card.id)}
            onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
            onDeleteClick={() => {
              const updatedCards = outlines.filter((c) => c.id !== card.id);
              addMultipleOutlines(updatedCards.map((c, i) => ({ ...c, order: i + 1 })));
            }}
            dragHandlers={{
              onDragStart: (e) => {
                setDraggedItem(card);
                e.dataTransfer.effectAllowed = "move";
              },
              onDragEnd: () => {
                setDraggedItem(null);
              }
            }}
            onDragOver={(e) => onDragOver(e, index)}
            dragOverStyles={{
              backgroundColor: "lightblue"
            }}
          />
        </React.Fragment>
      ))}
    </AnimatePresence>
  </motion.div>;
};

export default CardList;
