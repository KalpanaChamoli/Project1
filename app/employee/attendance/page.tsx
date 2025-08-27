'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Clock, 
  Calendar, 
  Play, 
  Square,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { mockAttendance } from '@/lib/data';

export default function AttendancePage() {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  
  if (!user) return null;

  // Filter attendance records for current user and selected month
  const userAttendance = mockAttendance.filter(record => 
    record.employeeId === user.id && 
    record.date.startsWith(selectedMonth)
  );

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = mockAttendance.find(record => 
    record.employeeId === user.id && record.date === today
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'half-day':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'present':
        return 'default';
      case 'absent':
        return 'destructive';
      case 'late':
        return 'secondary';
      case 'half-day':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  // Calculate attendance statistics
  const attendanceStats = {
    total: userAttendance.length,
    present: userAttendance.filter(r => r.status === 'present').length,
    absent: userAttendance.filter(r => r.status === 'absent').length,
    late: userAttendance.filter(r => r.status === 'late').length,
    totalHours: userAttendance.reduce((sum, r) => sum + (r.hours || 0), 0),
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleCheckIn = () => {
    // In a real app, this would make an API call
    alert(`Checked in at ${getCurrentTime()}`);
  };

  const handleCheckOut = () => {
    // In a real app, this would make an API call
    alert(`Checked out at ${getCurrentTime()}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600">Track your daily attendance and view your attendance history</p>
      </div>

      {/* Check In/Out Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayAttendance ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {getStatusIcon(todayAttendance.status)}
                  <Badge variant={getStatusBadgeVariant(todayAttendance.status) as any}>
                    {todayAttendance.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 mb-4 text-gray-300" />
              <p className="text-gray-600 mb-6">You haven't checked in today</p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleCheckIn} className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  Check In
                </Button>
              </div>
            </div>
          )}
          
          {todayAttendance && !todayAttendance.checkOut && (
            <div className="mt-6 text-center">
              <Button onClick={handleCheckOut} variant="outline" className="flex items-center">
                <Square className="mr-2 h-4 w-4" />
                Check Out
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{attendanceStats.total}</div>
              <div className="text-sm text-gray-600">Total Days</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{attendanceStats.totalHours}h</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Attendance History
            </CardTitle>
            <div className="flex items-center space-x-2">
              <label htmlFor="month-select" className="text-sm font-medium">
                Month:
              </label>
              <Input
                id="month-select"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-40"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {userAttendance.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </TableCell>
                      <TableCell>
                        {record.checkIn ? (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-400" />
                            {record.checkIn}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.checkOut ? (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-400" />
                            {record.checkOut}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.hours ? `${record.hours}h` : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <Badge variant={getStatusBadgeVariant(record.status) as any}>
                            {record.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="mx-auto h-12 w-12 mb-4 text-gray-300" />
              <p>No attendance records found for the selected month.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}