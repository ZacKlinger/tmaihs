// Module definitions - source of truth for modules per course
// Each course has ordered modules (sections). Progress = mastered modules / total modules

export interface ModuleDefinition {
  moduleId: string;
  courseId: string;
  position: number;
  title: string;
  type: 'content' | 'cfu' | 'workshop';
}

// Define modules for each course based on the course structure
// Module IDs are stable and don't change when courses are reordered

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  // Constraints 101 (6 sections, 2 CFUs)
  { moduleId: 'constraints-101-context', courseId: 'constraints-101', position: 1, title: 'The Problem with Vague Prompts', type: 'content' },
  { moduleId: 'constraints-101-mental-model', courseId: 'constraints-101', position: 2, title: 'Mental Model: Constraints', type: 'content' },
  { moduleId: 'constraints-101-cfu-1', courseId: 'constraints-101', position: 3, title: 'CFU: Identify Missing Elements', type: 'cfu' },
  { moduleId: 'constraints-101-workshop', courseId: 'constraints-101', position: 4, title: 'Workshop: Apply Constraints', type: 'workshop' },
  { moduleId: 'constraints-101-cfu-2', courseId: 'constraints-101', position: 5, title: 'CFU: Prompt Compare', type: 'cfu' },
  { moduleId: 'constraints-101-reflection', courseId: 'constraints-101', position: 6, title: 'Reflection', type: 'content' },
  
  // Role Assignment 101 (6 sections, 2 CFUs)
  { moduleId: 'role-assignment-101-context', courseId: 'role-assignment-101', position: 1, title: 'Why Role Matters', type: 'content' },
  { moduleId: 'role-assignment-101-mental-model', courseId: 'role-assignment-101', position: 2, title: 'Mental Model: Role Assignment', type: 'content' },
  { moduleId: 'role-assignment-101-cfu-1', courseId: 'role-assignment-101', position: 3, title: 'CFU: Sequence Order', type: 'cfu' },
  { moduleId: 'role-assignment-101-workshop', courseId: 'role-assignment-101', position: 4, title: 'Workshop: Assign Roles', type: 'workshop' },
  { moduleId: 'role-assignment-101-cfu-2', courseId: 'role-assignment-101', position: 5, title: 'CFU: Prompt Compare', type: 'cfu' },
  { moduleId: 'role-assignment-101-reflection', courseId: 'role-assignment-101', position: 6, title: 'Reflection', type: 'content' },
  
  // Iteration 101 (7 sections, 3 CFUs)
  { moduleId: 'iteration-101-context', courseId: 'iteration-101', position: 1, title: 'First Drafts Aren\'t Final', type: 'content' },
  { moduleId: 'iteration-101-mental-model', courseId: 'iteration-101', position: 2, title: 'Mental Model: Iteration', type: 'content' },
  { moduleId: 'iteration-101-cfu-1', courseId: 'iteration-101', position: 3, title: 'CFU: Annotate Prompt', type: 'cfu' },
  { moduleId: 'iteration-101-workshop', courseId: 'iteration-101', position: 4, title: 'Workshop: Iterate', type: 'workshop' },
  { moduleId: 'iteration-101-cfu-2', courseId: 'iteration-101', position: 5, title: 'CFU: Spot the Difference', type: 'cfu' },
  { moduleId: 'iteration-101-cfu-3', courseId: 'iteration-101', position: 6, title: 'CFU: Sequence Order', type: 'cfu' },
  { moduleId: 'iteration-101-reflection', courseId: 'iteration-101', position: 7, title: 'Reflection', type: 'content' },
  
  // Meta-Prompting 201 (6 sections, 2 CFUs)
  { moduleId: 'meta-prompting-201-context', courseId: 'meta-prompting-201', position: 1, title: 'AI as Prompt Engineer', type: 'content' },
  { moduleId: 'meta-prompting-201-mental-model', courseId: 'meta-prompting-201', position: 2, title: 'Mental Model: Meta-Prompting', type: 'content' },
  { moduleId: 'meta-prompting-201-cfu-1', courseId: 'meta-prompting-201', position: 3, title: 'CFU: Output Match', type: 'cfu' },
  { moduleId: 'meta-prompting-201-workshop', courseId: 'meta-prompting-201', position: 4, title: 'Workshop: Meta-Prompt', type: 'workshop' },
  { moduleId: 'meta-prompting-201-cfu-2', courseId: 'meta-prompting-201', position: 5, title: 'CFU: Prompt Remix', type: 'cfu' },
  { moduleId: 'meta-prompting-201-reflection', courseId: 'meta-prompting-201', position: 6, title: 'Reflection', type: 'content' },
  
  // Persona Calling 201 (6 sections, 2 CFUs)
  { moduleId: 'persona-calling-201-context', courseId: 'persona-calling-201', position: 1, title: 'Expert Perspectives', type: 'content' },
  { moduleId: 'persona-calling-201-mental-model', courseId: 'persona-calling-201', position: 2, title: 'Mental Model: Persona Calling', type: 'content' },
  { moduleId: 'persona-calling-201-cfu-1', courseId: 'persona-calling-201', position: 3, title: 'CFU: Persona Task Match', type: 'cfu' },
  { moduleId: 'persona-calling-201-workshop', courseId: 'persona-calling-201', position: 4, title: 'Workshop: Call Personas', type: 'workshop' },
  { moduleId: 'persona-calling-201-cfu-2', courseId: 'persona-calling-201', position: 5, title: 'CFU: Prompt Compare', type: 'cfu' },
  { moduleId: 'persona-calling-201-reflection', courseId: 'persona-calling-201', position: 6, title: 'Reflection', type: 'content' },
  
  // Workflow Design 201 (7 sections, 3 CFUs)
  { moduleId: 'workflow-design-201-context', courseId: 'workflow-design-201', position: 1, title: 'Chaining Prompts', type: 'content' },
  { moduleId: 'workflow-design-201-mental-model', courseId: 'workflow-design-201', position: 2, title: 'Mental Model: Workflow Design', type: 'content' },
  { moduleId: 'workflow-design-201-cfu-1', courseId: 'workflow-design-201', position: 3, title: 'CFU: Workflow Builder', type: 'cfu' },
  { moduleId: 'workflow-design-201-workshop', courseId: 'workflow-design-201', position: 4, title: 'Workshop: Build Workflow', type: 'workshop' },
  { moduleId: 'workflow-design-201-cfu-2', courseId: 'workflow-design-201', position: 5, title: 'CFU: Sequence Order', type: 'cfu' },
  { moduleId: 'workflow-design-201-cfu-3', courseId: 'workflow-design-201', position: 6, title: 'CFU: Output Match', type: 'cfu' },
  { moduleId: 'workflow-design-201-reflection', courseId: 'workflow-design-201', position: 7, title: 'Reflection', type: 'content' },
  
  // Critical Evaluation 301 (7 sections, 3 CFUs)
  { moduleId: 'critical-evaluation-301-context', courseId: 'critical-evaluation-301', position: 1, title: 'Three Lenses', type: 'content' },
  { moduleId: 'critical-evaluation-301-mental-model', courseId: 'critical-evaluation-301', position: 2, title: 'Mental Model: Critical Evaluation', type: 'content' },
  { moduleId: 'critical-evaluation-301-cfu-1', courseId: 'critical-evaluation-301', position: 3, title: 'CFU: Bias Spotter', type: 'cfu' },
  { moduleId: 'critical-evaluation-301-workshop', courseId: 'critical-evaluation-301', position: 4, title: 'Workshop: Evaluate', type: 'workshop' },
  { moduleId: 'critical-evaluation-301-cfu-2', courseId: 'critical-evaluation-301', position: 5, title: 'CFU: Identify Missing', type: 'cfu' },
  { moduleId: 'critical-evaluation-301-cfu-3', courseId: 'critical-evaluation-301', position: 6, title: 'CFU: Prompt Compare', type: 'cfu' },
  { moduleId: 'critical-evaluation-301-reflection', courseId: 'critical-evaluation-301', position: 7, title: 'Reflection', type: 'content' },
  
  // Detecting AI Work 301 (7 sections, 4 CFUs)
  { moduleId: 'detecting-ai-work-301-context', courseId: 'detecting-ai-work-301', position: 1, title: 'Patterns of AI Writing', type: 'content' },
  { moduleId: 'detecting-ai-work-301-mental-model', courseId: 'detecting-ai-work-301', position: 2, title: 'Mental Model: Detection & Design', type: 'content' },
  { moduleId: 'detecting-ai-work-301-cfu-1', courseId: 'detecting-ai-work-301', position: 3, title: 'CFU: Pattern Identifier', type: 'cfu' },
  { moduleId: 'detecting-ai-work-301-cfu-2', courseId: 'detecting-ai-work-301', position: 4, title: 'CFU: Authenticity Rubric', type: 'cfu' },
  { moduleId: 'detecting-ai-work-301-workshop', courseId: 'detecting-ai-work-301', position: 5, title: 'Workshop: Design Detection', type: 'workshop' },
  { moduleId: 'detecting-ai-work-301-cfu-3', courseId: 'detecting-ai-work-301', position: 6, title: 'CFU: Spot the Difference', type: 'cfu' },
  { moduleId: 'detecting-ai-work-301-cfu-4', courseId: 'detecting-ai-work-301', position: 7, title: 'CFU: Prompt Remix', type: 'cfu' },
  
  // Student AI Activities 301 (7 sections, 3 CFUs)
  { moduleId: 'student-ai-activities-301-context', courseId: 'student-ai-activities-301', position: 1, title: 'Productive AI Use', type: 'content' },
  { moduleId: 'student-ai-activities-301-mental-model', courseId: 'student-ai-activities-301', position: 2, title: 'Mental Model: Student AI Design', type: 'content' },
  { moduleId: 'student-ai-activities-301-cfu-1', courseId: 'student-ai-activities-301', position: 3, title: 'CFU: Guardrail Designer', type: 'cfu' },
  { moduleId: 'student-ai-activities-301-workshop', courseId: 'student-ai-activities-301', position: 4, title: 'Workshop: Design Activities', type: 'workshop' },
  { moduleId: 'student-ai-activities-301-cfu-2', courseId: 'student-ai-activities-301', position: 5, title: 'CFU: Workflow Builder', type: 'cfu' },
  { moduleId: 'student-ai-activities-301-cfu-3', courseId: 'student-ai-activities-301', position: 6, title: 'CFU: Prompt Compare', type: 'cfu' },
  { moduleId: 'student-ai-activities-301-reflection', courseId: 'student-ai-activities-301', position: 7, title: 'Reflection', type: 'content' },
  
  // Curriculum AI Design 301 (7 sections, 3 CFUs)
  { moduleId: 'curriculum-ai-design-301-context', courseId: 'curriculum-ai-design-301', position: 1, title: 'Strategic Integration', type: 'content' },
  { moduleId: 'curriculum-ai-design-301-mental-model', courseId: 'curriculum-ai-design-301', position: 2, title: 'Mental Model: Curriculum Integration', type: 'content' },
  { moduleId: 'curriculum-ai-design-301-cfu-1', courseId: 'curriculum-ai-design-301', position: 3, title: 'CFU: Integration Mapper', type: 'cfu' },
  { moduleId: 'curriculum-ai-design-301-workshop', courseId: 'curriculum-ai-design-301', position: 4, title: 'Workshop: Map Integration', type: 'workshop' },
  { moduleId: 'curriculum-ai-design-301-cfu-2', courseId: 'curriculum-ai-design-301', position: 5, title: 'CFU: Sequence Order', type: 'cfu' },
  { moduleId: 'curriculum-ai-design-301-cfu-3', courseId: 'curriculum-ai-design-301', position: 6, title: 'CFU: Prompt Remix', type: 'cfu' },
  { moduleId: 'curriculum-ai-design-301-reflection', courseId: 'curriculum-ai-design-301', position: 7, title: 'Reflection', type: 'content' },
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
// This maps the existing section.id format to the stable moduleId
export const getSectionToModuleMap = (courseId: string): Record<string, string> => {
  const modules = getModulesForCourse(courseId);
  const map: Record<string, string> = {};
  
  // Map section indices to module IDs
  modules.forEach((module, index) => {
    // Existing section IDs use format like "section-1", "section-2"
    map[`section-${index + 1}`] = module.moduleId;
  });
  
  return map;
};

// Total courses in the program (fixed at 10)
export const TOTAL_COURSES = 10;

// All course IDs
export const ALL_COURSE_IDS = [
  'constraints-101',
  'role-assignment-101', 
  'iteration-101',
  'meta-prompting-201',
  'persona-calling-201',
  'workflow-design-201',
  'critical-evaluation-301',
  'detecting-ai-work-301',
  'student-ai-activities-301',
  'curriculum-ai-design-301',
];
