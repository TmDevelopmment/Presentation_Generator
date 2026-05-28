import { Slide, Theme } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    slide: Slide
    theme: Theme
}

const ThumnailPreview = ({ slide, theme }: Props) => {
  return (
    <div className={cn(
        'w-full relative aspect-video rounded-lg overflow-hidden transition-all duration-200'
    )}
    style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBgColor,
    }}>
        {slide ? (
            <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
                This is the slide
            </div>
        ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                <Image src="/images/placeholder.png" alt="placeholder" className="w-6 h-6 text-gray-500" />
            </div>
        )}
    </div>
  )
}

export default ThumnailPreview