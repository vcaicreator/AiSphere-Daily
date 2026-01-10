import { ContentBlock } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, DollarSign, Star } from 'lucide-react';

interface PricingBlockProps {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}

export function PricingBlock({ block, onChange }: PricingBlockProps) {
  const plans = block.blockData?.pricingPlans || [];

  const addPlan = () => {
    const newPlan = { 
      id: crypto.randomUUID(), 
      name: 'Plan', 
      price: '$0', 
      features: ['Feature 1'], 
      highlighted: false 
    };
    onChange({ ...block, blockData: { ...block.blockData, pricingPlans: [...plans, newPlan] } });
  };

  const updatePlan = (index: number, field: string, value: any) => {
    const newPlans = [...plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    onChange({ ...block, blockData: { ...block.blockData, pricingPlans: newPlans } });
  };

  const removePlan = (index: number) => {
    const newPlans = plans.filter((_, i) => i !== index);
    onChange({ ...block, blockData: { ...block.blockData, pricingPlans: newPlans } });
  };

  const addFeature = (planIndex: number) => {
    const newPlans = [...plans];
    newPlans[planIndex] = { ...newPlans[planIndex], features: [...newPlans[planIndex].features, ''] };
    onChange({ ...block, blockData: { ...block.blockData, pricingPlans: newPlans } });
  };

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const newPlans = [...plans];
    const newFeatures = [...newPlans[planIndex].features];
    newFeatures[featureIndex] = value;
    newPlans[planIndex] = { ...newPlans[planIndex], features: newFeatures };
    onChange({ ...block, blockData: { ...block.blockData, pricingPlans: newPlans } });
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const newPlans = [...plans];
    newPlans[planIndex] = { 
      ...newPlans[planIndex], 
      features: newPlans[planIndex].features.filter((_, i) => i !== featureIndex) 
    };
    onChange({ ...block, blockData: { ...block.blockData, pricingPlans: newPlans } });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <DollarSign className="w-4 h-4" />
        <span className="text-sm">Pricing Table</span>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(plans.length, 3)}, 1fr)` }}>
        {plans.map((plan, planIndex) => (
          <div 
            key={plan.id} 
            className={`p-4 border rounded-lg space-y-3 ${plan.highlighted ? 'border-primary bg-primary/5' : 'border-border'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  checked={plan.highlighted}
                  onCheckedChange={(checked) => updatePlan(planIndex, 'highlighted', checked)}
                />
                <Label className="text-xs">Featured</Label>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removePlan(planIndex)} className="h-6 w-6 p-0">
                <Trash2 className="w-3 h-3 text-destructive" />
              </Button>
            </div>

            <Input
              value={plan.name}
              onChange={(e) => updatePlan(planIndex, 'name', e.target.value)}
              placeholder="Plan name"
              className="font-semibold"
            />

            <div className="flex gap-2">
              <Input
                value={plan.price}
                onChange={(e) => updatePlan(planIndex, 'price', e.target.value)}
                placeholder="$29"
                className="text-2xl font-bold w-24"
              />
              <Input
                value={plan.period || ''}
                onChange={(e) => updatePlan(planIndex, 'period', e.target.value)}
                placeholder="/month"
                className="flex-1"
              />
            </div>

            <Textarea
              value={plan.description || ''}
              onChange={(e) => updatePlan(planIndex, 'description', e.target.value)}
              placeholder="Description (optional)"
              rows={2}
            />

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Features</Label>
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex gap-1">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(planIndex, featureIndex, e.target.value)}
                    placeholder="Feature"
                    className="h-8 text-sm"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFeature(planIndex, featureIndex)}
                    className="h-8 w-8 p-0"
                    disabled={plan.features.length <= 1}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addFeature(planIndex)} className="w-full h-7">
                <Plus className="w-3 h-3 mr-1" /> Add Feature
              </Button>
            </div>

            <div className="pt-2 border-t border-border">
              <Input
                value={plan.buttonText || ''}
                onChange={(e) => updatePlan(planIndex, 'buttonText', e.target.value)}
                placeholder="Button text"
                className="h-8 text-sm mb-2"
              />
              <Input
                value={plan.buttonUrl || ''}
                onChange={(e) => updatePlan(planIndex, 'buttonUrl', e.target.value)}
                placeholder="Button URL"
                className="h-8 text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addPlan} className="w-full">
        <Plus className="w-4 h-4 mr-2" /> Add Plan
      </Button>
    </div>
  );
}
