
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from '@/contexts/DataContext';
import { ArrowLeft } from 'lucide-react';

const MenuView = () => {
  const { menuItems } = useData();
  const availableItems = menuItems.filter(item => item.available);
  const categories = [...new Set(availableItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Menu Management</h1>
            <p className="text-blue-100">Create and update your restaurant menu</p>
          </div>
          <Button 
            variant="outline" 
            className="bg-white text-blue-600 border-white hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex space-x-8 mb-8">
            <button className="text-gray-500 pb-2">Create & Update</button>
            <button className="text-blue-600 pb-2 border-b-2 border-blue-600 font-medium">View Menu</button>
            <button className="text-gray-500 pb-2">Order System</button>
          </div>

          {categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 lowercase">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <span className="text-blue-600 font-semibold">₹{item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        available
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          
          {availableItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No menu items available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuView;
