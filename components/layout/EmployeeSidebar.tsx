'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  User,
  Clock,
  CheckSquare,
  Calendar,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/employee',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    href: '/employee/profile',
    icon: User,
  },
  {
    title: 'Attendance',
    href: '/employee/attendance',
    icon: Clock,
  },
  {
    title: 'Tasks',
    href: '/employee/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Leaves',
    href: '/employee/leaves',
    icon: Calendar,
  },
];

export function EmployeeSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50 border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold text-gray-900">Employee Portal</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              )}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}