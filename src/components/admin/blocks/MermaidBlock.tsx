import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitBranch } from 'lucide-react';
import { ContentBlock } from './types';

interface MermaidBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

const diagramExamples = {
  flowchart: `flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B`,
  sequence: `sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice->>John: See you later!`,
  classDiagram: `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal: +int age
    Animal: +String gender
    Animal: +isMammal()`,
  erDiagram: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`,
  gantt: `gantt
    title Project Timeline
    section Phase 1
    Task 1: a1, 2024-01-01, 30d
    Task 2: a2, after a1, 20d
    section Phase 2
    Task 3: a3, after a2, 15d`,
  pie: `pie title Project Distribution
    "Development" : 40
    "Design" : 25
    "Testing" : 20
    "Documentation" : 15`,
  mindmap: `mindmap
  root((Main Topic))
    Subtopic 1
      Detail A
      Detail B
    Subtopic 2
      Detail C`,
};

export const MermaidBlock: React.FC<MermaidBlockProps> = ({ block, onUpdate }) => {
  const code = block.content || diagramExamples.flowchart;
  const theme = block.blockData?.theme || 'default';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <GitBranch className="h-4 w-4" />
        <span>Mermaid Diagram Block</span>
      </div>

      <div className="flex gap-4">
        <Select
          value={theme}
          onValueChange={(v) => onUpdate({ 
            ...block, 
            blockData: { ...block.blockData, theme: v } 
          })}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="forest">Forest</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value=""
          onValueChange={(v) => onUpdate({ ...block, content: diagramExamples[v as keyof typeof diagramExamples] })}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Load example diagram..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flowchart">Flowchart</SelectItem>
            <SelectItem value="sequence">Sequence Diagram</SelectItem>
            <SelectItem value="classDiagram">Class Diagram</SelectItem>
            <SelectItem value="erDiagram">ER Diagram</SelectItem>
            <SelectItem value="gantt">Gantt Chart</SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="mindmap">Mind Map</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Enter Mermaid diagram code..."
        value={code}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        className="font-mono min-h-[200px] text-sm"
      />

      {/* Preview placeholder */}
      <div className="p-6 border rounded-lg bg-muted/30 text-center">
        <pre className="text-xs text-left bg-background p-4 rounded overflow-x-auto">
          {code}
        </pre>
        <p className="text-xs text-muted-foreground mt-3">
          Note: Live Mermaid rendering requires the mermaid library integration
        </p>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p className="font-medium">Diagram Types:</p>
        <ul className="grid grid-cols-2 gap-1 list-disc list-inside">
          <li>flowchart TD/LR - Flowcharts</li>
          <li>sequenceDiagram - Sequence</li>
          <li>classDiagram - Class diagrams</li>
          <li>erDiagram - ER diagrams</li>
          <li>gantt - Gantt charts</li>
          <li>pie - Pie charts</li>
          <li>mindmap - Mind maps</li>
          <li>timeline - Timelines</li>
        </ul>
      </div>
    </div>
  );
};
