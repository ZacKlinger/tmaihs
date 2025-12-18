import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TIERS } from '@/lib/studioTiers';
import { 
  getTotalModulesForCourse, 
  getModulesForCourse,
  ALL_COURSE_IDS 
} from '@/lib/moduleDefinitions';
import {
  computeCourseProgressPercent,
  computeProgramProgressPercent,
  determineCourseStatus,
  CourseStatus,
  CourseProgressData,
} from '@/lib/progressComputation';
import type { CourseProgress } from '@/hooks/useStudioProgress';

interface CheckAttempt {
  attemptId: string;
  moduleId: string;
  checkId: string;
  timestamp: string;
  answers: Record<string, string>;
  itemCorrectness: Record<string, boolean>;
  score: number;
  passed: boolean;
}

interface ModuleProgressState {
  moduleId: string;
  mastered: boolean;
  masteredAt: string | null;
}

interface PersistentProgressState {
  courses: Record<string, CourseProgress & { courseStatus: CourseStatus }>;
  moduleProgress: Record<string, ModuleProgressState>;
  totalCoursesCompleted: number;
  bypassAttempts: Record<number, boolean>;
  allCoursesCompleted: boolean;
  completedAt: string | null;
}

// Convert old course progress to new format with courseStatus
const convertToProgressData = (
  courses: Record<string, CourseProgress & { courseStatus?: CourseStatus }>
): Record<string, CourseProgressData> => {
  const result: Record<string, CourseProgressData> = {};
  
  for (const [courseId, course] of Object.entries(courses)) {
    // Map completed sections to module IDs for mastery tracking
    const modules = getModulesForCourse(courseId);
    const masteredModuleIds: string[] = [];
    
    // A section is mastered if it's in completedSections
    course.completedSections.forEach((sectionId, index) => {
      if (modules[index]) {
        masteredModuleIds.push(modules[index].moduleId);
      }
    });
    
    result[courseId] = {
      courseId,
      courseStatus: course.courseStatus || (course.isCompleted ? 'completed' : 'not_started'),
      masteredModuleIds,
      isCompleted: course.isCompleted,
    };
  }
  
  return result;
};

