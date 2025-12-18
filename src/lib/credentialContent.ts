/**
 * Credential content definitions for the TMAIHS Learning Studio certificate
 */

export const CREDENTIAL_TITLE = 'AI Fluency for Educators';

export const ISSUER = {
  name: 'TMAIHS',
  descriptor: 'An independent educator-led professional learning studio',
  fullDescription: 'TMAIHS is an independent educator-led professional learning studio focused on research-aligned instructional practice.',
};

export const PD_STATEMENT = 'Designed to support 3 hours of professional development documentation';

export const PD_EXPLANATION = 
  'Completion time is based on combined course engagement across 10 micro-courses, including interactive assessments, reflection activities, and applied practice exercises.';

/**
 * Competency statements derived from the three-tier structure
 */
export const COMPETENCIES = [
  {
    id: 'foundations',
    tier: 1,
    statement: 'Applies foundational prompt engineering techniques including constraints, role assignment, and iterative refinement to enhance instructional planning',
  },
  {
    id: 'integrated',
    tier: 2,
    statement: 'Designs multi-step AI workflows using meta-prompting, persona-based interactions, and workflow orchestration for complex instructional tasks',
  },
  {
    id: 'studio',
    tier: 3,
    statement: 'Evaluates AI outputs critically and designs appropriate student-facing AI activities with attention to authenticity, learning goals, and ethical considerations',
  },
  {
    id: 'overall',
    tier: 0,
    statement: 'Integrates AI tools into curriculum design with research-informed judgment about pedagogical fit and responsible implementation',
  },
] as const;

/**
 * ISTE Educator Standards alignment
 */
export const ISTE_STANDARDS = [
  {
    indicator: '1c',
    title: 'Stay current with research',
    description: 'Educators stay current with research that supports improved student learning outcomes, including findings from the learning sciences.',
    alignment: 'All courses are research-cited and grounded in current evidence about AI in education.',
  },
  {
    indicator: '2b',
    title: 'Manage technology use',
    description: 'Educators manage the use of technology and student learning strategies in digital platforms, virtual environments, hands-on makerspaces or in the field.',
    alignment: 'Workflow Design and Detecting AI Work courses address managing AI tools in classroom contexts.',
  },
  {
    indicator: '4a',
    title: 'Dedication to diverse learning',
    description: 'Educators dedicate time to collaborate with both colleagues and students to improve practice, discover and share resources and ideas, and solve problems.',
    alignment: 'Critical Evaluation and Student AI Activities courses focus on diverse learner needs and collaborative approaches.',
  },
  {
    indicator: '5a',
    title: 'Design authentic activities',
    description: 'Educators design authentic, learner-driven activities and environments that recognize and accommodate learner variability.',
    alignment: 'Student AI Activities and Curriculum Design courses emphasize authentic, learner-centered design.',
  },
  {
    indicator: '5b',
    title: 'Design learner-driven activities',
    description: 'Educators design activities that foster creativity, deep understanding, and critical thinking.',
    alignment: 'Persona Calling and Meta-Prompting courses develop creative and critical thinking approaches.',
  },
  {
    indicator: '6a',
    title: 'Foster critical digital literacy',
    description: 'Educators foster a culture where students take ownership of their learning goals and outcomes in both independent and group settings.',
    alignment: 'Critical Evaluation and Detecting AI Work courses develop student agency and digital literacy.',
  },
] as const;

/**
 * CAST UDL Guidelines alignment
 */
export const UDL_GUIDELINES = [
  {
    checkpoint: '4.1',
    title: 'Vary methods for response and navigation',
    principle: 'Action & Expression',
    alignment: 'Course activities demonstrate multiple means of representing ideas through varied AI outputs and interaction patterns.',
  },
  {
    checkpoint: '5.2',
    title: 'Use multiple tools for construction and composition',
    principle: 'Action & Expression',
    alignment: 'Learners practice using AI as a construction tool alongside traditional methods.',
  },
  {
    checkpoint: '7.1',
    title: 'Optimize individual choice and autonomy',
    principle: 'Engagement',
    alignment: 'Workflow personalization and flexible learning paths honor individual choice in professional learning.',
  },
  {
    checkpoint: '8.3',
    title: 'Foster collaboration and community',
    principle: 'Engagement',
    alignment: 'Community learning features and discussion components foster collaborative professional growth.',
  },
] as const;

/**
 * Course tier information for verification page
 */
export const TIER_DESCRIPTIONS = [
  {
    tier: 1,
    name: 'Foundations',
    description: 'Establishing AI as a thinking partner through core prompting techniques',
  },
  {
    tier: 2,
    name: 'Integrated Application',
    description: 'Combining multiple prompting strategies for complex instructional tasks',
  },
  {
    tier: 3,
    name: 'Studio Practice',
    description: 'Developing judgment, critique, and transfer skills for authentic implementation',
  },
] as const;

/**
 * Completion criteria explanation
 */
export const COMPLETION_CRITERIA = {
  summary: 'This credential was auto-issued upon verified completion of all 10 micro-courses across 3 progressive learning tiers.',
  details: [
    'Each course includes reading content, interactive assessments, and reflection activities',
    'Progress is tracked automatically and persisted across sessions',
    'Completion requires engaging with all course sections and assessments',
    'No minimum score requirements—focus is on engagement and reflection',
  ],
};
