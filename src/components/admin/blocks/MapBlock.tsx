import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { ContentBlock } from './types';

interface MapBlockProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
}

export const MapBlock: React.FC<MapBlockProps> = ({ block, onUpdate }) => {
  const address = block.blockData?.address || '';
  const latitude = block.blockData?.latitude || '';
  const longitude = block.blockData?.longitude || '';
  const zoom = block.blockData?.zoom || '14';
  const height = block.blockData?.height || '400';
  const mapType = block.blockData?.mapType || 'roadmap';

  const updateField = (field: string, value: string) => {
    onUpdate({ ...block, blockData: { ...block.blockData, [field]: value } });
  };

  // Generate OpenStreetMap embed URL
  const getMapUrl = () => {
    if (latitude && longitude) {
      return `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(longitude) - 0.01},${parseFloat(latitude) - 0.01},${parseFloat(longitude) + 0.01},${parseFloat(latitude) + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    }
    if (address) {
      return `https://www.openstreetmap.org/export/embed.html?bbox=-0.1,-0.1,0.1,0.1&layer=mapnik`;
    }
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <MapPin className="h-4 w-4" />
        <span>Map/Location Block</span>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm mb-2 block">Address or Location Name</Label>
          <Input
            placeholder="e.g., 123 Main St, New York, NY"
            value={address}
            onChange={(e) => updateField('address', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm mb-2 block">Latitude</Label>
            <Input
              placeholder="e.g., 40.7128"
              value={latitude}
              onChange={(e) => updateField('latitude', e.target.value)}
              type="number"
              step="any"
            />
          </div>
          <div>
            <Label className="text-sm mb-2 block">Longitude</Label>
            <Input
              placeholder="e.g., -74.0060"
              value={longitude}
              onChange={(e) => updateField('longitude', e.target.value)}
              type="number"
              step="any"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm mb-2 block">Zoom Level</Label>
            <Select value={zoom} onValueChange={(v) => updateField('zoom', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 12, 14, 16, 18].map(z => (
                  <SelectItem key={z} value={z.toString()}>{z}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm mb-2 block">Height (px)</Label>
            <Input
              value={height}
              onChange={(e) => updateField('height', e.target.value)}
              type="number"
            />
          </div>
          <div>
            <Label className="text-sm mb-2 block">Map Type</Label>
            <Select value={mapType} onValueChange={(v) => updateField('mapType', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roadmap">Roadmap</SelectItem>
                <SelectItem value="satellite">Satellite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div 
        className="border rounded-lg overflow-hidden bg-muted"
        style={{ height: `${Math.min(parseInt(height) || 400, 300)}px` }}
      >
        {(latitude && longitude) ? (
          <iframe
            title="Map Preview"
            src={getMapUrl()}
            className="w-full h-full border-0"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Enter coordinates to preview map</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
