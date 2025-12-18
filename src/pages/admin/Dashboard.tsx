import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Calendar, 
  TrendingUp, 
  GraduationCap,
  BookOpen,
  Globe,
  Download,
  Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRole } from '@/hooks/useAdminRole';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface UserData {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string | null;
  courses_completed: number;
  has_certificate: boolean;
}

interface CertificateData {
  user_id: string;
  completed_at: string;
  email: string;
}

const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(142, 76%, 36%)',
  'hsl(38, 92%, 50%)',
  'hsl(280, 65%, 60%)',
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isLoading: adminLoading } = useAdminRole();
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  // Fetch all users with their progress
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, display_name, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get course progress for all users
      const { data: courseProgress, error: progressError } = await supabase
        .from('course_progress')
        .select('user_id, is_completed');

      if (progressError) throw progressError;

      // Get certificates
      const { data: userProgress, error: userProgressError } = await supabase
        .from('user_progress')
        .select('user_id, all_courses_completed');

      if (userProgressError) throw userProgressError;

      // Aggregate data
      const progressMap = new Map<string, number>();
      courseProgress?.forEach(cp => {
        if (cp.is_completed) {
          progressMap.set(cp.user_id, (progressMap.get(cp.user_id) || 0) + 1);
        }
      });

      const certificateSet = new Set(
        userProgress?.filter(up => up.all_courses_completed).map(up => up.user_id)
      );

      return (profiles || []).map(p => ({
        id: p.id,
        email: p.email,
        display_name: p.display_name,
        created_at: p.created_at,
        courses_completed: progressMap.get(p.id) || 0,
        has_certificate: certificateSet.has(p.id)
      })) as UserData[];
    },
    enabled: isAdmin && !adminLoading,
  });

  // Fetch certificate data
  const { data: certificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ['admin-certificates'],
    queryFn: async () => {
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('user_id, completed_at')
        .eq('all_courses_completed', true)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false });

      if (progressError) throw progressError;

      if (!progress || progress.length === 0) {
        return [];
      }

      const userIds = progress.map(p => p.user_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      const profileMap = new Map(profiles?.map(p => [p.id, p.email]) || []);
      
      return progress.map(p => ({
        user_id: p.user_id,
        completed_at: p.completed_at!,
        email: profileMap.get(p.user_id) || 'Unknown'
      })) as CertificateData[];
    },
    enabled: isAdmin && !adminLoading,
  });

  // Fetch course progress stats
  const { data: courseStats } = useQuery({
    queryKey: ['admin-course-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_progress')
        .select('course_id, is_completed');

      if (error) throw error;

      // Aggregate by course
      const statsMap = new Map<string, { total: number; completed: number }>();
      data?.forEach(cp => {
        const existing = statsMap.get(cp.course_id) || { total: 0, completed: 0 };
        existing.total++;
        if (cp.is_completed) existing.completed++;
        statsMap.set(cp.course_id, existing);
      });

      return Array.from(statsMap.entries()).map(([course_id, stats]) => ({
        name: formatCourseName(course_id),
        enrolled: stats.total,
        completed: stats.completed,
        rate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
      }));
    },
    enabled: isAdmin && !adminLoading,
  });

  const formatCourseName = (courseId: string) => {
    return courseId
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .substring(0, 20);
  };

  const filteredUsers = users?.filter(u => 
    u.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    (u.display_name?.toLowerCase().includes(userSearchTerm.toLowerCase()))
  );

  const exportToCsv = () => {
    if (!certificates) return;
    
    const csvContent = [
      ['Email', 'Completion Date'].join(','),
      ...certificates.map(c => [c.email, new Date(c.completed_at).toISOString()].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificates-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading || adminLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const totalUsers = users?.length || 0;
  const totalCertificates = certificates?.length || 0;
  const completionRate = totalUsers > 0 
    ? Math.round((totalCertificates / totalUsers) * 100) 
    : 0;
  
  // Users in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentUsers = users?.filter(u => 
    u.created_at && new Date(u.created_at) > thirtyDaysAgo
  ).length || 0;

  // Pie chart data for user status
  const userStatusData = [
    { name: 'Certified', value: totalCertificates },
    { name: 'In Progress', value: totalUsers - totalCertificates }
  ].filter(d => d.value > 0);

  return (
    <Layout>
      <div className="container py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of Phoenix Educator AI platform analytics</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-primary">{totalUsers}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                +{recentUsers} in last 30 days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
              <Award className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              {certificatesLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{totalCertificates}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Program completions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {usersLoading || certificatesLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{completionRate}%</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Users who earned certificate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{courseStats?.length || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Courses with enrollments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Course Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Course Completion Rates
              </CardTitle>
              <CardDescription>Percentage of enrolled users who completed each course</CardDescription>
            </CardHeader>
            <CardContent>
              {courseStats && courseStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseStats} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={100} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                      formatter={(value: number) => [`${value}%`, 'Completion Rate']}
                    />
                    <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No course data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                User Status Distribution
              </CardTitle>
              <CardDescription>Breakdown of certified vs in-progress users</CardDescription>
            </CardHeader>
            <CardContent>
              {userStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No user data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  All Users
                </CardTitle>
                <CardDescription>Search and view all registered users</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filteredUsers && filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-center">Courses</TableHead>
                      <TableHead className="text-center">Certificate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.slice(0, 50).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.display_name || '—'}</TableCell>
                        <TableCell>
                          {user.created_at 
                            ? new Date(user.created_at).toLocaleDateString() 
                            : '—'}
                        </TableCell>
                        <TableCell className="text-center">{user.courses_completed}</TableCell>
                        <TableCell className="text-center">
                          {user.has_certificate ? (
                            <Award className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredUsers.length > 50 && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Showing 50 of {filteredUsers.length} users
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No users found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Certificate Recipients */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certificate Recipients
                </CardTitle>
                <CardDescription>Users who completed the full program</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportToCsv}
                disabled={!certificates || certificates.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {certificatesLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : certificates && certificates.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Completion Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.user_id}>
                      <TableCell className="font-medium">{cert.email}</TableCell>
                      <TableCell>
                        {new Date(cert.completed_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No certificates have been issued yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;