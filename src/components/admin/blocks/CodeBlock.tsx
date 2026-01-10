import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentBlock } from './types';
import { Code } from 'lucide-react';

interface CodeBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'plaintext', label: 'Plain Text' },
];

export function CodeBlock({ block, onChange }: CodeBlockProps) {
  const language = block.blockData?.language || 'javascript';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4 text-muted-foreground" />
        <Label className="text-xs text-muted-foreground">Language</Label>
        <Select
          value={language}
          onValueChange={(value) =>
            onChange({
              ...block,
              blockData: { ...block.blockData, language: value },
            })
          }
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Paste your code here..."
        className="min-h-[150px] resize-none font-mono text-sm bg-muted/50"
      />
    </div>
  );
}
