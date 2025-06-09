"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Receipt,
  Plus
} from 'lucide-react';
import api from '@/lib/api';

interface FinanceData {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  expenses: {
    current: number;
    previous: number;
    growth: number;
  };
  profit: {
    current: number;
    previous: number;
    growth: number;
  };
  recentTransactions: Array<{
    id: number;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    date: string;
  }>;
}

export default function FinancePage() {
  const [financeData, setFinanceData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      const response = await api.get('/finance/overview');
      setFinanceData(response.data);
    } catch (error) {
      console.error('Failed to fetch finance data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
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

  if (!financeData) {
    return <div>Failed to load financial data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your financial performance and transactions
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financeData.revenue.current.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {financeData.revenue.growth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              {financeData.revenue.growth >= 0 ? '+' : ''}{financeData.revenue.growth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financeData.expenses.current.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {financeData.expenses.growth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
              )}
              {financeData.expenses.growth >= 0 ? '+' : ''}{financeData.expenses.growth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${financeData.profit.current.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              {financeData.profit.growth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              {financeData.profit.growth >= 0 ? '+' : ''}{financeData.profit.growth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="h-5 w-5 mr-2" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financeData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'} className="text-xs">
                      {transaction.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Monthly comparison and insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Revenue vs Last Month</span>
                <span className="text-sm">
                  ${(financeData.revenue.current - financeData.revenue.previous).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Expense Change</span>
                <span className="text-sm">
                  ${(financeData.expenses.current - financeData.expenses.previous).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-sm font-medium">Profit Increase</span>
                <span className="text-sm font-bold text-green-600">
                  ${(financeData.profit.current - financeData.profit.previous).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Key Metrics</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Profit margin: {((financeData.profit.current / financeData.revenue.current) * 100).toFixed(1)}%</p>
                <p>• Expense ratio: {((financeData.expenses.current / financeData.revenue.current) * 100).toFixed(1)}%</p>
                <p>• Growth rate: {financeData.revenue.growth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}