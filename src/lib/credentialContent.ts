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
    id: 'constitution',
    tier: 1,
    statement: 'Builds a context-rich AI Classroom Constitution — a reusable document that captures classroom context, project architecture, stakeholder perspectives, and quality standards so AI produces relevant, classroom-ready output every time',
  },
  {
    id: 'unit-design',
    tier: 2,
    statement: 'Designs a complete PBL unit in collaboration with AI — stress-testing the concept, gathering multiple perspectives, and building the full arc from driving question through assessment using structured prompt workflows',
  },
  {
    id: 'policy',
    tier: 3,
    statement: 'Develops a classroom AI policy grounded in evaluation judgment, authenticity design, productive student AI use, and strategic integration — a practical framework that communicates clear expectations to students, families, and administrators',
  },
  {
    id: 'overall',
    tier: 0,
    statement: 'Integrates AI into instructional practice with a professional framework: a Constitution that gives AI context, a design process that produces real units, and a policy that guides responsible use',
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
    name: 'The Constitution',
    description: 'Building a living document that tells AI who your students are, what they\'re working on, and what "good" looks like in your room',
  },
  {
    tier: 2,
    name: 'The Unit',
    description: 'Designing a complete PBL unit with AI — from driving question to final assessment — using your Constitution as the foundation',
  },
  {
    tier: 3,
    name: 'The Policy',
    description: 'Developing practical judgment about AI in your classroom and a policy framework you could share with anyone who asks',
  },
] as const;

/**
 * Completion criteria explanation
 */
export const COMPLETION_CRITERIA = {
  summary: 'This credential was issued upon completion of all 10 micro-courses across 3 tiers, each producing a concrete deliverable: an AI Classroom Constitution, a PBL unit, and a classroom AI policy.',
  details: [
    'Tier 1: Built an AI Classroom Constitution — a reusable context document for any AI tool',
    'Tier 2: Designed a complete PBL unit using AI-assisted backward design',
    'Tier 3: Developed a classroom AI policy covering evaluation, authenticity, student use, and integration',
    'Each course includes interactive assessments, applied workshops, and reflection activities',
  ],
};
