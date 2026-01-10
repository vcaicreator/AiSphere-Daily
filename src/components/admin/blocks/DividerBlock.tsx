import { Minus } from 'lucide-react';

export function DividerBlock() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Minus className="h-4 w-4" />
        <span className="text-xs">Horizontal Divider</span>
        <Minus className="h-4 w-4" />
      </div>
    </div>
  );
}
