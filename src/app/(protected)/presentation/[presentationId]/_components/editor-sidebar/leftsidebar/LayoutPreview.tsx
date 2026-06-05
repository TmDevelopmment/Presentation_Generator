import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useSlideStore } from '@/store/useSlideStore';
import { useEffect, useState } from 'react'

type Props = {}

const LayoutPreview = (props: Props) => {

    const { getOrderdSlides, reorderSlides } = useSlideStore();
    const [loding, setLoading] = useState(false);
    const slides = getOrderdSlides();

    useEffect(() => {
      if (typeof window !== "undefined") {
        setLoading(false);
      }
    }, [])

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
      reorderSlides(dragIndex, hoverIndex);
    }

  return (
    <div className="w-72 h-full fixed left-0 top-20 border-r overflow-y-auto ">
      <ScrollArea
      className="h-full w-full">
        {loding ? (
          <div className="w-full px-4 flex flex-col gap-4">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">
                SLIDES
              </h2>
              <span className="text-xs dark:text-gray-200 text-gray-400"
              suppressHydrationWarning>
                {slides.length} slides
              </span>
            </div>
            {/* add the draggable slide preview here */}
            {slides.map((slide, index) => (
              <DraggableSidePreview
                key={slide.id || index}
                slide={slide}
                index={index}
                moveSlide={moveSlide}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default LayoutPreview