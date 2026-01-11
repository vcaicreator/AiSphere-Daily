import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';
import { ContentBlock } from './types';

interface MathBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

export const MathBlock: React.FC<MathBlockProps> = ({ block, onUpdate }) => {
  const latex = block.content || '';
  const displayMode = block.blockData?.displayMode || 'block';

  const examples = [
    { label: 'Quadratic Formula', value: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
    { label: 'Pythagorean Theorem', value: 'a^2 + b^2 = c^2' },
    { label: 'Euler\'s Identity', value: 'e^{i\\pi} + 1 = 0' },
    { label: 'Integral', value: '\\int_{a}^{b} f(x) \\, dx' },
    { label: 'Summation', value: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}' },
    { label: 'Matrix', value: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Calculator className="h-4 w-4" />
        <span>Math/LaTeX Block</span>
      </div>

      <div className="flex gap-4">
        <Select
          value={displayMode}
          onValueChange={(v) => onUpdate({ 
            ...block, 
            blockData: { ...block.blockData, displayMode: v } 
          })}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="block">Block (centered)</SelectItem>
            <SelectItem value="inline">Inline</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value=""
          onValueChange={(v) => onUpdate({ ...block, content: v })}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Insert example..." />
          </SelectTrigger>
          <SelectContent>
            {examples.map((ex) => (
              <SelectItem key={ex.label} value={ex.value}>
                {ex.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Enter LaTeX equation (e.g., E = mc^2)"
        value={latex}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        className="font-mono min-h-[100px]"
      />

      {/* Preview */}
      <div className={`p-6 border rounded-lg bg-muted/30 ${displayMode === 'block' ? 'text-center' : ''}`}>
        <div className="font-serif text-lg">
          {latex ? (
            <span className="text-foreground">
              {/* In production, use a LaTeX rendering library like KaTeX or MathJax */}
              <code className="bg-background px-2 py-1 rounded">{latex}</code>
            </span>
          ) : (
            <span className="text-muted-foreground italic">LaTeX preview will appear here</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Note: Full LaTeX rendering requires KaTeX or MathJax integration
        </p>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p className="font-medium">LaTeX Tips:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Fractions: \frac&#123;numerator&#125;&#123;denominator&#125;</li>
          <li>Superscript: x^2 or x^&#123;2n&#125;</li>
          <li>Subscript: x_i or x_&#123;ij&#125;</li>
          <li>Square root: \sqrt&#123;x&#125; or \sqrt[n]&#123;x&#125;</li>
          <li>Greek letters: \alpha, \beta, \gamma, \pi</li>
        </ul>
      </div>
    </div>
  );
};
