import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Users, GraduationCap, Calendar, TrendingUp, BookOpen, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  totalStudents: number;
  totalColleges: number;
  attendanceToday: number;
  attendanceRate: number;
  studentsByYear: Array<{ year: number; count: number }>;
  studentsByStatus: Array<{ status: string; count: number; fill: string }>;
  attendanceByDate: Array<{ date: string; present: number; absent: number; late: number }>;
  studentsByCourse: Array<{ course: string; count: number }>;
}

const COLORS = {
  active: 'hsl(var(--chart-1))',
  inactive: 'hsl(var(--chart-2))',
  graduated: 'hsl(var(--chart-3))',
  transferred: 'hsl(var(--chart-4))',
  present: 'hsl(var(--chart-1))',
  absent: 'hsl(var(--chart-2))',
  late: 'hsl(var(--chart-3))',
};

const chartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--chart-1))",
  },
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  late: {
    label: "Late",
    color: "hsl(var(--chart-3))",
  },
};

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalStudents: 0,
    totalColleges: 0,
    attendanceToday: 0,
    attendanceRate: 0,
    studentsByYear: [],
    studentsByStatus: [],
    attendanceByDate: [],
    studentsByCourse: [],
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch basic counts
      const [studentsResult, collegesResult, attendanceResult] = await Promise.all([
        supabase.from('students').select('*', { count: 'exact' }),
        supabase.from('colleges').select('*', { count: 'exact' }),
        supabase.from('attendance').select('*').eq('date', new Date().toISOString().split('T')[0]),
      ]);

      // Fetch students by year
      const { data: studentsByYearData } = await supabase
        .from('students')
        .select('year')
        .eq('status', 'active');

      // Fetch students by status
      const { data: studentsByStatusData } = await supabase
        .from('students')
        .select('status');

      // Fetch attendance by date (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { data: attendanceByDateData } = await supabase
        .from('attendance')
        .select('date, status')
        .gte('date', sevenDaysAgo.toISOString().split('T')[0]);

      // Fetch students by course
      const { data: studentsByCourseData } = await supabase
        .from('students')
        .select('course')
        .eq('status', 'active');

      // Process data
      const studentsByYear = [1, 2, 3, 4].map(year => ({
        year,
        count: studentsByYearData?.filter(s => s.year === year).length || 0,
      }));

      const statusCounts = studentsByStatusData?.reduce((acc: any, student) => {
        acc[student.status] = (acc[student.status] || 0) + 1;
        return acc;
      }, {}) || {};

      const studentsByStatus = Object.entries(statusCounts).map(([status, count]: [string, any]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count,
        fill: COLORS[status as keyof typeof COLORS] || 'hsl(var(--chart-5))',
      }));

      // Process attendance by date
      const attendanceGrouped = attendanceByDateData?.reduce((acc: any, record) => {
        if (!acc[record.date]) {
          acc[record.date] = { present: 0, absent: 0, late: 0 };
        }
        acc[record.date][record.status] = (acc[record.date][record.status] || 0) + 1;
        return acc;
      }, {}) || {};

      const attendanceByDate = Object.entries(attendanceGrouped).map(([date, counts]: [string, any]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        present: counts.present || 0,
        absent: counts.absent || 0,
        late: counts.late || 0,
      }));

      // Process students by course
      const courseCounts = studentsByCourseData?.reduce((acc: any, student) => {
        acc[student.course] = (acc[student.course] || 0) + 1;
        return acc;
      }, {}) || {};

      const studentsByCourse = Object.entries(courseCounts)
        .map(([course, count]: [string, any]) => ({ course, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8); // Top 8 courses

      // Calculate attendance rate
      const totalAttendanceToday = attendanceResult.data?.length || 0;
      const presentToday = attendanceResult.data?.filter(a => a.status === 'present').length || 0;
      const attendanceRate = totalAttendanceToday > 0 ? (presentToday / totalAttendanceToday) * 100 : 0;

      setAnalytics({
        totalStudents: studentsResult.count || 0,
        totalColleges: collegesResult.count || 0,
        attendanceToday: totalAttendanceToday,
        attendanceRate,
        studentsByYear,
        studentsByStatus,
        attendanceByDate,
        studentsByCourse,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch analytics data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Insights and statistics about your institution</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and statistics about your institution
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all years and courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalColleges}</div>
            <p className="text-xs text-muted-foreground">
              Registered institutions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.attendanceToday}</div>
            <p className="text-xs text-muted-foreground">
              Records marked today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.attendanceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Present today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Student Distribution</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Trends</TabsTrigger>
          <TabsTrigger value="courses">Course Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Students by Year</CardTitle>
                <CardDescription>Distribution of active students across academic years</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart data={analytics.studentsByYear}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      tickFormatter={(value) => `Year ${value}`}
                    />
                    <YAxis />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Bar dataKey="count" fill="var(--color-students)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Students by Status</CardTitle>
                <CardDescription>Current status distribution of all students</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={analytics.studentsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analytics.studentsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends (Last 7 Days)</CardTitle>
              <CardDescription>Daily attendance patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart data={analytics.attendanceByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="present" stroke="var(--color-present)" strokeWidth={2} />
                  <Line type="monotone" dataKey="absent" stroke="var(--color-absent)" strokeWidth={2} />
                  <Line type="monotone" dataKey="late" stroke="var(--color-late)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Courses by Enrollment</CardTitle>
              <CardDescription>Most popular courses based on active student enrollment</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart data={analytics.studentsByCourse} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="course" type="category" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-students)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}