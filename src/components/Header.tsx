
import React from 'react';
import { Card } from "@/components/ui/card";

const Header = () => {
  return (
    <Card className="rounded-none border-0 border-b border-blue-200 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Bistro AI Analyzer</h1>
              <p className="text-sm text-slate-600">Professional Restaurant Analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-slate-600">Current Restaurant</p>
              <p className="font-semibold text-slate-800">The Blue Bistro</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">TB</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Header;
