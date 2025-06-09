import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Shield, Users, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Enterprise Resource Planning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Streamline your business operations with our comprehensive ERP system. 
            Manage Finance, HR, and Inventory all in one powerful platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="px-8 py-3 text-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Financial Management</CardTitle>
              <CardDescription>
                Track revenue, expenses, and profitability with real-time financial insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Revenue tracking and analytics</li>
                <li>• Expense management</li>
                <li>• Financial reporting</li>
                <li>• Budget planning</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">HR Management</CardTitle>
              <CardDescription>
                Comprehensive employee management and human resources tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Employee profiles</li>
                <li>• Leave management</li>
                <li>• Performance tracking</li>
                <li>• Department organization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Package className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Inventory Control</CardTitle>
              <CardDescription>
                Efficient inventory management with real-time stock monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Stock level monitoring</li>
                <li>• Low stock alerts</li>
                <li>• Supplier management</li>
                <li>• Order tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our ERP System?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Built for modern businesses with security, scalability, and ease of use in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with role-based access control
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Live dashboards and comprehensive reporting tools
              </p>
            </div>
            <div className="text-center">
              <Users className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Multi-user Support</h3>
              <p className="text-sm text-muted-foreground">
                Support for teams with different roles and permissions
              </p>
            </div>
            <div className="text-center">
              <Building2 className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Scalable Solution</h3>
              <p className="text-sm text-muted-foreground">
                Grows with your business from startup to enterprise
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 ERP System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}