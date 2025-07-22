import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Calendar, BarChart3, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Student, Attendance } from '@/types/database';

interface DashboardStats {
  totalStudents: number;
  totalPresent: number;
  totalAbsent: number;
  attendanceRate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalPresent: 0,
    totalAbsent: 0,
    attendanceRate: 0
  });
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total students
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('*')
        .eq('status', 'active');

      if (studentsError) throw studentsError;

      // Fetch today's attendance
      const today = new Date().toISOString().split('T')[0];
      const { data: attendance, error: attendanceError } = await supabase
        .from('attendance')
        .select('*')
        .eq('date', today);

      if (attendanceError) throw attendanceError;

      // Calculate stats
      const totalStudents = students?.length || 0;
      const presentCount = attendance?.filter(a => a.status === 'present').length || 0;
      const absentCount = attendance?.filter(a => a.status === 'absent').length || 0;
      const attendanceRate = totalStudents > 0 ? (presentCount / totalStudents) * 100 : 0;

      setStats({
        totalStudents,
        totalPresent: presentCount,
        totalAbsent: absentCount,
        attendanceRate
      });

      // Get recent students
      const { data: recentStudentsData } = await supabase
        .from('students')
        .select('*, colleges(*)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentStudents(recentStudentsData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Add Student',
      description: 'Register a new student',
      icon: UserPlus,
      href: '/students/add',
      color: 'bg-blue-500'
    },
    {
      title: 'Take Attendance',
      description: 'Mark today\'s attendance',
      icon: Calendar,
      href: '/attendance',
      color: 'bg-green-500'
    },
    {
      title: 'View Analytics',
      description: 'Check attendance reports',
      icon: BarChart3,
      href: '/analytics',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with attendance today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Active students enrolled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalPresent}</div>
            <p className="text-xs text-muted-foreground">
              Students marked present
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.totalAbsent}</div>
            <p className="text-xs text-muted-foreground">
              Students marked absent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Today's attendance rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Recent Students */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you can perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Button variant="outline" className="w-full justify-start h-auto p-4">
                  <div className={`p-2 rounded-md ${action.color} mr-4`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
            <CardDescription>
              Latest student registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentStudents.length > 0 ? (
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{student.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.course} - Year {student.year}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.colleges?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{student.student_id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(student.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                <Link to="/students">
                  <Button variant="outline" className="w-full">
                    View All Students
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No students registered yet</p>
                <Link to="/students/add">
                  <Button className="mt-2">Add First Student</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}