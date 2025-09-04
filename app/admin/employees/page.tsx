'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Plus, Mail, Phone, Building2, Calendar, FileText } from 'lucide-react';
import { baseURL } from '@/lib/utils';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Your JWT token
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${baseURL}api/admin/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(res.data); 
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [token]);

  const filteredEmployees = employees.filter(employee =>
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.professionalDetails?.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.professionalDetails?.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return <div className="p-6">Loading employees...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage and view all employee information</p>
        </div>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees by name, email, department, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
            <div className="text-sm text-gray-600">Total Employees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {employees.filter(emp => emp.role === 'employee').length}
            </div>
            <div className="text-sm text-gray-600">Employees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(employees.map(emp => emp.professionalDetails?.department)).size}
            </div>
            <div className="text-sm text-gray-600">Departments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {employees.filter(emp => new Date(emp.professionalDetails?.joiningDate).getFullYear() === new Date().getFullYear()).length}
            </div>
            <div className="text-sm text-gray-600">New This Year</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {employees.filter(emp => emp.documents?.resumeUrl).length}
            </div>
            <div className="text-sm text-gray-600">With Resume</div>
          </CardContent>
        </Card>
      </div>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.photo} alt={employee.name} />
                          <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-600">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                        {employee.professionalDetails?.department || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>{employee.professionalDetails?.designation || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        {employee.professionalDetails?.joiningDate 
                          ? new Date(employee.professionalDetails.joiningDate).toLocaleDateString() 
                          : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3 w-3 text-gray-400" />
                          <span className="text-xs">{employee.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3 w-3 text-gray-400" />
                          <span className="text-xs">{employee.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={employee.role === 'employee' ? 'default' : 'secondary'}>
                        {employee.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {employee.documents?.resumeUrl && (
                          <a href={employee.documents.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="flex items-center">
                              <FileText className="h-3 w-3 mr-1" /> Resume
                            </Button>
                          </a>
                        )}
                        {employee.documents?.aadharUrl && (
                          <a href={employee.documents.aadharUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">Aadhar</Button>
                          </a>
                        )}
                        {employee.documents?.panUrl && (
                          <a href={employee.documents.panUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">PAN</Button>
                          </a>
                        )}
                        {employee.documents?.graduationUrl && (
                          <a href={employee.documents.graduationUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">Graduation</Button>
                          </a>
                        )}
                        {employee.documents?.bankDetailUrl && (
                          <a href={employee.documents.bankDetailUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">Bank</Button>
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
