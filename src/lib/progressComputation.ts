// Progress Computation Layer - Single Source of Truth
// All progress calculations go through these functions

import { getTotalModulesForCourse, TOTAL_COURSES, ALL_COURSE_IDS } from './moduleDefinitions';

export type CourseStatus = 'not_started' | 'in_progress' | 'completed' | 'credited';

export interface CourseProgressData {
  courseId: string;
  courseStatus: CourseStatus;
  masteredModuleIds: string[];
  isCompleted: boolean;
}

export interface ProgramProgressData {
  courses: Record<string, CourseProgressData>;
}

/**
 * Compute course progress percentage
 * - If courseStatus = 'credited' → 100%
 * - Otherwise: (masteredModules / totalModules) * 100
 * - Rounds to nearest whole percent
 */
export const computeCourseProgressPercent = (
  courseData: CourseProgressData | undefined,
  courseId: string
): number => {
  // If no data, course not started
  if (!courseData) return 0;
  
  // Credited courses are always 100%
  if (courseData.courseStatus === 'credited') return 100;
  
  // Completed courses are 100%
  if (courseData.isCompleted || courseData.courseStatus === 'completed') return 100;
  
  // Calculate based on mastered modules
  const totalModules = getTotalModulesForCourse(courseId);
  if (totalModules === 0) return 0;
  
  const masteredCount = courseData.masteredModuleIds.length;
  const percent = (masteredCount / totalModules) * 100;
  
  return Math.round(percent);
};

/**
 * Compute program progress percentage
 * - Average of all 10 course progress percentages
 * - Formula: (Σ courseProgressPercent) / 10
 * - Rounds to nearest whole percent
 */
export const computeProgramProgressPercent = (
  courses: Record<string, CourseProgressData>
): number => {
  let totalPercent = 0;
  
  for (const courseId of ALL_COURSE_IDS) {
    const courseData = courses[courseId];
    const coursePercent = computeCourseProgressPercent(courseData, courseId);
    totalPercent += coursePercent;
  }
  
  // Average across all 10 courses
  const programPercent = totalPercent / TOTAL_COURSES;
  
  return Math.round(programPercent);
};

/**
 * Check if a course is mastered (100% complete or credited)
 */
export const isCourseComplete = (courseData: CourseProgressData | undefined): boolean => {
  if (!courseData) return false;
  return courseData.isCompleted || 
         courseData.courseStatus === 'completed' || 
         courseData.courseStatus === 'credited';
};

/**
 * Get completed course IDs
 */
export const getCompletedCourseIds = (courses: Record<string, CourseProgressData>): string[] => {
  return Object.values(courses)
    .filter(isCourseComplete)
    .map(c => c.courseId);
};

/**
 * Check if all courses are complete (program complete)
 */
export const isProgramComplete = (courses: Record<string, CourseProgressData>): boolean => {
  return ALL_COURSE_IDS.every(courseId => {
    const courseData = courses[courseId];
    return isCourseComplete(courseData);
  });
};

/**
 * Determine course status based on progress
 */
export const determineCourseStatus = (
  masteredModuleIds: string[],
  totalModules: number,
  isCompleted: boolean,
  currentStatus?: CourseStatus
): CourseStatus => {
  // Don't change credited status
  if (currentStatus === 'credited') return 'credited';
  
  // Explicit completion
  if (isCompleted) return 'completed';
  
  // All modules mastered
  if (masteredModuleIds.length >= totalModules && totalModules > 0) {
    return 'completed';
  }
  
  // Some progress
  if (masteredModuleIds.length > 0) {
    return 'in_progress';
  }
  
  return 'not_started';
};
