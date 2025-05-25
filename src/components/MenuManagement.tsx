
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useData } from '@/contexts/DataContext';
import { MenuItem } from '@/types/menu';

const MenuManagement = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useData();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    available: true
  });

  const categories = [...new Set(menuItems.map(item => item.category))];

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.price > 0) {
      addMenuItem(newItem);
      setNewItem({ name: '', category: '', price: 0, description: '', available: true });
      setIsAddingItem(false);
    }
  };

  const toggleAvailability = (item: MenuItem) => {
    updateMenuItem(item.id, { available: !item.available });
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-800">Menu Management</CardTitle>
            <Button 
              onClick={() => setIsAddingItem(true)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add New Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAddingItem && (
            <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="text-lg font-semibold mb-4">Add New Menu Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="itemCategory">Category</Label>
                  <Input
                    id="itemCategory"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    placeholder="e.g., Appetizers, Main Course, Beverages"
                  />
                </div>
                <div>
                  <Label htmlFor="itemPrice">Price ($)</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="itemAvailable">Availability</Label>
                  <Select 
                    value={newItem.available.toString()} 
                    onValueChange={(value) => setNewItem({ ...newItem, available: value === 'true' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="itemDescription">Description</Label>
                  <Textarea
                    id="itemDescription"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Describe the item..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddItem} className="bg-blue-600 hover:bg-blue-700">
                  Add Item
                </Button>
                <Button onClick={() => setIsAddingItem(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAvailability(item)}
                      >
                        {item.available ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMenuItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {menuItems.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No menu items yet. Add your first item to get started!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuManagement;
