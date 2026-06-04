"use client"

import { Heading1 } from '@/components/global/editor/Headings'
import { ContentItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'
import { DropZone } from './Editor'

type MasterRecursiveComponent = {
    content: ContentItem
    onContentChange: (
        contentId: string,
        newContent: string | string[] | string[][]
    ) => void
    isPreview?: boolean
    isEditable?: boolean
    slideId: string
    index?: number
}

const ContentRender: React.FC<MasterRecursiveComponent> = React.memo(({ content, onContentChange, slideId, index, isPreview, isEditable }) => {

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
    }, [content.id, onContentChange])

    const commonProps = {
        placeholder: content.placeholder,
        value: content.content as string,
        onChange: handleChange,
        isPreview: isPreview,
    }

    const animationProps = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    }

    switch (content.type) {
        case 'heading1':
            return (<motion.div className="w-full h-full">
                <Heading1 {...commonProps} />
            </motion.div>)
        case 'column':
            if (Array.isArray(content.content)) {
                return (
                    <motion.div
                        {...animationProps}
                        className={cn("w-full h-full flex flex-col", content.className)}
                    >
                        {content.content.length > 0 ?
                            (content.content as ContentItem[]).map(subItem: ContentItem, subIndex: number) => (
                        <React.Fragment 
                        key={subItem.id || `item-${subIndex}`}>
                            {!isPreview && !subItem.restrictToDrop && subIndex === 0 && isEditable && <DropZone/>}
                        </React.Fragment>
                            )) : ""}
                    </motion.div>
                )
            }

        default:
            return <h1>Nothing</h1>
    }
})

ContentRender.displayName = "ContentRender";

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponent> = React.memo(
    ({
        content,
        onContentChange,
        slideId,
        index,
        isPreview = false,
        isEditable = true
    }) => {
        if (isPreview) {
            return (
                <ContentRender
                    content={content}
                    onContentChange={onContentChange}
                    slideId={slideId}
                    index={index}
                    isPreview={isPreview}
                    isEditable={isEditable}
                />
            )
            return (
                <React.Fragment>
                    <ContentRender
                        content={content}
                        onContentChange={onContentChange}
                        slideId={slideId}
                        index={index}
                        isPreview={isPreview}
                        isEditable={isEditable}
                    />
                </React.Fragment>
            )

        }
    }
)

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";

export default MasterRecursiveComponent

