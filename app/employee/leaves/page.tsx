'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Calendar, 
  Plus, 
  Clock, 
  Check,
  X,
  FileText
} from 'lucide-react';
import { mockLeaveApplications } from '@/lib/data';

export default function LeavesPage() {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  if (!user) return null;

  // Filter leave applications for current user
  const userLeaves = mockLeaveApplications.filter(leave => leave.employeeId === user.id);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      sick: 'bg-red-100 text-red-800',
      vacation: 'bg-blue-100 text-blue-800',
      personal: 'bg-purple-100 text-purple-800',
      maternity: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const leaveStats = {
    total: userLeaves.length,
    pending: userLeaves.filter(l => l.status === 'pending').length,
    approved: userLeaves.filter(l => l.status === 'approved').length,
    rejected: userLeaves.filter(l => l.status === 'rejected').length,
    totalDays: userLeaves
      .filter(l => l.status === 'approved')
      .reduce((sum, l) => sum + l.days, 0),
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  const handleSubmitLeave = () => {
    if (!newLeave.type || !newLeave.startDate || !newLeave.endDate || !newLeave.reason) {
      alert('Please fill in all required fields');
      return;
    }

    const days = calculateDays(newLeave.startDate, newLeave.endDate);
    
    // In a real app, this would submit to an API
    console.log('New leave application:', {
      ...newLeave,
      days,
      employeeId: user.id,
      employeeName: user.name,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    });
    
    setIsDialogOpen(false);
    setNewLeave({
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Applications</h1>
          <p className="text-gray-600">Apply for leave and track your applications</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>
                Fill in the details for your leave application.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select onValueChange={(value) => setNewLeave({...newLeave, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="maternity">Maternity/Paternity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              {newLeave.startDate && newLeave.endDate && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Total days: <strong>{calculateDays(newLeave.startDate, newLeave.endDate)}</strong>
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="leave-reason">Reason</Label>
                <Textarea
                  id="leave-reason"
                  placeholder="Please provide a reason for your leave..."
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitLeave}>
                Submit Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leave Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{leaveStats.total}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{leaveStats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{leaveStats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{leaveStats.totalDays}</div>
              <div className="text-sm text-gray-600">Days Taken</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Your Leave Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userLeaves.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>
                        <Badge className={getTypeColor(leave.type)}>
                          {leave.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          {leave.days} {leave.days === 1 ? 'day' : 'days'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(leave.startDate).toLocaleDateString()}</div>
                          <div className="text-gray-500">to {new Date(leave.endDate).toLocaleDateString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start max-w-xs">
                          <FileText className="mr-2 h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm line-clamp-2">{leave.reason}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(leave.appliedDate).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(leave.status)}
                          <Badge variant={getStatusBadgeVariant(leave.status) as any}>
                            {leave.status}
                          </Badge>
                        </div>
                        {leave.status === 'approved' && leave.approvedBy && (
                          <div className="text-xs text-gray-500 mt-1">
                            Approved by {leave.approvedBy}
                          </div>
                        )}
                        {leave.status === 'rejected' && leave.approvedBy && (
                          <div className="text-xs text-gray-500 mt-1">
                            Rejected by {leave.approvedBy}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="mx-auto h-12 w-12 mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leave applications yet</h3>
              <p className="text-gray-600 mb-4">When you need time off, submit your first leave application.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Apply for Leave
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}