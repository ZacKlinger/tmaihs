import { useState, useCallback } from 'react';

export interface CourseProgress {
  courseId: string;
  completedSections: string[];
  cfuAnswers: Record<string, { correct: boolean; selectedAnswer: string }>;
  isCompleted: boolean;
}

export interface StudioProgress {
  courses: Record<string, CourseProgress>;
  totalCoursesCompleted: number;
}

export const useStudioProgress = () => {
  const [progress, setProgress] = useState<StudioProgress>({
    courses: {},
    totalCoursesCompleted: 0,
  });

  const initCourse = useCallback((courseId: string) => {
    setProgress((prev) => {
      if (prev.courses[courseId]) return prev;
      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseId]: {
            courseId,
            completedSections: [],
            cfuAnswers: {},
            isCompleted: false,
          },
        },
      };
    });
  }, []);

  const completeSection = useCallback((courseId: string, sectionId: string) => {
    setProgress((prev) => {
      const course = prev.courses[courseId];
      if (!course || course.completedSections.includes(sectionId)) return prev;
      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseId]: {
            ...course,
            completedSections: [...course.completedSections, sectionId],
          },
        },
      };
    });
  }, []);

  const answerCFU = useCallback(
    (courseId: string, cfuId: string, selectedAnswer: string, isCorrect: boolean) => {
      setProgress((prev) => {
        const course = prev.courses[courseId];
        if (!course) return prev;
        return {
          ...prev,
          courses: {
            ...prev.courses,
            [courseId]: {
              ...course,
              cfuAnswers: {
                ...course.cfuAnswers,
                [cfuId]: { correct: isCorrect, selectedAnswer },
              },
            },
          },
        };
      });
    },
    []
  );

  const completeCourse = useCallback((courseId: string) => {
    setProgress((prev) => {
      const course = prev.courses[courseId];
      if (!course || course.isCompleted) return prev;
      return {
        ...prev,
        totalCoursesCompleted: prev.totalCoursesCompleted + 1,
        courses: {
          ...prev.courses,
          [courseId]: {
            ...course,
            isCompleted: true,
          },
        },
      };
    });
  }, []);

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

  return {
    progress,
    initCourse,
    completeSection,
    answerCFU,
    completeCourse,
    getCourseProgress,
  };
};
