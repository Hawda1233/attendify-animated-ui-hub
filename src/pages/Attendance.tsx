import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student, Attendance as AttendanceType } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Save, Search, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentWithAttendance extends Student {
  attendance?: AttendanceType;
}

export default function Attendance() {
  const [students, setStudents] = useState<StudentWithAttendance[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentWithAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchStudentsAndAttendance();
  }, [selectedDate]);

  useEffect(() => {
    filterStudents();
  }, [students, searchQuery, selectedCourse, selectedSection, selectedYear]);

  const fetchStudentsAndAttendance = async () => {
    try {
      setLoading(true);

      // Fetch all active students
      const { data: studentsData, error: studentsError } = await supabase
        .from('students')
        .select('*, colleges(*)')
        .eq('status', 'active')
        .order('full_name');

      if (studentsError) throw studentsError;

      // Fetch attendance for selected date
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .select('*')
        .eq('date', selectedDate);

      if (attendanceError) throw attendanceError;

      // Merge students with their attendance data
      const studentsWithAttendance = studentsData?.map(student => {
        const attendance = attendanceData?.find(a => a.student_id === student.id);
        return { ...student, attendance };
      }) || [];

      setStudents(studentsWithAttendance);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch students and attendance data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(student =>
        student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.course.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by course
    if (selectedCourse) {
      filtered = filtered.filter(student => student.course === selectedCourse);
    }

    // Filter by section
    if (selectedSection) {
      filtered = filtered.filter(student => student.section === selectedSection);
    }

    // Filter by year
    if (selectedYear) {
      filtered = filtered.filter(student => student.year.toString() === selectedYear);
    }

    setFilteredStudents(filtered);
  };

  // Get unique values for filter dropdowns
  const getUniqueValues = () => {
    const courses = [...new Set(students.map(s => s.course))].sort();
    const sections = [...new Set(students.map(s => s.section).filter(Boolean))].sort();
    const years = [...new Set(students.map(s => s.year.toString()))].sort();
    return { courses, sections, years };
  };

  const { courses, sections, years } = getUniqueValues();

  const updateAttendanceStatus = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          attendance: {
            id: student.attendance?.id || '',
            student_id: studentId,
            date: selectedDate,
            status,
            marked_by: user?.id || '',
            created_at: student.attendance?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        };
      }
      return student;
    }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      const attendanceRecords = students
        .filter(student => student.attendance)
        .map(student => ({
          student_id: student.id,
          date: selectedDate,
          status: student.attendance!.status,
          marked_by: user?.id,
        }));

      if (attendanceRecords.length === 0) {
        toast({
          title: 'Warning',
          description: 'No attendance records to save',
          variant: 'destructive',
        });
        return;
      }

      // Delete existing attendance for this date
      await supabase
        .from('attendance')
        .delete()
        .eq('date', selectedDate);

      // Insert new attendance records
      const { error } = await supabase
        .from('attendance')
        .insert(attendanceRecords);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Attendance saved for ${attendanceRecords.length} students`,
      });

      // Refresh data
      await fetchStudentsAndAttendance();
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast({
        title: 'Error',
        description: 'Failed to save attendance',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'absent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'late': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'excused': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = filteredStudents.filter(s => s.attendance?.status === 'present').length;
    const absent = filteredStudents.filter(s => s.attendance?.status === 'absent').length;
    const late = filteredStudents.filter(s => s.attendance?.status === 'late').length;
    const excused = filteredStudents.filter(s => s.attendance?.status === 'excused').length;
    const unmarked = total - present - absent - late - excused;

    return { total, present, absent, late, excused, unmarked };
  };

  const stats = getAttendanceStats();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-32 bg-muted rounded" />
        <div className="h-96 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Mark student attendance for today
          </p>
        </div>
        <Button onClick={saveAttendance} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Attendance'}
        </Button>
      </div>

      {/* Date Selection and Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Date
            </CardTitle>
            <CardDescription>
              Choose the date for attendance marking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>
              Today's attendance statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Present:</span>
                <span className="font-medium text-green-600">{stats.present}</span>
              </div>
              <div className="flex justify-between">
                <span>Absent:</span>
                <span className="font-medium text-red-600">{stats.absent}</span>
              </div>
              <div className="flex justify-between">
                <span>Unmarked:</span>
                <span className="font-medium text-gray-600">{stats.unmarked}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
          <CardDescription>
            Filter students by course, section, year, or search by name/ID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="All courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Section</label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="All sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All sections</SelectItem>
                  {sections.map(section => (
                    <SelectItem key={section} value={section}>{section}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All years</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>Year {year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Clear Filters</label>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCourse('');
                  setSelectedSection('');
                  setSelectedYear('');
                }}
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Attendance ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Mark attendance for each student
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStudents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.student_id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.full_name}</p>
                        <p className="text-sm text-muted-foreground">{student.colleges?.name}</p>
                      </div>
                    </TableCell>
                     <TableCell>
                       <div>
                         <p>{student.course}</p>
                         {student.section && (
                           <p className="text-sm text-muted-foreground">Section {student.section}</p>
                         )}
                       </div>
                     </TableCell>
                     <TableCell>Year {student.year}</TableCell>
                    <TableCell>
                      {student.attendance ? (
                        <Badge className={getStatusColor(student.attendance.status)}>
                          {student.attendance.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline">Not marked</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={student.attendance?.status || ''}
                        onValueChange={(value) => updateAttendanceStatus(student.id, value as any)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Mark" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                          <SelectItem value="excused">Excused</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
               <h3 className="text-lg font-medium mb-2">No students found</h3>
               <p className="text-muted-foreground">
                 {(searchQuery || selectedCourse || selectedSection || selectedYear) 
                   ? 'Try adjusting your search or filter criteria' 
                   : 'No active students to mark attendance for'}
               </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}