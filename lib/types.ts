export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  department?: string;
  position?: string;
  joinDate?: string;
  phone?: string;
  status?: 'active' | 'inactive';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  phone: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  hours?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
  teamMembers: string[];
  progress: number;
}

export interface Team {
  id: string;
  name: string;
  lead: string;
  members: string[];
  department: string;
  projects: string[];
}

export interface LeaveApplication {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'other';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
}

export interface Task {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedHours?: number;
  actualHours?: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'employee') => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'role'>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}