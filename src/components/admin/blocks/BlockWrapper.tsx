import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ContentBlock, getBlockLabel } from './types';

interface BlockWrapperProps {
  block: ContentBlock;
  children: React.ReactNode;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function BlockWrapper({
  block,
  children,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: BlockWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative border border-border rounded-lg bg-card transition-all',
        isDragging && 'opacity-50 shadow-lg z-50',
        'hover:border-primary/30'
      )}
    >
      {/* Block Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30 rounded-t-lg">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {getBlockLabel(block.type)}
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isFirst && onMoveUp && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onMoveUp}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {!isLast && onMoveDown && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onMoveDown}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Block Content */}
      <div className="p-4">{children}</div>
    </div>
  );
}
