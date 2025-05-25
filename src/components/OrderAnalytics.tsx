
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const orderTrendsData = [
  { date: '2024-01-01', orders: 45, revenue: 6750 },
  { date: '2024-01-02', orders: 52, revenue: 7800 },
  { date: '2024-01-03', orders: 38, revenue: 5700 },
  { date: '2024-01-04', orders: 61, revenue: 9150 },
  { date: '2024-01-05', orders: 48, revenue: 7200 },
  { date: '2024-01-06', orders: 67, revenue: 10050 },
  { date: '2024-01-07', orders: 58, revenue: 8700 },
];

const seasonalData = [
  { season: 'Winter', hotDrinks: 380, coldDrinks: 120, soups: 250, salads: 80 },
  { season: 'Spring', hotDrinks: 200, coldDrinks: 280, soups: 150, salads: 180 },
  { season: 'Summer', hotDrinks: 80, coldDrinks: 420, soups: 60, salads: 320 },
  { season: 'Fall', hotDrinks: 290, coldDrinks: 180, soups: 200, salads: 140 },
];

const OrderAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Daily Average Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">52</div>
            <p className="text-xs text-green-600 font-medium">+8.2% this week</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Peak Order Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">7:30 PM</div>
            <p className="text-xs text-slate-600">Dinner rush time</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Order Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">94.2%</div>
            <p className="text-xs text-green-600 font-medium">+1.5% improvement</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Daily Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={orderTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #3B82F6',
                  borderRadius: '8px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="#3B82F6" 
                fill="#93C5FD"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Seasonal Trends Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="season" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #3B82F6',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="hotDrinks" stroke="#DC2626" strokeWidth={2} name="Hot Drinks" />
              <Line type="monotone" dataKey="coldDrinks" stroke="#2563EB" strokeWidth={2} name="Cold Drinks" />
              <Line type="monotone" dataKey="soups" stroke="#EA580C" strokeWidth={2} name="Soups" />
              <Line type="monotone" dataKey="salads" stroke="#16A34A" strokeWidth={2} name="Salads" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderAnalytics;
