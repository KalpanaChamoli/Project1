'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import { mockEmployees, mockAttendance, mockLeaveApplications, mockTasks } from '@/lib/data';

export default function AdminDashboard() {
  // Calculate statistics from mock data
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = mockAttendance.filter(record => record.date === today);
  const presentToday = todayAttendance.filter(record => record.status === 'present' || record.status === 'late').length;
  const absentToday = todayAttendance.filter(record => record.status === 'absent').length;
  
  const pendingLeaves = mockLeaveApplications.filter(leave => leave.status === 'pending').length;
  const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
  const pendingTasks = mockTasks.filter(task => task.status === 'pending').length;

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Present Today',
      value: presentToday,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Absent Today',
      value: absentToday,
      icon: UserX,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves,
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const recentLeaves = mockLeaveApplications.slice(0, 5);
  const recentTasks = mockTasks.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your organization.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leave Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Leave Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeaves.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{leave.employeeName}</p>
                    <p className="text-sm text-gray-600">
                      {leave.type} • {leave.days} days
                    </p>
                    <p className="text-xs text-gray-500">
                      {leave.startDate} to {leave.endDate}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      leave.status === 'approved' ? 'default' : 
                      leave.status === 'rejected' ? 'destructive' : 'secondary'
                    }
                  >
                    {leave.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Task Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-green-600">Completed</p>
                      <p className="text-2xl font-bold text-green-700">{completedTasks}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <p className="text-sm text-yellow-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-700">{pendingTasks}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {recentTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.employeeName}</p>
                    </div>
                    <Badge 
                      variant={
                        task.status === 'completed' ? 'default' : 
                        task.status === 'in-progress' ? 'secondary' : 'outline'
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{activeEmployees}</div>
              <div className="text-sm text-gray-600">Active Employees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round((presentToday / totalEmployees) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((completedTasks / mockTasks.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Task Completion</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}