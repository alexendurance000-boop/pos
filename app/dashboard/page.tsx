'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Users, DollarSign, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const stats = [
    {
      title: 'Total Sales',
      value: '$0.00',
      icon: DollarSign,
      description: 'Today',
    },
    {
      title: 'Transactions',
      value: '0',
      icon: ShoppingCart,
      description: 'Today',
    },
    {
      title: 'Products',
      value: '0',
      icon: Package,
      description: 'In stock',
    },
    {
      title: 'Customers',
      value: '0',
      icon: Users,
      description: 'Total',
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Welcome back, {session?.user?.name || 'User'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {session?.user?.email}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {session?.user?.role?.toLowerCase()}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-slate-100"
            onClick={() => router.push('/products')}
          >
            <Package className="h-8 w-8 text-slate-600" />
            <span className="font-medium">Products</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-slate-100"
            onClick={() => router.push('/pos')}
          >
            <ShoppingCart className="h-8 w-8 text-slate-600" />
            <span className="font-medium">Point of Sale</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-slate-100"
            disabled
          >
            <Users className="h-8 w-8 text-slate-400" />
            <span className="font-medium text-slate-400">Customers</span>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">No transactions yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">No alerts</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
