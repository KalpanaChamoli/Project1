'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Search, 
  Check, 
  X, 
  Clock, 
  User,
  FileText,
  AlertCircle 
} from 'lucide-react';
import { mockLeaveApplications } from '@/lib/data';

export default function LeavesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLeaves = mockLeaveApplications.filter(leave =>
    leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
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
    total: mockLeaveApplications.length,
    pending: mockLeaveApplications.filter(l => l.status === 'pending').length,
    approved: mockLeaveApplications.filter(l => l.status === 'approved').length,
    rejected: mockLeaveApplications.filter(l => l.status === 'rejected').length,
  };

  const pendingLeaves = filteredLeaves.filter(leave => leave.status === 'pending');
  const approvedLeaves = filteredLeaves.filter(leave => leave.status === 'approved');
  const rejectedLeaves = filteredLeaves.filter(leave => leave.status === 'rejected');

  const LeaveTable = ({ leaves }: { leaves: typeof mockLeaveApplications }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{leave.employeeName}</span>
                </div>
              </TableCell>
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
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {leave.status === 'pending' && (
                    <>
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                        <Check className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <X className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {leaves.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                No leave applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600">Review and manage employee leave applications</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search leave applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

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
              <div className="text-sm text-gray-600">Pending Review</div>
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
              <div className="text-2xl font-bold text-red-600">{leaveStats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Applications Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({filteredLeaves.length})</TabsTrigger>
              <TabsTrigger value="pending" className="relative">
                Pending ({pendingLeaves.length})
                {pendingLeaves.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingLeaves.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedLeaves.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedLeaves.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <LeaveTable leaves={filteredLeaves} />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <LeaveTable leaves={pendingLeaves} />
            </TabsContent>
            
            <TabsContent value="approved" className="mt-6">
              <LeaveTable leaves={approvedLeaves} />
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-6">
              <LeaveTable leaves={rejectedLeaves} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}