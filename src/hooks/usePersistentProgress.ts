import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TIERS } from '@/lib/studioTiers';
import type { StudioProgress, CourseProgress } from '@/hooks/useStudioProgress';

const ALL_COURSE_IDS = TIERS.flatMap(tier => tier.courseIds);

interface PersistentProgressState {
  courses: Record<string, CourseProgress>;
  totalCoursesCompleted: number;
  bypassAttempts: Record<number, boolean>;
  allCoursesCompleted: boolean;
  completedAt: string | null;
}

export const usePersistentProgress = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<PersistentProgressState>({
    courses: {},
    totalCoursesCompleted: 0,
    bypassAttempts: {},
    allCoursesCompleted: false,
    completedAt: null,
  });
  const [loading, setLoading] = useState(true);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Track guest progress before authentication
  const guestProgressRef = useRef<PersistentProgressState | null>(null);
  const wasAuthenticatedRef = useRef<boolean>(false);

  // Capture guest progress before auth state changes
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Store current progress as guest progress
      guestProgressRef.current = progress;
      wasAuthenticatedRef.current = false;
    }
  }, [progress, isAuthenticated, authLoading]);

  // Save course progress to database (used during migration and normal saves)
  const saveCourseProgressToDb = useCallback(async (userId: string, courseId: string, courseProgress: CourseProgress) => {
    try {
      const { error } = await supabase
        .from('course_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          completed_sections: courseProgress.completedSections,
          cfu_answers: courseProgress.cfuAnswers,
          is_completed: courseProgress.isCompleted,
        }, {
          onConflict: 'user_id,course_id',
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving course progress:', error);
    }
  }, []);

  // Migrate guest progress to database
  const migrateGuestProgress = useCallback(async (userId: string, guestProgress: PersistentProgressState) => {
    console.log('Migrating guest progress to database:', guestProgress);
    
    // Save each course with progress
    const coursesToSave = Object.values(guestProgress.courses).filter(
      course => course.completedSections.length > 0 || 
                Object.keys(course.cfuAnswers).length > 0 || 
                course.isCompleted
    );

    for (const course of coursesToSave) {
      await saveCourseProgressToDb(userId, course.courseId, course);
    }

    // Save bypass attempts
    for (const [tierNum, attempted] of Object.entries(guestProgress.bypassAttempts)) {
      if (attempted) {
        try {
          await supabase
            .from('bypass_attempts')
            .upsert({
              user_id: userId,
              tier_number: parseInt(tierNum),
              attempted: true,
            }, {
              onConflict: 'user_id,tier_number',
            });
        } catch (error) {
          console.error('Error saving bypass attempt:', error);
        }
      }
    }

    console.log('Guest progress migration complete');
  }, [saveCourseProgressToDb]);

  // Load progress from database
  const loadProgress = useCallback(async (guestProgress: PersistentProgressState | null) => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Load course progress
      const { data: courseData, error: courseError } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user.id);

      if (courseError) throw courseError;

      // Load bypass attempts
      const { data: bypassData, error: bypassError } = await supabase
        .from('bypass_attempts')
        .select('*')
        .eq('user_id', user.id);

      if (bypassError) throw bypassError;

      // Load overall progress
      const { data: overallData, error: overallError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (overallError) throw overallError;

      // Check if database is empty (new user) and we have guest progress
      const hasDbProgress = (courseData && courseData.length > 0);
      const hasGuestProgress = guestProgress && (
        Object.keys(guestProgress.courses).length > 0 ||
        Object.keys(guestProgress.bypassAttempts).length > 0
      );

      if (!hasDbProgress && hasGuestProgress) {
        // New user with guest progress - migrate it
        await migrateGuestProgress(user.id, guestProgress);
        
        // Keep guest progress as current state
        setProgress(guestProgress);
        guestProgressRef.current = null;
      } else {
        // Transform course data from database
        const courses: Record<string, CourseProgress> = {};
        let completedCount = 0;
        
        courseData?.forEach((cp) => {
          courses[cp.course_id] = {
            courseId: cp.course_id,
            completedSections: cp.completed_sections || [],
            cfuAnswers: (cp.cfu_answers as Record<string, { correct: boolean; selectedAnswer: string }>) || {},
            isCompleted: cp.is_completed,
          };
          if (cp.is_completed) completedCount++;
        });

        // Transform bypass data
        const bypassAttempts: Record<number, boolean> = {};
        bypassData?.forEach((ba) => {
          bypassAttempts[ba.tier_number] = ba.attempted;
        });

        setProgress({
          courses,
          totalCoursesCompleted: completedCount,
          bypassAttempts,
          allCoursesCompleted: overallData?.all_courses_completed || false,
          completedAt: overallData?.completed_at || null,
        });
        
        guestProgressRef.current = null;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user, migrateGuestProgress]);

  // Save course progress to database (debounced)
  const saveCourseProgress = useCallback(async (courseId: string, courseProgress: CourseProgress) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('course_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          completed_sections: courseProgress.completedSections,
          cfu_answers: courseProgress.cfuAnswers,
          is_completed: courseProgress.isCompleted,
        }, {
          onConflict: 'user_id,course_id',
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving course progress:', error);
    }
  }, [user]);

  // Check and update overall completion
  const checkOverallCompletion = useCallback(async (courses: Record<string, CourseProgress>) => {
    if (!user) return;

    const completedIds = Object.values(courses)
      .filter(c => c.isCompleted)
      .map(c => c.courseId);

    const allComplete = ALL_COURSE_IDS.every(id => completedIds.includes(id));

    if (allComplete) {
      try {
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            all_courses_completed: true,
            completed_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id',
          });

        if (error) throw error;

        setProgress(prev => ({
          ...prev,
          allCoursesCompleted: true,
          completedAt: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error updating overall completion:', error);
      }
    }
  }, [user]);

  // Initialize course
  const initCourse = useCallback((courseId: string) => {
    setProgress((prev) => {
      if (prev.courses[courseId]) return prev;
      const newCourse: CourseProgress = {
        courseId,
        completedSections: [],
        cfuAnswers: {},
        isCompleted: false,
      };
      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseId]: newCourse,
        },
      };
    });
  }, []);

  // Complete section with debounced save
  const completeSection = useCallback((courseId: string, sectionId: string) => {
    setProgress((prev) => {
      const course = prev.courses[courseId];
      if (!course || course.completedSections.includes(sectionId)) return prev;
      
      const updatedCourse = {
        ...course,
        completedSections: [...course.completedSections, sectionId],
      };

      // Debounced save
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveCourseProgress(courseId, updatedCourse);
      }, 500);

      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseId]: updatedCourse,
        },
      };
    });
  }, [saveCourseProgress]);

  // Answer CFU
  const answerCFU = useCallback(
    (courseId: string, cfuId: string, selectedAnswer: string, isCorrect: boolean) => {
      setProgress((prev) => {
        const course = prev.courses[courseId];
        if (!course) return prev;
        
        const updatedCourse = {
          ...course,
          cfuAnswers: {
            ...course.cfuAnswers,
            [cfuId]: { correct: isCorrect, selectedAnswer },
          },
        };

        // Debounced save
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          saveCourseProgress(courseId, updatedCourse);
        }, 500);

        return {
          ...prev,
          courses: {
            ...prev.courses,
            [courseId]: updatedCourse,
          },
        };
      });
    },
    [saveCourseProgress]
  );

  // Complete course
  const completeCourse = useCallback((courseId: string) => {
    setProgress((prev) => {
      const course = prev.courses[courseId];
      if (!course || course.isCompleted) return prev;
      
      const updatedCourse = { ...course, isCompleted: true };
      const newCourses = {
        ...prev.courses,
        [courseId]: updatedCourse,
      };

      // Save immediately
      saveCourseProgress(courseId, updatedCourse);
      checkOverallCompletion(newCourses);

      return {
        ...prev,
        totalCoursesCompleted: prev.totalCoursesCompleted + 1,
        courses: newCourses,
      };
    });
  }, [saveCourseProgress, checkOverallCompletion]);

  // Mark module complete via quiz
  const markModuleCompleteViaQuiz = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const existingCourse = prev.courses[moduleId];
      const updatedCourse = existingCourse 
        ? { ...existingCourse, isCompleted: true }
        : {
            courseId: moduleId,
            completedSections: [],
            cfuAnswers: {},
            isCompleted: true,
          };
      
      const wasAlreadyComplete = existingCourse?.isCompleted || false;
      const newCourses = {
        ...prev.courses,
        [moduleId]: updatedCourse,
      };

      // Save immediately
      saveCourseProgress(moduleId, updatedCourse);
      checkOverallCompletion(newCourses);
      
      return {
        ...prev,
        totalCoursesCompleted: wasAlreadyComplete 
          ? prev.totalCoursesCompleted 
          : prev.totalCoursesCompleted + 1,
        courses: newCourses,
      };
    });
  }, [saveCourseProgress, checkOverallCompletion]);

  // Record bypass attempt
  const recordBypassAttempt = useCallback(async (tierNumber: number) => {
    setProgress((prev) => ({
      ...prev,
      bypassAttempts: {
        ...prev.bypassAttempts,
        [tierNumber]: true,
      },
    }));

    if (user) {
      try {
        await supabase
          .from('bypass_attempts')
          .upsert({
            user_id: user.id,
            tier_number: tierNumber,
            attempted: true,
          }, {
            onConflict: 'user_id,tier_number',
          });
      } catch (error) {
        console.error('Error saving bypass attempt:', error);
      }
    }
  }, [user]);

  // Check if bypass attempted
  const hasAttemptedBypass = useCallback((tierNumber: number): boolean => {
    return progress.bypassAttempts[tierNumber] || false;
  }, [progress.bypassAttempts]);

  // Get course progress percentage
  const getCourseProgress = useCallback(
    (courseId: string, totalSections: number, totalCFUs: number): number => {
      const course = progress.courses[courseId];
      if (!course) return 0;
      const sectionWeight = 0.6;
      const cfuWeight = 0.4;
      const sectionProgress = totalSections > 0 
        ? course.completedSections.length / totalSections 
        : 0;
      const correctCFUs = Object.values(course.cfuAnswers).filter((a) => a.correct).length;
      const cfuProgress = totalCFUs > 0 ? correctCFUs / totalCFUs : 0;
      return Math.round((sectionProgress * sectionWeight + cfuProgress * cfuWeight) * 100);
    },
    [progress]
  );

  // Get completed course IDs
  const getCompletedCourseIds = useCallback((): string[] => {
    return Object.values(progress.courses)
      .filter(course => course.isCompleted)
      .map(course => course.courseId);
  }, [progress]);

  // Load progress when user becomes authenticated
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated && !wasAuthenticatedRef.current) {
        // User just became authenticated - pass guest progress for potential migration
        const guestProgress = guestProgressRef.current;
        loadProgress(guestProgress);
        wasAuthenticatedRef.current = true;
      } else if (isAuthenticated && wasAuthenticatedRef.current) {
        // Already authenticated, just load
        loadProgress(null);
      } else {
        setLoading(false);
      }
    }
  }, [isAuthenticated, authLoading, loadProgress]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    progress,
    loading,
    isAuthenticated,
    allCoursesCompleted: progress.allCoursesCompleted,
    completedAt: progress.completedAt,
    // Actions
    initCourse,
    completeSection,
    answerCFU,
    completeCourse,
    markModuleCompleteViaQuiz,
    recordBypassAttempt,
    hasAttemptedBypass,
    getCourseProgress,
    getCompletedCourseIds,
  };
};
