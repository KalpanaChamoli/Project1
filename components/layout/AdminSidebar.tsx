'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Clock,
  FolderOpen,
  UsersRound,
  Calendar,
  CheckSquare,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Employees',
    href: '/admin/employees',
    icon: Users,
  },
  {
    title: 'Attendance',
    href: '/admin/attendance',
    icon: Clock,
  },
  {
    title: 'Projects',
    href: '/admin/projects',
    icon: FolderOpen,
  },
  {
    title: 'Teams',
    href: '/admin/teams',
    icon: UsersRound,
  },
  {
    title: 'Leaves',
    href: '/admin/leaves',
    icon: Calendar,
  },
  {
    title: 'Tasks',
    href: '/admin/tasks',
    icon: CheckSquare,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50 border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold text-gray-900">HR Admin</h2>
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