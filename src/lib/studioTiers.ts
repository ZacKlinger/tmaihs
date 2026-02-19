// Tier configuration for the Learning Studio
// Three tiers that build on each other: Constitution → PBL Unit → Discernment

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
  "what-is-ai-101": "What Is AI, Really?",
  "your-classroom-101": "Your Classroom",
  "description-101": "Description",
  "when-to-use-it-101": "When to Use It",
  "backwards-planning-201": "Backwards Planning",
  "persona-iteration-201": "Persona & Iteration",
  "draft-to-implementation-201": "Draft to Implementation",
  "evaluating-output-301": "Evaluating Output",
  "ai-student-work-301": "AI in Student Work",
  "closing-the-loop-301": "Closing the Loop",
};

export const TIERS: TierConfig[] = [
  {
    id: 1,
    name: "The Constitution",
    description: "Build a living document — five sections, specific enough that a model given only this document could produce something meaningful for your actual classroom.",
    unlockCriteria: "Available immediately",
    courseIds: ["what-is-ai-101", "your-classroom-101", "description-101", "when-to-use-it-101"],
  },
  {
    id: 2,
    name: "The Unit",
    description: "Use your Constitution to design a semester-long PBL unit — backwards-planned, differentiated, and ready to teach.",
    unlockCriteria: "Complete all Tier 1 courses",
    courseIds: ["backwards-planning-201", "persona-iteration-201", "draft-to-implementation-201"],
  },
  {
    id: 3,
    name: "The Practice",
    description: "Develop the discernment to evaluate AI output, navigate student AI use honestly, and revise your Constitution as your practice deepens.",
    unlockCriteria: "Complete all Tier 2 courses",
    courseIds: ["evaluating-output-301", "ai-student-work-301", "closing-the-loop-301"],
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
