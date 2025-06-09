"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import api from '@/lib/api';

interface DashboardStats {
  totalEmployees: number;
  totalAdmins: number;
  activeUsers: number;
  finance: {
    totalRevenue: number;
    totalExpenses: number;
    profit: number;
    pendingInvoices: number;
  };
  hr: {
    newHires: number;
    pendingLeaves: number;
    upcomingReviews: number;
  };
  inventory: {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    recentOrders: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load dashboard data</div>;
  }

  const profitMargin = ((stats.finance.profit / stats.finance.totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.finance.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +5.9% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin}%</div>
            <p className="text-xs text-muted-foreground">
              ${stats.finance.profit.toLocaleString()} profit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inventory.totalItems}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <AlertTriangle className="h-3 w-3 text-orange-500 mr-1" />
              {stats.inventory.lowStock} low stock items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Financial Overview
            </CardTitle>
            <CardDescription>Monthly financial summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <span className="font-medium">${stats.finance.totalRevenue.toLocaleString()}</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Expenses</span>
                <span className="font-medium">${stats.finance.totalExpenses.toLocaleString()}</span>
              </div>
              <Progress value={(stats.finance.totalExpenses / stats.finance.totalRevenue) * 100} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Net Profit</span>
                <span className="font-bold text-green-600">${stats.finance.profit.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HR Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              HR Summary
            </CardTitle>
            <CardDescription>Human resources overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">New Hires</span>
              <Badge variant="secondary">{stats.hr.newHires}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pending Leaves</span>
              <Badge variant="outline">{stats.hr.pendingLeaves}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Upcoming Reviews</span>
              <Badge variant="default">{stats.hr.upcomingReviews}</Badge>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Active Employees</span>
                <span className="font-bold">{stats.totalEmployees}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Inventory Status
            </CardTitle>
            <CardDescription>Stock and inventory overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Items</span>
              <span className="font-medium">{stats.inventory.totalItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Low Stock</span>
              <Badge variant="destructive">{stats.inventory.lowStock}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Out of Stock</span>
              <Badge variant="destructive">{stats.inventory.outOfStock}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Recent Orders</span>
              <Badge variant="secondary">{stats.inventory.recentOrders}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">New employee onboarding completed</p>
                <p className="text-xs text-muted-foreground">Sarah Johnson joined the Engineering team</p>
              </div>
              <Badge variant="outline">2h ago</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <DollarSign className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Payment received from ABC Corp</p>
                <p className="text-xs text-muted-foreground">$15,000 invoice payment processed</p>
              </div>
              <Badge variant="outline">4h ago</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Low stock alert</p>
                <p className="text-xs text-muted-foreground">Office supplies need restocking</p>
              </div>
              <Badge variant="outline">6h ago</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="h-4 w-4 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Performance review scheduled</p>
                <p className="text-xs text-muted-foreground">15 employees scheduled for quarterly reviews</p>
              </div>
              <Badge variant="outline">1d ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}