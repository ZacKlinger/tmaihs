import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { usePersistentProgress } from '@/hooks/usePersistentProgress';
import { Award, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { TIERS, COURSE_NAMES } from '@/lib/studioTiers';

const Certificate = () => {
  const { user, loading: authLoading } = useAuth();
  const { allCoursesCompleted, completedAt, loading: progressLoading } = usePersistentProgress();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);

  const allCourseIds = TIERS.flatMap(tier => tier.courseIds);

  useEffect(() => {
    if (!authLoading && !progressLoading) {
      if (!user || !allCoursesCompleted) {
        navigate('/learning-studio');
      }
    }
  }, [user, allCoursesCompleted, authLoading, progressLoading, navigate]);

  const handleDownload = () => {
    // Simple print-to-PDF approach
    window.print();
  };

  if (authLoading || progressLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user || !allCoursesCompleted) {
    return null;
  }

  const completionDate = completedAt 
    ? new Date(completedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Controls - hidden in print */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learning-studio')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Studio
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download Certificate
          </Button>
        </div>

        {/* Certificate */}
        <div 
          ref={certificateRef}
          className="bg-gradient-to-br from-background via-background to-primary/5 border-4 border-primary/20 rounded-xl p-8 md:p-12 shadow-xl print:shadow-none print:border-2"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <Award className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Certificate of Completion
            </h1>
            <p className="text-muted-foreground">AI Fluency for Educators</p>
          </div>

          {/* Recipient */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">This certifies that</p>
            <p className="text-2xl font-display font-semibold text-foreground border-b-2 border-primary/30 pb-2 inline-block px-8">
              {user.email}
            </p>
          </div>

          {/* Achievement */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-4">
              has successfully completed all micro-courses in the
            </p>
            <p className="text-xl font-semibold text-primary mb-4">
              TMAHS Learning Studio
            </p>
            <p className="text-sm text-muted-foreground">
              Demonstrating proficiency in AI-assisted teaching methodologies
            </p>
          </div>

          {/* Courses Grid */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground text-center mb-4">
              Courses Completed
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {allCourseIds.map((courseId) => (
                <div 
                  key={courseId}
                  className="flex items-center gap-2 p-2 bg-muted/50 rounded"
                >
                  <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="truncate">{COURSE_NAMES[courseId] || courseId}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Signature */}
          <div className="flex justify-between items-end pt-8 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground">Date of Completion</p>
              <p className="font-medium">{completionDate}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg text-primary">Phoenix AI Academy</p>
              <p className="text-xs text-muted-foreground">
                Thurgood Marshall Academic High School
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Certificate;
