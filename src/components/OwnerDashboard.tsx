
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import AnalyticsDashboard from './AnalyticsDashboard';

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const { orders, menuItems } = useData();

  const todaysOrders = orders.filter(order => {
    const today = new Date().toDateString();
    return new Date(order.createdAt).toDateString() === today;
  });

  const todaysRevenue = todaysOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Card className="rounded-none border-0 border-b border-blue-200 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Restaurant Analytics</h1>
                <p className="text-sm text-slate-600">Owner Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Welcome back,</p>
                <p className="font-semibold text-slate-800">{user?.name}</p>
              </div>
              <Button onClick={logout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Today's Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{todaysOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Today's Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${todaysRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{menuItems.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-blue-200">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analytics</TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Menu Management</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Order Status</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="menu">
            <MenuManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-slate-800">Detailed Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Advanced reporting features will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
