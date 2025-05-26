
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSupabaseData } from '@/contexts/SupabaseDataContext';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Order } from '@/types/order';

const OrderManagement = () => {
  const { orders, updateOrderStatus, deleteOrder, loading } = useSupabaseData();
  const { user } = useSupabaseAuth();

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBillPaid = async (orderId: string) => {
    if (window.confirm('Are you sure the bill has been paid and you want to remove this order?')) {
      await deleteOrder(orderId);
    }
  };

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    await updateOrderStatus(orderId, status);
  };

  // Group orders by table number
  const groupedOrders = orders.reduce((acc, order) => {
    const tableKey = order.tableNumber || 'No Table';
    if (!acc[tableKey]) {
      acc[tableKey] = [];
    }
    acc[tableKey].push(order);
    return acc;
  }, {} as Record<string, Order[]>);

  const isOwner = user?.role === 'owner';

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-slate-800">
          Order Management - Table View
          {isOwner && (
            <span className="text-sm font-normal text-slate-600 ml-2">
              (View Only - Status updates by staff)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.keys(groupedOrders).length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No orders yet.
            </div>
          ) : (
            Object.entries(groupedOrders).map(([tableNumber, tableOrders]) => (
              <div key={tableNumber} className="border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                  Table {tableNumber}
                </h3>
                <div className="space-y-4">
                  {tableOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-800">Order #{order.id.slice(-6)}</p>
                          <p className="text-sm text-gray-600">Taken by: {order.takenBy}</p>
                          <p className="text-sm text-gray-600">
                            Time: {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-medium mb-2">Order Items:</h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.menuItemName}</span>
                              <span>₹{item.total.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                        <div className="text-lg font-bold text-blue-600">
                          Total: ₹{order.totalAmount.toFixed(2)}
                        </div>
                        <div className="flex gap-2">
                          {isOwner ? (
                            // Owner view - read only status
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Status:</span>
                              <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleBillPaid(order.id)}
                              >
                                Bill Paid
                              </Button>
                            </div>
                          ) : (
                            // Staff view - editable status
                            <>
                              <Select
                                value={order.status}
                                onValueChange={(value: Order['status']) => handleStatusChange(order.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="preparing">Preparing</SelectItem>
                                  <SelectItem value="ready">Ready</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleBillPaid(order.id)}
                              >
                                Bill Paid
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderManagement;
