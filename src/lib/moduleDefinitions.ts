// Module definitions - source of truth for modules per course
// Each course has ordered modules (sections). Progress = mastered modules / total modules

export interface ModuleDefinition {
  moduleId: string;
  courseId: string;
  position: number;
  title: string;
  type: 'content' | 'cfu' | 'workshop';
}

// Define modules for each course based on the new 10-module architecture
// Tier 1: Foundation (4 courses) — builds the Classroom Constitution
// Tier 2: Application (3 courses) — builds a PBL unit using the Constitution
// Tier 3: Discernment (3 courses) — evaluates, refines, and governs both

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  // Module 1: What Is AI, Really? (4 sections, 1 CFU)
  { moduleId: 'what-is-ai-101-context', courseId: 'what-is-ai-101', position: 1, title: 'How Language Models Actually Work', type: 'content' },
  { moduleId: 'what-is-ai-101-mental-model', courseId: 'what-is-ai-101', position: 2, title: 'Pattern, Not Understanding', type: 'content' },
  { moduleId: 'what-is-ai-101-cfu-1', courseId: 'what-is-ai-101', position: 3, title: 'CFU: Comparative Reading', type: 'cfu' },
  { moduleId: 'what-is-ai-101-reflection', courseId: 'what-is-ai-101', position: 4, title: 'Calibrated Expectations', type: 'content' },

  // Module 2: Your Classroom, Not a Generic One (5 sections, 1 CFU)
  { moduleId: 'your-classroom-101-context', courseId: 'your-classroom-101', position: 1, title: 'Why Generic Fails', type: 'content' },
  { moduleId: 'your-classroom-101-mental-model', courseId: 'your-classroom-101', position: 2, title: 'Specificity and Privacy', type: 'content' },
  { moduleId: 'your-classroom-101-cfu-1', courseId: 'your-classroom-101', position: 3, title: 'CFU: What Makes It Yours', type: 'cfu' },
  { moduleId: 'your-classroom-101-workshop', courseId: 'your-classroom-101', position: 4, title: 'Constitution: Demographics & Constraints', type: 'workshop' },
  { moduleId: 'your-classroom-101-reflection', courseId: 'your-classroom-101', position: 5, title: 'The Document Begins', type: 'content' },

  // Module 3: Description — The Art of Being Specific (6 sections, 2 CFUs)
  { moduleId: 'description-101-context', courseId: 'description-101', position: 1, title: 'A Weak Prompt and a Strong One', type: 'content' },
  { moduleId: 'description-101-mental-model', courseId: 'description-101', position: 2, title: 'Constraints, Personas, Context', type: 'content' },
  { moduleId: 'description-101-cfu-1', courseId: 'description-101', position: 3, title: 'CFU: Prompt Diagnosis', type: 'cfu' },
  { moduleId: 'description-101-workshop', courseId: 'description-101', position: 4, title: 'Constitution: Values & Content', type: 'workshop' },
  { moduleId: 'description-101-cfu-2', courseId: 'description-101', position: 5, title: 'CFU: Rewrite the Prompt', type: 'cfu' },
  { moduleId: 'description-101-reflection', courseId: 'description-101', position: 6, title: 'Description as Infrastructure', type: 'content' },

  // Module 4: When to Use It. When Not To. (6 sections, 2 CFUs)
  { moduleId: 'when-to-use-it-101-context', courseId: 'when-to-use-it-101', position: 1, title: 'A Taxonomy of Use', type: 'content' },
  { moduleId: 'when-to-use-it-101-mental-model', courseId: 'when-to-use-it-101', position: 2, title: 'What Gets Lost', type: 'content' },
  { moduleId: 'when-to-use-it-101-cfu-1', courseId: 'when-to-use-it-101', position: 3, title: 'CFU: Scenario Sorting', type: 'cfu' },
  { moduleId: 'when-to-use-it-101-workshop', courseId: 'when-to-use-it-101', position: 4, title: 'Constitution: Your Vision', type: 'workshop' },
  { moduleId: 'when-to-use-it-101-cfu-2', courseId: 'when-to-use-it-101', position: 5, title: 'CFU: Vision Check', type: 'cfu' },
  { moduleId: 'when-to-use-it-101-reflection', courseId: 'when-to-use-it-101', position: 6, title: 'Constitution Complete', type: 'content' },

  // Module 5: Backwards Planning with AI (5 sections, 1 CFU)
  { moduleId: 'backwards-planning-201-context', courseId: 'backwards-planning-201', position: 1, title: 'Designing from the Outcome Back', type: 'content' },
  { moduleId: 'backwards-planning-201-mental-model', courseId: 'backwards-planning-201', position: 2, title: 'PBL Demands Something Different', type: 'content' },
  { moduleId: 'backwards-planning-201-cfu-1', courseId: 'backwards-planning-201', position: 3, title: 'CFU: Planning Prompt Comparison', type: 'cfu' },
  { moduleId: 'backwards-planning-201-workshop', courseId: 'backwards-planning-201', position: 4, title: 'Your Semester Timeline', type: 'workshop' },
  { moduleId: 'backwards-planning-201-reflection', courseId: 'backwards-planning-201', position: 5, title: 'The Architecture Is Set', type: 'content' },

  // Module 6: Persona, Meta-Prompting & Iteration (6 sections, 2 CFUs)
  { moduleId: 'persona-iteration-201-context', courseId: 'persona-iteration-201', position: 1, title: 'Steering, Not Just Asking', type: 'content' },
  { moduleId: 'persona-iteration-201-mental-model', courseId: 'persona-iteration-201', position: 2, title: 'Three Tools for Better Output', type: 'content' },
  { moduleId: 'persona-iteration-201-cfu-1', courseId: 'persona-iteration-201', position: 3, title: 'CFU: Before and After', type: 'cfu' },
  { moduleId: 'persona-iteration-201-workshop', courseId: 'persona-iteration-201', position: 4, title: 'Live Iteration Exercise', type: 'workshop' },
  { moduleId: 'persona-iteration-201-cfu-2', courseId: 'persona-iteration-201', position: 5, title: 'CFU: Spot the Refinement', type: 'cfu' },
  { moduleId: 'persona-iteration-201-reflection', courseId: 'persona-iteration-201', position: 6, title: 'Core Framing Complete', type: 'content' },

  // Module 7: From Draft to Implementation (5 sections, 1 CFU)
  { moduleId: 'draft-to-implementation-201-context', courseId: 'draft-to-implementation-201', position: 1, title: 'Theory vs. Monday Morning', type: 'content' },
  { moduleId: 'draft-to-implementation-201-mental-model', courseId: 'draft-to-implementation-201', position: 2, title: 'What Makes a Unit Teachable', type: 'content' },
  { moduleId: 'draft-to-implementation-201-cfu-1', courseId: 'draft-to-implementation-201', position: 3, title: 'CFU: Implementation Readiness', type: 'cfu' },
  { moduleId: 'draft-to-implementation-201-workshop', courseId: 'draft-to-implementation-201', position: 4, title: 'Your Final PBL Unit', type: 'workshop' },
  { moduleId: 'draft-to-implementation-201-reflection', courseId: 'draft-to-implementation-201', position: 5, title: 'Ready to Teach', type: 'content' },

  // Module 8: Evaluating AI Output & Your Own Work (5 sections, 1 CFU)
  { moduleId: 'evaluating-output-301-context', courseId: 'evaluating-output-301', position: 1, title: 'Professional Judgment', type: 'content' },
  { moduleId: 'evaluating-output-301-mental-model', courseId: 'evaluating-output-301', position: 2, title: 'Evaluation Frameworks', type: 'content' },
  { moduleId: 'evaluating-output-301-cfu-1', courseId: 'evaluating-output-301', position: 3, title: 'CFU: Critique the Critique', type: 'cfu' },
  { moduleId: 'evaluating-output-301-workshop', courseId: 'evaluating-output-301', position: 4, title: 'Rubric Stress-Test', type: 'workshop' },
  { moduleId: 'evaluating-output-301-reflection', courseId: 'evaluating-output-301', position: 5, title: 'Owning the Judgment', type: 'content' },

  // Module 9: AI in Student Work (6 sections, 2 CFUs)
  { moduleId: 'ai-student-work-301-context', courseId: 'ai-student-work-301', position: 1, title: 'What Detection Can and Cannot Tell You', type: 'content' },
  { moduleId: 'ai-student-work-301-mental-model', courseId: 'ai-student-work-301', position: 2, title: 'A Framework, Not a Rulebook', type: 'content' },
  { moduleId: 'ai-student-work-301-cfu-1', courseId: 'ai-student-work-301', position: 3, title: 'CFU: Use Case Sorting', type: 'cfu' },
  { moduleId: 'ai-student-work-301-workshop', courseId: 'ai-student-work-301', position: 4, title: 'Draft Your Classroom AI Policy', type: 'workshop' },
  { moduleId: 'ai-student-work-301-cfu-2', courseId: 'ai-student-work-301', position: 5, title: 'CFU: Policy Stress-Test', type: 'cfu' },
  { moduleId: 'ai-student-work-301-reflection', courseId: 'ai-student-work-301', position: 6, title: 'Honest Conversation', type: 'content' },

  // Module 10: Closing the Loop — Revising Your Constitution (5 sections, 1 CFU)
  { moduleId: 'closing-the-loop-301-context', courseId: 'closing-the-loop-301', position: 1, title: 'What Has Changed', type: 'content' },
  { moduleId: 'closing-the-loop-301-mental-model', courseId: 'closing-the-loop-301', position: 2, title: 'The Quarterly Revision', type: 'content' },
  { moduleId: 'closing-the-loop-301-cfu-1', courseId: 'closing-the-loop-301', position: 3, title: 'CFU: Constitution Audit', type: 'cfu' },
  { moduleId: 'closing-the-loop-301-workshop', courseId: 'closing-the-loop-301', position: 4, title: 'Guided Revision', type: 'workshop' },
  { moduleId: 'closing-the-loop-301-reflection', courseId: 'closing-the-loop-301', position: 5, title: 'Practice, Not Project', type: 'content' },
];

