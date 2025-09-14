"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';

// Hardcoded placeholder data for the sales chart
const salesData = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 600 },
  { name: 'Thu', sales: 800 },
  { name: 'Fri', sales: 750 },
  { name: 'Sat', sales: 1100 },
  { name: 'Sun', sales: 900 },
];

/**
 * A component to display sales trends using a bar chart.
 */
export const SalesChart: React.FC = () => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#8E8E93" strokeOpacity={0.2} />
            <XAxis
              dataKey="name"
              stroke="#8E8E93"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#8E8E93"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1C1E',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.75rem',
                color: '#E5E5E5'
              }}
              labelStyle={{ color: '#8E8E93' }}
              cursor={{ fill: 'rgba(0, 191, 255, 0.1)' }}
            />
            <Bar dataKey="sales" fill="#00BFFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

