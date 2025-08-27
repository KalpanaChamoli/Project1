import { Employee, AttendanceRecord, Project, Team, LeaveApplication, Task, User } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'john.doe@company.com',
    name: 'John Doe',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2022-03-15',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '3',
    email: 'jane.smith@company.com',
    name: 'Jane Smith',
    role: 'employee',
    department: 'Design',
    position: 'UI/UX Designer',
    joinDate: '2023-01-10',
    phone: '+1 (555) 987-6543',
  },
];

// Mock Employees Data
export const mockEmployees: Employee[] = [
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2022-03-15',
    phone: '+1 (555) 123-4567',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Design',
    position: 'UI/UX Designer',
    joinDate: '2023-01-10',
    phone: '+1 (555) 987-6543',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    joinDate: '2023-06-01',
    phone: '+1 (555) 456-7890',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    joinDate: '2022-09-20',
    phone: '+1 (555) 234-5678',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '6',
    name: 'David Brown',
    email: 'david.brown@company.com',
    department: 'Engineering',
    position: 'Backend Developer',
    joinDate: '2021-11-30',
    phone: '+1 (555) 345-6789',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?w=150&h=150&fit=crop&crop=face',
  },
];

// Mock Attendance Data
export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: '2',
    employeeName: 'John Doe',
    date: '2024-01-15',
    checkIn: '09:00',
    checkOut: '17:30',
    status: 'present',
    hours: 8.5,
  },
  {
    id: '2',
    employeeId: '3',
    employeeName: 'Jane Smith',
    date: '2024-01-15',
    checkIn: '09:15',
    checkOut: '17:45',
    status: 'late',
    hours: 8.5,
  },
  {
    id: '3',
    employeeId: '4',
    employeeName: 'Mike Johnson',
    date: '2024-01-15',
    status: 'absent',
    hours: 0,
  },
  {
    id: '4',
    employeeId: '5',
    employeeName: 'Sarah Wilson',
    date: '2024-01-15',
    checkIn: '09:00',
    checkOut: '13:00',
    status: 'half-day',
    hours: 4,
  },
];

// Mock Projects Data
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-04-30',
    teamMembers: ['2', '4', '6'],
    progress: 65,
  },
  {
    id: '2',
    name: 'Mobile App Design',
    description: 'Designing user interface for the company mobile application',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    teamMembers: ['3'],
    progress: 40,
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Q1 marketing campaign for product launch',
    status: 'completed',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    teamMembers: ['5'],
    progress: 100,
  },
];

// Mock Teams Data
export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Team',
    lead: 'John Doe',
    members: ['2', '4'],
    department: 'Engineering',
    projects: ['1'],
  },
  {
    id: '2',
    name: 'Design Team',
    lead: 'Jane Smith',
    members: ['3'],
    department: 'Design',
    projects: ['2'],
  },
  {
    id: '3',
    name: 'Backend Team',
    lead: 'David Brown',
    members: ['6'],
    department: 'Engineering',
    projects: ['1'],
  },
  {
    id: '4',
    name: 'Marketing Team',
    lead: 'Sarah Wilson',
    members: ['5'],
    department: 'Marketing',
    projects: ['3'],
  },
];

// Mock Leave Applications Data
export const mockLeaveApplications: LeaveApplication[] = [
  {
    id: '1',
    employeeId: '2',
    employeeName: 'John Doe',
    type: 'vacation',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    days: 5,
    reason: 'Family vacation',
    status: 'pending',
    appliedDate: '2024-01-15',
  },
  {
    id: '2',
    employeeId: '3',
    employeeName: 'Jane Smith',
    type: 'sick',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    days: 3,
    reason: 'Medical treatment',
    status: 'approved',
    appliedDate: '2024-01-19',
    approvedBy: 'Admin User',
  },
  {
    id: '3',
    employeeId: '4',
    employeeName: 'Mike Johnson',
    type: 'personal',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    days: 3,
    reason: 'Personal matters',
    status: 'rejected',
    appliedDate: '2024-01-25',
    approvedBy: 'Admin User',
  },
];

// Mock Tasks Data
export const mockTasks: Task[] = [
  {
    id: '1',
    employeeId: '2',
    employeeName: 'John Doe',
    title: 'Implement user authentication',
    description: 'Create login and registration functionality for the e-commerce platform',
    date: '2024-01-15',
    status: 'in-progress',
    priority: 'high',
    estimatedHours: 8,
    actualHours: 6,
  },
  {
    id: '2',
    employeeId: '3',
    employeeName: 'Jane Smith',
    title: 'Design product page mockups',
    description: 'Create wireframes and mockups for product detail pages',
    date: '2024-01-15',
    status: 'completed',
    priority: 'medium',
    estimatedHours: 6,
    actualHours: 5,
  },
  {
    id: '3',
    employeeId: '4',
    employeeName: 'Mike Johnson',
    title: 'Implement responsive navigation',
    description: 'Build mobile-responsive navigation component',
    date: '2024-01-15',
    status: 'pending',
    priority: 'medium',
    estimatedHours: 4,
  },
];

// Helper functions for mock data management
export const getEmployeeById = (id: string): Employee | undefined => 
  mockEmployees.find(emp => emp.id === id);

export const getEmployeesByIds = (ids: string[]): Employee[] =>
  mockEmployees.filter(emp => ids.includes(emp.id));

export const getAttendanceByDate = (date: string): AttendanceRecord[] =>
  mockAttendance.filter(record => record.date === date);

export const getTasksByEmployeeId = (employeeId: string): Task[] =>
  mockTasks.filter(task => task.employeeId === employeeId);

export const getLeavesByEmployeeId = (employeeId: string): LeaveApplication[] =>
  mockLeaveApplications.filter(leave => leave.employeeId === employeeId);