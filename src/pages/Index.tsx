
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/DashboardOverview";
import OrderAnalytics from "@/components/OrderAnalytics";
import CustomerSentiment from "@/components/CustomerSentiment";
import MenuPerformance from "@/components/MenuPerformance";
import PeakHoursAnalysis from "@/components/PeakHoursAnalysis";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Restaurant Analytics Dashboard</h1>
          <p className="text-slate-600">AI-powered insights for data-driven restaurant management</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-blue-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Order Analytics</TabsTrigger>
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Customer Sentiment</TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Menu Performance</TabsTrigger>
            <TabsTrigger value="hours" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Peak Hours</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="orders">
            <OrderAnalytics />
          </TabsContent>

          <TabsContent value="sentiment">
            <CustomerSentiment />
          </TabsContent>

          <TabsContent value="menu">
            <MenuPerformance />
          </TabsContent>

          <TabsContent value="hours">
            <PeakHoursAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
