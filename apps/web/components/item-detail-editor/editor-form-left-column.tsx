import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { ItemImageGallery } from './ItemImageGallery';

interface ItemEditorFormProps {
  item: {
    title: string;
    sku: string;
    purchasePrice: number;
    description: string;
    images: string[];
  };
}

/**
 * The main form for editing item details, including the image gallery.
 */
export const ItemEditorForm: React.FC<ItemEditorFormProps> = ({ item }) => {
  return (
    <div className="space-y-6">
      <ItemImageGallery images={item.images} title={item.title} />
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" defaultValue={item.title} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" defaultValue={item.sku} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
              <Input id="purchasePrice" type="number" defaultValue={item.purchasePrice} />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              <Button variant="ghost" size="sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Description
              </Button>
            </div>
            <Textarea id="description" defaultValue={item.description} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

