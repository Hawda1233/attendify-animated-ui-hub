export interface College {
  id: string;
  name: string;
  code: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: string;
  college_id?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  colleges?: College;
}

export interface Student {
  id: string;
  student_id: string;
  full_name: string;
  email?: string;
  phone?: string;
  college_id: string;
  course: string;
  year: number;
  section?: string;
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
  created_by?: string;
  created_at: string;
  updated_at: string;
  colleges?: College;
}

export interface Attendance {
  id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
  notes?: string;
  marked_by?: string;
  created_at: string;
  updated_at: string;
  students?: Student;
}