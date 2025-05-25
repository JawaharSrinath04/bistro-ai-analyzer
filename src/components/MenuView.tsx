
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from '@/contexts/DataContext';

const MenuView = () => {
  const { menuItems } = useData();
  const availableItems = menuItems.filter(item => item.available);
  const categories = [...new Set(availableItems.map(item => item.category))];

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-slate-800">Current Menu</CardTitle>
      </CardHeader>
      <CardContent>
        {categories.map(category => (
          <div key={category} className="mb-6">
            <h3 className="font-semibold text-lg mb-3 text-blue-600">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableItems
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-medium text-lg">{item.name}</h4>
                    <p className="text-slate-600 text-sm mb-2">{item.description}</p>
                    <p className="text-blue-600 font-semibold text-lg">${item.price.toFixed(2)}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
        
        {availableItems.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No menu items available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuView;
