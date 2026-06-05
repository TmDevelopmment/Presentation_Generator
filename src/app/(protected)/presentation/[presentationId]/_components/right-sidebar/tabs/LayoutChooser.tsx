import { ScrollArea } from '@/components/ui/scroll-area';
import { layouts } from '@/lib/constants';
import { Layout } from '@/lib/types';
import { useSlideStore } from '@/store/useSlideStore';
import { useDrag } from 'react-dnd';
import LayoutPreviewItem from './LayoutPreviewItem';


export const DraggableLayoutItem = ({
  components,
  icon,
  layoutType,
  name,
  type,
}
  : Layout) => {

    const { currentTheme } = useSlideStore();

    const [ { isDragging }, dragRef] = useDrag(() => ({
      type: 'layout',
      item: { type, layoutType, components },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))

  return (
    <div
      ref={dragRef as unknown as React.LegacyRef<HTMLDivElement>}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: currentTheme.slideBackgroundColor
      }}
      className="border rounded-lg">
        <LayoutPreviewItem
          name={name}
          Icon={icon}
          type={type}
          component={components}
        />
    </div>
  )
}

const LayoutChooser = () => {

  const { currentTheme } = useSlideStore();

  return (
    <ScrollArea
      className="h-100"
      style={{
        backgroundColor: currentTheme.slideBackgroundColor
      }}>
      <div className="p-4">
        {layouts.map((group) => (
          <div
            key={group.name}
            className="mb-4">
            <h3 className="text-sm font-medium mb-3">{group.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              {group.layouts.map((layout) => (
                <DraggableLayoutItem
                  key={layout.layoutType}
                  {...layout}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea >
  )
}

export default LayoutChooser