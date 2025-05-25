
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { OrderItem } from '@/types/order';

const OrderTaking = () => {
  const { menuItems, addOrder } = useData();
  const { user } = useAuth();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    orderType: 'dine-in' as 'dine-in' | 'takeaway' | 'delivery',
    tableNumber: '',
    notes: ''
  });

  const availableItems = menuItems.filter(item => item.available);
  const categories = [...new Set(availableItems.map(item => item.category))];

  const addItemToOrder = (menuItemId: string) => {
    const menuItem = menuItems.find(item => item.id === menuItemId);
    if (!menuItem) return;

    const existingItem = orderItems.find(item => item.menuItemId === menuItemId);
    
    if (existingItem) {
      setOrderItems(prev => prev.map(item => 
        item.menuItemId === menuItemId 
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setOrderItems(prev => [...prev, {
        menuItemId: menuItem.id,
        menuItemName: menuItem.name,
        quantity: 1,
        price: menuItem.price,
        total: menuItem.price
      }]);
    }
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems(prev => prev.filter(item => item.menuItemId !== menuItemId));
    } else {
      setOrderItems(prev => prev.map(item => 
        item.menuItemId === menuItemId 
          ? { ...item, quantity, total: quantity * item.price }
          : item
      ));
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmitOrder = () => {
    if (orderItems.length === 0 || !customerInfo.name) return;

    addOrder({
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      items: orderItems,
      totalAmount: getTotalAmount(),
      status: 'pending',
      orderType: customerInfo.orderType,
      tableNumber: customerInfo.tableNumber,
      notes: customerInfo.notes,
      takenBy: user?.name || 'Staff'
    });

    // Reset form
    setOrderItems([]);
    setCustomerInfo({
      name: '',
      phone: '',
      orderType: 'dine-in',
      tableNumber: '',
      notes: ''
    });

    alert('Order placed successfully!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Menu Items */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.map(category => (
            <div key={category} className="mb-6">
              <h3 className="font-semibold text-lg mb-3 text-blue-600">{category}</h3>
              <div className="space-y-2">
                {availableItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-slate-600">{item.description}</p>
                        <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addItemToOrder(item.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Add
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          
          {availableItems.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No menu items available. Please contact the manager.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Current Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="orderType">Order Type</Label>
                <Select 
                  value={customerInfo.orderType} 
                  onValueChange={(value: 'dine-in' | 'takeaway' | 'delivery') => 
                    setCustomerInfo({ ...customerInfo, orderType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dine-in">Dine In</SelectItem>
                    <SelectItem value="takeaway">Takeaway</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {customerInfo.orderType === 'dine-in' && (
                <div>
                  <Label htmlFor="tableNumber">Table Number</Label>
                  <Input
                    id="tableNumber"
                    value={customerInfo.tableNumber}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, tableNumber: e.target.value })}
                    placeholder="Enter table number"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="notes">Special Notes</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                placeholder="Any special instructions..."
                rows={2}
              />
            </div>

            {/* Order Items */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Order Items</h3>
              {orderItems.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No items added yet</p>
              ) : (
                <div className="space-y-2">
                  {orderItems.map(item => (
                    <div key={item.menuItemId} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <div>
                        <span className="font-medium">{item.menuItemName}</span>
                        <span className="text-slate-600 ml-2">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <span className="ml-2 font-semibold">${item.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total and Submit */}
            {orderItems.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">${getTotalAmount().toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleSubmitOrder}
                  disabled={!customerInfo.name || orderItems.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Place Order
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTaking;
