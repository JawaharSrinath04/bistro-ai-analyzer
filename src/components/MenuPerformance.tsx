
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const menuPerformanceData = [
  { item: 'Margherita Pizza', orders: 156, revenue: 2340, rating: 4.8, profit: 65 },
  { item: 'Caesar Salad', orders: 134, revenue: 1742, rating: 4.6, profit: 58 },
  { item: 'Pasta Carbonara', orders: 128, revenue: 2048, rating: 4.7, profit: 62 },
  { item: 'Grilled Salmon', orders: 98, revenue: 2450, rating: 4.9, profit: 71 },
  { item: 'Tiramisu', orders: 87, revenue: 609, rating: 4.5, profit: 78 },
  { item: 'Chicken Alfredo', orders: 76, revenue: 1292, rating: 4.4, profit: 55 },
  { item: 'Beef Burger', orders: 145, revenue: 2175, rating: 4.3, profit: 48 },
  { item: 'Fish & Chips', orders: 67, revenue: 1072, rating: 4.2, profit: 52 },
];

const profitabilityData = [
  { item: 'Tiramisu', profit: 78, orders: 87 },
  { item: 'Grilled Salmon', profit: 71, orders: 98 },
  { item: 'Margherita Pizza', profit: 65, orders: 156 },
  { item: 'Pasta Carbonara', profit: 62, orders: 128 },
  { item: 'Caesar Salad', profit: 58, orders: 134 },
  { item: 'Chicken Alfredo', profit: 55, orders: 76 },
  { item: 'Fish & Chips', profit: 52, orders: 67 },
  { item: 'Beef Burger', profit: 48, orders: 145 },
];

const MenuPerformance = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Best Seller</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-blue-600">Margherita Pizza</div>
            <p className="text-xs text-slate-600">156 orders this month</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Most Profitable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">Tiramisu</div>
            <p className="text-xs text-slate-600">78% profit margin</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Highest Rated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-blue-600">Grilled Salmon</div>
            <p className="text-xs text-slate-600">4.9/5 average rating</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Revenue Leader</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-blue-600">Grilled Salmon</div>
            <p className="text-xs text-slate-600">$2,450 this month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Menu Items Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={menuPerformanceData} margin={{ bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="item" 
                stroke="#64748B" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #3B82F6',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="orders" fill="#3B82F6" name="Orders" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Profitability vs. Popularity Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={profitabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="orders" 
                stroke="#64748B"
                name="Orders"
                label={{ value: 'Number of Orders', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                dataKey="profit" 
                stroke="#64748B"
                name="Profit"
                label={{ value: 'Profit Margin (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #3B82F6',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'orders' ? `${value} orders` : `${value}% profit`,
                  name === 'orders' ? 'Orders' : 'Profit Margin'
                ]}
              />
              <Scatter dataKey="profit" fill="#3B82F6" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-slate-800">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuPerformanceData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800">{item.item}</p>
                    <p className="text-sm text-slate-600">{item.orders} orders • ${item.revenue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">★ {item.rating}</p>
                    <p className="text-sm text-green-600">{item.profit}% profit</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-slate-800">Items Needing Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuPerformanceData.slice(-3).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800">{item.item}</p>
                    <p className="text-sm text-slate-600">{item.orders} orders • ${item.revenue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-600">★ {item.rating}</p>
                    <p className="text-sm text-red-600">{item.profit}% profit</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenuPerformance;
