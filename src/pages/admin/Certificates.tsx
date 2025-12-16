import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Users, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRole } from '@/hooks/useAdminRole';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CertificateData {
  user_id: string;
  completed_at: string;
  email: string;
}

const AdminCertificates = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isLoading: adminLoading } = useAdminRole();

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

  // Fetch certificate data
  const { data: certificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ['admin-certificates'],
    queryFn: async () => {
      // Get all completed user_progress entries with profile emails
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

      // Get emails from profiles
      const userIds = progress.map(p => p.user_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Combine data
      const profileMap = new Map(profiles?.map(p => [p.id, p.email]) || []);
      
      return progress.map(p => ({
        user_id: p.user_id,
        completed_at: p.completed_at!,
        email: profileMap.get(p.user_id) || 'Unknown'
      })) as CertificateData[];
    },
    enabled: isAdmin && !adminLoading,
  });

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

  const totalCertificates = certificates?.length || 0;
  const firstCertificate = certificates?.[certificates.length - 1];
  const latestCertificate = certificates?.[0];

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Certificate Dashboard</h1>
          <p className="text-muted-foreground">Track Learning Studio completion certificates</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {certificatesLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{totalCertificates}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">First Issued</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {certificatesLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : firstCertificate ? (
                <div className="text-lg font-medium">
                  {new Date(firstCertificate.completed_at).toLocaleDateString()}
                </div>
              ) : (
                <div className="text-muted-foreground">No certificates yet</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Recent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {certificatesLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : latestCertificate ? (
                <div className="text-lg font-medium">
                  {new Date(latestCertificate.completed_at).toLocaleDateString()}
                </div>
              ) : (
                <div className="text-muted-foreground">No certificates yet</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recipients Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Certificate Recipients
            </CardTitle>
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
                <p className="text-sm mt-1">Certificates are awarded when teachers complete all Learning Studio courses.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminCertificates;