// Helper functions
export const getModulesForCourse = (courseId: string): ModuleDefinition[] => {
  return MODULE_DEFINITIONS
    .filter(m => m.courseId === courseId)
    .sort((a, b) => a.position - b.position);
};

export const getTotalModulesForCourse = (courseId: string): number => {
  return MODULE_DEFINITIONS.filter(m => m.courseId === courseId).length;
};

export const getCFUModulesForCourse = (courseId: string): ModuleDefinition[] => {
  return MODULE_DEFINITIONS
    .filter(m => m.courseId === courseId && m.type === 'cfu')
    .sort((a, b) => a.position - b.position);
};

export const getModuleById = (moduleId: string): ModuleDefinition | undefined => {
  return MODULE_DEFINITIONS.find(m => m.moduleId === moduleId);
};

// Map section IDs to module IDs for migration
export const getSectionToModuleMap = (courseId: string): Record<string, string> => {
  const modules = getModulesForCourse(courseId);
  const map: Record<string, string> = {};

  modules.forEach((module, index) => {
    map[`section-${index + 1}`] = module.moduleId;
  });

  return map;
};

// Total courses in the program (fixed at 10)
export const TOTAL_COURSES = 10;

// All course IDs
export const ALL_COURSE_IDS = [
  'what-is-ai-101',
  'your-classroom-101',
  'description-101',
  'when-to-use-it-101',
  'backwards-planning-201',
  'persona-iteration-201',
  'draft-to-implementation-201',
  'evaluating-output-301',
  'ai-student-work-301',
  'closing-the-loop-301',
];
