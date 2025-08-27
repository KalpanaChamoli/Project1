'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Clock, 
  CheckSquare, 
  Calendar,
  Building2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { mockAttendance, mockTasks, mockLeaveApplications } from '@/lib/data';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  
  if (!user) return null;

  // Get user's data
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = mockAttendance.find(record => 
    record.employeeId === user.id && record.date === today
  );
  
  const userTasks = mockTasks.filter(task => task.employeeId === user.id);
  const todayTasks = userTasks.filter(task => task.date === today);
  const userLeaves = mockLeaveApplications.filter(leave => leave.employeeId === user.id);
  const pendingLeaves = userLeaves.filter(leave => leave.status === 'pending');

  const stats = [
    {
      title: "Today's Attendance",
      value: todayAttendance?.status || 'Not checked in',
      icon: Clock,
      color: todayAttendance?.status === 'present' ? 'text-green-600' : 'text-red-600',
      bgColor: todayAttendance?.status === 'present' ? 'bg-green-100' : 'bg-red-100',
    },
    {
      title: "Today's Tasks",
      value: todayTasks.length,
      icon: CheckSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves.length,
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Here's your daily overview and quick actions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
        {/* Profile Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-lg font-medium">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-600">{user.position}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="mr-2 h-4 w-4" />
                {user.department}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="mr-2 h-4 w-4" />
                {user.email}
              </div>
              {user.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {user.phone}
                </div>
              )}
              {user.joinDate && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  Joined {new Date(user.joinDate).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Clock className="h-6 w-6 mb-2" />
                <span>Check In/Out</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <CheckSquare className="h-6 w-6 mb-2" />
                <span>Submit Task</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Apply Leave</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <User className="h-6 w-6 mb-2" />
                <span>View Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayTasks.length > 0 ? (
              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-gray-600">{task.description}</p>
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
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckSquare className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                <p>No tasks for today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leave Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Leave Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userLeaves.length > 0 ? (
              <div className="space-y-3">
                {userLeaves.slice(0, 3).map((leave) => (
                  <div key={leave.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{leave.type} Leave</p>
                      <p className="text-xs text-gray-600">
                        {leave.days} days • {new Date(leave.startDate).toLocaleDateString()}
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
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                <p>No leave applications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayAttendance ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {todayAttendance.checkIn || '-'}
                </div>
                <div className="text-sm text-gray-600">Check In</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {todayAttendance.checkOut || '-'}
                </div>
                <div className="text-sm text-gray-600">Check Out</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {todayAttendance.hours ? `${todayAttendance.hours}h` : '-'}
                </div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 mb-4 text-gray-300" />
              <p className="text-gray-600 mb-4">You haven't checked in today</p>
              <Button>Check In Now</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}