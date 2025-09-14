"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';
import { Label } from '@repo/ui/label';
import { Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import { Checkbox } from '@repo/ui/checkbox';
import { Badge } from '@repo/ui/badge';

const marketplaces = ["eBay", "Poshmark", "Mercari"];

interface ItemActionsPanelProps {
  item: {
    listingPrice: number;
    listedOn: string[];
  };
}

/**
 * The right-hand panel for managing marketplace listings and primary actions.
 */
export const ItemActionsPanel: React.FC<ItemActionsPanelProps> = ({ item }) => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Marketplace Listings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid w-full items-center gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="listingPrice">Default Listing Price ($)</Label>
            <Button variant="ghost" size="sm">Suggest Price</Button>
          </div>
          <Input id="listingPrice" type="number" defaultValue={item.listingPrice} />
        </div>

        <div>
          <Label className="mb-2 block">Select Markets</Label>
          <div className="space-y-3 rounded-lg border border-white/10 bg-black/20 p-4">
            {marketplaces.map((market) => (
              <div key={market} className="flex items-center space-x-3">
                <Checkbox id={market.toLowerCase()} defaultChecked={item.listedOn.includes(market)} />
                <Label htmlFor={market.toLowerCase()} className="font-normal">{market}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-primary-text mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {item.listedOn.length > 0 ? (
              item.listedOn.map(market => <Badge key={market} variant="primary">{market}</Badge>)
            ) : (
              <Badge variant="default">Not Listed</Badge>
            )}
          </div>
        </div>

        <Button size="lg" className="w-full">
          List on Selected Markets
        </Button>
      </CardContent>
    </Card>
  );
};