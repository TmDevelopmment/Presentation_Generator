"use client"
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'

interface ParagraphProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string
    styles?: React.CSSProperties
    isPreview?: boolean
}


const Paragraph = React.forwardRef<HTMLTextAreaElement, ParagraphProps>(
    ({ className, styles, isPreview = false, ...props }, ref) => {
        const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
        useEffect(() => {
            const textArea = textAreaRef.current;
            if (textArea && !isPreview) {
                const adjustHeight = () => {
                    textArea.style.height = '0';
                    textArea.style.height = `${textArea.scrollHeight}px`;
                }
                textArea.addEventListener('input', adjustHeight);
                adjustHeight();
                return () => {
                    textArea.removeEventListener('input', adjustHeight);
                }
            }
        }, [isPreview])

        return (
            <textarea
                className={cn(
                    `w-full bg-transparent font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight`,
                    `${isPreview ? 'text-[0.5rem]' : 'text-lg'}`,
                    className
                )}
                style={{
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    boxSizing: 'border-box',
                    lineHeight: '1.2rem',
                    minHeight: '1.2rem',
                    ...styles
                }}
                ref={(el) => {
                    textAreaRef.current as HTMLTextAreaElement | null= el;
                    if (typeof ref === 'function') {
                        ref(el);
                    } else if (ref) {
                        ref.current = el;
                    }
                }}
                readOnly={isPreview}
                {...props}
            ></textarea>
        )
    }
)

Paragraph.displayName = 'Paragraph'

export default Paragraph