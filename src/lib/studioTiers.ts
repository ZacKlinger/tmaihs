// Tier configuration for the Learning Studio
// Tiers represent increasing design capacity, not difficulty

export interface TierConfig {
  id: number;
  name: string;
  description: string;
  unlockCriteria: string;
  courseIds: string[];
}

export const TIERS: TierConfig[] = [
  {
    id: 1,
    name: "Foundations",
    description: "Establish AI as a thinking partner when approaching new instructional problems.",
    unlockCriteria: "Available immediately",
    courseIds: ["constraints-101", "role-assignment-101", "iteration-101"],
  },
  {
    id: 2,
    name: "Integrated Application",
    description: "Combine multiple prompting strategies simultaneously.",
    unlockCriteria: "Complete all Tier 1 courses",
    courseIds: ["meta-prompting-201", "persona-calling-201", "workflow-design-201"],
  },
  {
    id: 3,
    name: "Studio Practice",
    description: "Develop judgment, critique, and transfer.",
    unlockCriteria: "Complete all Tier 2 courses",
    courseIds: ["critical-evaluation-301", "detecting-ai-work-301", "ai-integrated-design-301"],
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
