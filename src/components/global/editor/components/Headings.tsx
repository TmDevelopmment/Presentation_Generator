"use client"

import { forwardRef, useEffect, useRef } from "react"

interface HeadingProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string
    styles?: React.CSSProperties
    isPreview?: boolean
}

const creatHeading = (displayName: string, defaultClassName: string) => {
    const Heading = forwardRef<HTMLTextAreaElement, HeadingProps>(
        ({ children, styles, isPreview = false, ...props }, ref) => {

            const textAreaRef = useRef<HTMLTextAreaElement>(null);
            useEffect(() => {
                const textArea = textAreaRef.current
                if (textArea && !isPreview) {
                    const adjustHeight = () => {
                        textArea.style.height = "0";
                        textArea.style.height = textArea.scrollHeight + "px";
                    }
                    textArea.addEventListener("input", adjustHeight);
                    adjustHeight();
                    return () => {
                        textArea.removeEventListener("input", adjustHeight);
                    }
                }
            }, [isPreview])

            const previewClassName = isPreview ? 'text-xs' : '';

            return (
                <textarea
                className={cn(
                    `w-full bg-transparent ${defaultClassName} ${previewClassName} font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight`,
                    className 
                )}
                style={{
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    boxSizing: 'content-box',
                    lineHeight: "1.2rem",
                    minHeight: "1.2rem",
                    ...styles
                }}
                ref={(el) => {
                    (textAreaRef.current as HTMLTextAreaElement | null) = el
                    if (typeof ref === 'function') ref(el)
                    else if (ref) ref.current = el
                }}
                readOnly={isPreview}
                {...props}
                >
                </textarea>
            )
        }
    )
    Heading.displayName = displayName;
    return Heading;
}


const Heading1 = creatHeading('Heading1', 'text-4xl font-bold');
const Heading2 = creatHeading('Heading2', 'text-3xl font-semibold');
const Heading3 = creatHeading('Heading3', 'text-2xl font-medium');
const Heading4 = creatHeading('Heading4', 'text-xl font-medium');
const Title = creatHeading('Title', 'text-5xl font-extrabold');

export { Heading1, Heading2, Heading3, Heading4, Title }