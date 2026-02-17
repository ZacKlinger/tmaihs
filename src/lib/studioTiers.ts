// Tier configuration for the Learning Studio
// Tiers represent increasing design capacity, not difficulty

export interface TierConfig {
  id: number;
  name: string;
  description: string;
  unlockCriteria: string;
  courseIds: string[];
}

export interface CourseInfo {
  id: string;
  name: string;
}

export const COURSE_NAMES: Record<string, string> = {
  "constraints-101": "Constraints",
  "role-assignment-101": "Role Assignment",
  "iteration-101": "Iteration",
  "meta-prompting-201": "Meta-Prompting",
  "persona-calling-201": "Persona Calling",
  "workflow-design-201": "Workflow Design",
  "critical-evaluation-301": "Critical Evaluation",
  "detecting-ai-work-301": "Detecting AI Work",
  "student-ai-activities-301": "Student AI Activities",
  "curriculum-ai-design-301": "Curriculum AI Design",
};

export const TIERS: TierConfig[] = [
  {
    id: 1,
    name: "The Constitution",
    description: "Build a living document that gives AI everything it needs to know about your classroom.",
    unlockCriteria: "Available immediately",
    courseIds: ["constraints-101", "role-assignment-101", "iteration-101"],
  },
  {
    id: 2,
    name: "The Unit",
    description: "Design a complete PBL unit with AI, using your Constitution as the foundation.",
    unlockCriteria: "Complete all Tier 1 courses",
    courseIds: ["meta-prompting-201", "persona-calling-201", "workflow-design-201"],
  },
  {
    id: 3,
    name: "The Policy",
    description: "Develop a practical AI policy you could hand to students, parents, and your principal.",
    unlockCriteria: "Complete all Tier 2 courses",
    courseIds: ["critical-evaluation-301", "detecting-ai-work-301", "student-ai-activities-301", "curriculum-ai-design-301"],
  },
];

export const getTierForCourse = (courseId: string): number => {
  for (const tier of TIERS) {
    if (tier.courseIds.includes(courseId)) {
      return tier.id;
    }
  }
  return 1;
};

export const isTierUnlocked = (tierNumber: number, completedCourseIds: string[]): boolean => {
  if (tierNumber === 1) return true;
  
  const previousTier = TIERS.find(t => t.id === tierNumber - 1);
  if (!previousTier) return false;
  
  // All courses in the previous tier must be completed
  return previousTier.courseIds.every(courseId => completedCourseIds.includes(courseId));
};

export const getTierProgress = (tierNumber: number, completedCourseIds: string[]): number => {
  const tier = TIERS.find(t => t.id === tierNumber);
  if (!tier) return 0;
  
  const completedInTier = tier.courseIds.filter(id => completedCourseIds.includes(id)).length;
  return Math.round((completedInTier / tier.courseIds.length) * 100);
};

export const isTierComplete = (tierNumber: number, completedCourseIds: string[]): boolean => {
  const tier = TIERS.find(t => t.id === tierNumber);
  if (!tier) return false;
  
  return tier.courseIds.every(id => completedCourseIds.includes(id));
};

export const getUnlockedTiers = (completedCourseIds: string[]): number[] => {
  return TIERS.filter(tier => isTierUnlocked(tier.id, completedCourseIds)).map(t => t.id);
};
