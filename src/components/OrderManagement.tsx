
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useData } from '@/contexts/DataContext';
import { Order } from '@/types/order';

const OrderManagement = () => {
  const { orders, updateOrderStatus, deleteOrder } = useData();

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

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure the bill has been paid and you want to remove this order?')) {
      deleteOrder(orderId);
    }
  };

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-slate-800">Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Taken By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    {order.tableNumber && (
                      <p className="text-sm text-slate-600">Table {order.tableNumber}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        {item.quantity}x {item.menuItemName}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">₹{order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-slate-600">{order.takenBy}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(value: Order['status']) => updateOrderStatus(order.id, value)}
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
                      variant="destructive"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Bill Paid
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {orders.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No orders yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderManagement;