export const usePersistentProgress = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<PersistentProgressState>({
    courses: {},
    moduleProgress: {},
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
      guestProgressRef.current = progress;
      wasAuthenticatedRef.current = false;
    }
  }, [progress, isAuthenticated, authLoading]);

  // Save course progress to database
  const saveCourseProgressToDb = useCallback(async (
    userId: string, 
    courseId: string, 
    courseProgress: CourseProgress & { courseStatus?: CourseStatus }
  ) => {
    try {
      const { error } = await supabase
        .from('course_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          completed_sections: courseProgress.completedSections,
          cfu_answers: courseProgress.cfuAnswers,
          is_completed: courseProgress.isCompleted,
          course_status: courseProgress.courseStatus || 'not_started',
        }, {
          onConflict: 'user_id,course_id',
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving course progress:', error);
    }
  }, []);

  // Save module mastery
  const saveModuleMastery = useCallback(async (
    userId: string,
    moduleId: string,
    mastered: boolean
  ) => {
    try {
      const { error } = await supabase
        .from('module_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          mastered,
          mastered_at: mastered ? new Date().toISOString() : null,
        }, {
          onConflict: 'user_id,module_id',
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving module mastery:', error);
    }
  }, []);

  // Record check attempt
  const recordCheckAttempt = useCallback(async (
    moduleId: string,
    checkId: string,
    answers: Record<string, string>,
    itemCorrectness: Record<string, boolean>,
    score: number,
    passed: boolean
  ): Promise<CheckAttempt | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('check_attempts')
        .insert({
          user_id: user.id,
          module_id: moduleId,
          check_id: checkId,
          answers,
          item_correctness: itemCorrectness,
          score,
          passed,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        attemptId: data.id,
        moduleId: data.module_id,
        checkId: data.check_id,
        timestamp: data.created_at,
        answers: data.answers as Record<string, string>,
        itemCorrectness: data.item_correctness as Record<string, boolean>,
        score: data.score,
        passed: data.passed,
      };
    } catch (error) {
      console.error('Error recording check attempt:', error);
      return null;
    }
  }, [user]);

  // Migrate guest progress to database
  const migrateGuestProgress = useCallback(async (userId: string, guestProgress: PersistentProgressState) => {
    console.log('Migrating guest progress to database:', guestProgress);
    
    const coursesToSave = Object.values(guestProgress.courses).filter(
      course => course.completedSections.length > 0 || 
                Object.keys(course.cfuAnswers).length > 0 || 
                course.isCompleted
    );

    for (const course of coursesToSave) {
      await saveCourseProgressToDb(userId, course.courseId, course);
    }

    // Save module progress
    for (const [moduleId, moduleState] of Object.entries(guestProgress.moduleProgress)) {
      if (moduleState.mastered) {
        await saveModuleMastery(userId, moduleId, true);
      }
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
  }, [saveCourseProgressToDb, saveModuleMastery]);

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

      // Load module progress
      const { data: moduleData, error: moduleError } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id);

      if (moduleError) throw moduleError;

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

      const hasDbProgress = (courseData && courseData.length > 0);
      const hasGuestProgress = guestProgress && (
        Object.keys(guestProgress.courses).length > 0 ||
        Object.keys(guestProgress.bypassAttempts).length > 0
      );

      if (!hasDbProgress && hasGuestProgress) {
        await migrateGuestProgress(user.id, guestProgress);
        setProgress(guestProgress);
        guestProgressRef.current = null;
      } else {
        // Transform course data from database
        const courses: Record<string, CourseProgress & { courseStatus: CourseStatus }> = {};
        let completedCount = 0;
        
        courseData?.forEach((cp) => {
          const courseStatus = (cp.course_status as CourseStatus) || 'not_started';
          courses[cp.course_id] = {
            courseId: cp.course_id,
            completedSections: cp.completed_sections || [],
            cfuAnswers: (cp.cfu_answers as Record<string, { correct: boolean; selectedAnswer: string }>) || {},
            isCompleted: cp.is_completed,
            courseStatus,
          };
          if (cp.is_completed || courseStatus === 'credited') completedCount++;
        });

        // Transform module data
        const moduleProgress: Record<string, ModuleProgressState> = {};
        moduleData?.forEach((mp) => {
          moduleProgress[mp.module_id] = {
            moduleId: mp.module_id,
            mastered: mp.mastered,
            masteredAt: mp.mastered_at,
          };
        });

        // Transform bypass data
        const bypassAttempts: Record<number, boolean> = {};
        bypassData?.forEach((ba) => {
          bypassAttempts[ba.tier_number] = ba.attempted;
        });

        setProgress({
          courses,
          moduleProgress,
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
  const saveCourseProgress = useCallback(async (
    courseId: string, 
    courseProgress: CourseProgress & { courseStatus?: CourseStatus }
  ) => {
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
          course_status: courseProgress.courseStatus || 'not_started',
        }, {
          onConflict: 'user_id,course_id',
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving course progress:', error);
    }
  }, [user]);

  // Check and update overall completion
  const checkOverallCompletion = useCallback(async (
    courses: Record<string, CourseProgress & { courseStatus?: CourseStatus }>
  ) => {
    if (!user) return;

    const allComplete = ALL_COURSE_IDS.every(id => {
      const course = courses[id];
      return course?.isCompleted || course?.courseStatus === 'credited';
    });

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
      const newCourse: CourseProgress & { courseStatus: CourseStatus } = {
        courseId,
        completedSections: [],
        cfuAnswers: {},
        isCompleted: false,
        courseStatus: 'not_started',
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

  // Mark a module as mastered
  const markModuleMastered = useCallback((moduleId: string, courseId: string) => {
    setProgress(prev => {
      const newModuleProgress = {
        ...prev.moduleProgress,
        [moduleId]: {
          moduleId,
          mastered: true,
          masteredAt: new Date().toISOString(),
        },
      };

      // Also update the course's completed sections for backward compatibility
      const course = prev.courses[courseId];
      const modules = getModulesForCourse(courseId);
      const moduleIndex = modules.findIndex(m => m.moduleId === moduleId);
      const sectionId = `section-${moduleIndex + 1}`;
      
      let updatedCourse = course;
      if (course && !course.completedSections.includes(sectionId)) {
        updatedCourse = {
          ...course,
          completedSections: [...course.completedSections, sectionId],
          courseStatus: 'in_progress' as CourseStatus,
        };
      }

      // Save to DB
      if (user) {
        saveModuleMastery(user.id, moduleId, true);
        if (updatedCourse !== course) {
          saveCourseProgress(courseId, updatedCourse);
        }
      }

      return {
        ...prev,
        moduleProgress: newModuleProgress,
        courses: course ? {
          ...prev.courses,
          [courseId]: updatedCourse,
        } : prev.courses,
      };
    });
  }, [user, saveModuleMastery, saveCourseProgress]);

  // Complete section with debounced save
  const completeSection = useCallback((courseId: string, sectionId: string) => {
    setProgress((prev) => {
      const course = prev.courses[courseId];
      if (!course || course.completedSections.includes(sectionId)) return prev;
      
      const updatedCourse = {
        ...course,
        completedSections: [...course.completedSections, sectionId],
        courseStatus: 'in_progress' as CourseStatus,
      };

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

  // Answer CFU - now tracks mastery and attempts
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
          courseStatus: 'in_progress' as CourseStatus,
        };

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
      
      const updatedCourse = { 
        ...course, 
        isCompleted: true,
        courseStatus: 'completed' as CourseStatus,
      };
      const newCourses = {
        ...prev.courses,
        [courseId]: updatedCourse,
      };

      saveCourseProgress(courseId, updatedCourse);
      checkOverallCompletion(newCourses);

      return {
        ...prev,
        totalCoursesCompleted: prev.totalCoursesCompleted + 1,
        courses: newCourses,
      };
    });
  }, [saveCourseProgress, checkOverallCompletion]);

  // Mark module complete via quiz (test-out / credit)
  const markModuleCompleteViaQuiz = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const existingCourse = prev.courses[moduleId];
      const updatedCourse = existingCourse 
        ? { 
            ...existingCourse, 
            isCompleted: true,
            courseStatus: 'credited' as CourseStatus,
          }
        : {
            courseId: moduleId,
            completedSections: [],
            cfuAnswers: {},
            isCompleted: true,
            courseStatus: 'credited' as CourseStatus,
          };
      
      const wasAlreadyComplete = existingCourse?.isCompleted || false;
      const newCourses = {
        ...prev.courses,
        [moduleId]: updatedCourse,
      };

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

  // Get course progress percentage using new computation
  const getCourseProgress = useCallback(
    (courseId: string, _totalSections: number, _totalCFUs: number): number => {
      const course = progress.courses[courseId];
      if (!course) return 0;
      
      // Use new computation layer
      const progressData: CourseProgressData = {
        courseId,
        courseStatus: course.courseStatus || 'not_started',
        masteredModuleIds: course.completedSections.map((sectionId, _index) => {
          const modules = getModulesForCourse(courseId);
          const sectionNum = parseInt(sectionId.replace('section-', ''), 10) - 1;
          return modules[sectionNum]?.moduleId || sectionId;
        }),
        isCompleted: course.isCompleted,
      };
      
      return computeCourseProgressPercent(progressData, courseId);
    },
    [progress]
  );

  // Get program progress percentage
  const getProgramProgress = useCallback((): number => {
    const progressData = convertToProgressData(progress.courses);
    return computeProgramProgressPercent(progressData);
  }, [progress.courses]);

  // Get completed course IDs
  const getCompletedCourseIds = useCallback((): string[] => {
    return Object.values(progress.courses)
      .filter(course => course.isCompleted || course.courseStatus === 'credited')
      .map(course => course.courseId);
  }, [progress]);

  // Get course status
  const getCourseStatus = useCallback((courseId: string): CourseStatus => {
    return progress.courses[courseId]?.courseStatus || 'not_started';
  }, [progress.courses]);

  // Check if module is mastered
  const isModuleMastered = useCallback((moduleId: string): boolean => {
    return progress.moduleProgress[moduleId]?.mastered || false;
  }, [progress.moduleProgress]);

  // Load progress when user becomes authenticated
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated && !wasAuthenticatedRef.current) {
        const guestProgress = guestProgressRef.current;
        loadProgress(guestProgress);
        wasAuthenticatedRef.current = true;
      } else if (isAuthenticated && wasAuthenticatedRef.current) {
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
    getProgramProgress,
    getCompletedCourseIds,
    getCourseStatus,
    // New mastery functions
    markModuleMastered,
    isModuleMastered,
    recordCheckAttempt,
  };
};
