// Bypass Quiz Question Bank
// Questions organized by tier and module

export type QuestionType = 'multiple-choice' | 'true-false' | 'select-all' | 'matching';

export interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TrueFalseQuestion {
  type: 'true-false';
  id: string;
  moduleId: string;
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface SelectAllQuestion {
  type: 'select-all';
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctIndices: number[];
  explanation: string;
}

export interface MatchingQuestion {
  type: 'matching';
  id: string;
  moduleId: string;
  question: string;
  pairs: { left: string; right: string }[];
  explanation: string;
}

export type QuizQuestion = MultipleChoiceQuestion | TrueFalseQuestion | SelectAllQuestion | MatchingQuestion;

export interface TierQuizData {
  tierId: number;
  questions: QuizQuestion[];
}

// Tier 1: Foundations (10 questions)
// Tests: constraints, role assignment, iteration
const tier1Questions: QuizQuestion[] = [
  // Constraints (3-4 questions)
  {
    type: 'multiple-choice',
    id: 't1-constraints-1',
    moduleId: 'constraints-101',
    question: 'A teacher prompts: "Write a lesson plan about photosynthesis." Which constraint would MOST improve this prompt?',
    options: [
      'Add a word count limit',
      'Specify the grade level, prior knowledge, and learning objectives',
      'Ask for bullet points instead of paragraphs',
      'Request the response be written in formal language'
    ],
    correctIndex: 1,
    explanation: 'Specifying grade level, prior knowledge, and learning objectives provides essential context that shapes the entire lesson plan. Word count and formatting are secondary constraints.'
  },
  {
    type: 'select-all',
    id: 't1-constraints-2',
    moduleId: 'constraints-101',
    question: 'Select ALL constraints that would help generate a useful vocabulary quiz for 9th grade biology:',
    options: [
      'Number of questions (e.g., 10 questions)',
      'Question format (multiple choice, matching, fill-in-blank)',
      'Specific vocabulary terms to include',
      'Font size for printing',
      'Difficulty progression within the quiz'
    ],
    correctIndices: [0, 1, 2, 4],
    explanation: 'Question count, format, specific terms, and difficulty progression all shape the quiz content. Font size is a formatting detail the AI cannot control in your final document.'
  },
  {
    type: 'true-false',
    id: 't1-constraints-3',
    moduleId: 'constraints-101',
    question: 'Adding more constraints always produces better AI outputs.',
    correctAnswer: false,
    explanation: 'Over-constraining can make prompts rigid and produce stilted outputs. The goal is strategic constraints that address your specific needs, not maximum constraints.'
  },
  {
    type: 'multiple-choice',
    id: 't1-constraints-4',
    moduleId: 'constraints-101',
    question: 'Which prompt demonstrates the BEST use of constraints for differentiated instruction?',
    options: [
      '"Create a worksheet about fractions."',
      '"Create a worksheet about fractions with 20 problems."',
      '"Create a worksheet about adding fractions for students who struggle with finding common denominators. Include 8 problems that progress from visual models to abstract, with worked examples."',
      '"Create the best possible worksheet about fractions that any student could use."'
    ],
    correctIndex: 2,
    explanation: 'This prompt specifies the target learner, their specific challenge, problem count, progression strategy, and scaffolding approach—all constraints that shape a genuinely differentiated resource.'
  },

  // Role Assignment (3 questions)
  {
    type: 'matching',
    id: 't1-role-1',
    moduleId: 'role-assignment-101',
    question: 'Match each teaching task to the MOST effective role assignment:',
    pairs: [
      { left: 'Simplifying complex scientific concepts', right: 'Science educator who specializes in analogies' },
      { left: 'Writing culturally responsive curriculum', right: 'Curriculum designer with equity expertise' },
      { left: 'Creating rubrics for creative writing', right: 'English teacher with 20 years grading experience' },
      { left: 'Designing hands-on math activities', right: 'Elementary math specialist focused on manipulatives' }
    ],
    explanation: 'Effective role assignment matches the specific expertise needed for each task. A science educator with analogy expertise will simplify concepts differently than a generic "teacher" role.'
  },
  {
    type: 'multiple-choice',
    id: 't1-role-2',
    moduleId: 'role-assignment-101',
    question: 'What is the PRIMARY purpose of assigning a role to an AI?',
    options: [
      'To make the AI more polite in its responses',
      'To access specialized knowledge and perspective that shapes the response',
      'To make the output longer and more detailed',
      'To avoid the AI asking clarifying questions'
    ],
    correctIndex: 1,
    explanation: 'Role assignment frames the AI\'s perspective and expertise, influencing what knowledge it draws upon and how it approaches the task—not just tone or length.'
  },
  {
    type: 'select-all',
    id: 't1-role-3',
    moduleId: 'role-assignment-101',
    question: 'Select ALL elements of an effective role assignment:',
    options: [
      'Defining the expertise area or specialty',
      'Specifying the task context clearly',
      'Always using formal titles like "Dr." or "Professor"',
      'Identifying the intended audience',
      'Making the role description as long as possible'
    ],
    correctIndices: [0, 1, 3],
    explanation: 'Effective roles define expertise, context, and audience. Formal titles and length don\'t improve effectiveness—specificity and relevance do.'
  },

  // Iteration (3 questions)
  {
    type: 'true-false',
    id: 't1-iteration-1',
    moduleId: 'iteration-101',
    question: 'The most effective approach to prompting is to write one comprehensive prompt that anticipates all needs, rather than iterating.',
    correctAnswer: false,
    explanation: 'Iteration is more effective than trying to create a "perfect" first prompt. Each AI response reveals new directions and refinements you couldn\'t anticipate.'
  },
  {
    type: 'multiple-choice',
    id: 't1-iteration-2',
    moduleId: 'iteration-101',
    question: 'An AI generates a lesson plan that\'s good but uses vocabulary too advanced for your students. What\'s the BEST iterative follow-up?',
    options: [
      'Start over with a completely new prompt',
      '"Make it simpler."',
      '"Revise this for 6th graders reading at a 4th grade level. Replace academic terms with everyday language and add brief definitions for any remaining technical words."',
      '"This is too hard. Fix it."'
    ],
    correctIndex: 2,
    explanation: 'Effective iteration is specific about what to change and how. "Make it simpler" is too vague; the third option specifies the target level, the strategy (replace terms), and adds scaffolding (definitions).'
  },
  {
    type: 'matching',
    id: 't1-iteration-3',
    moduleId: 'iteration-101',
    question: 'Match each AI output issue to the best iterative fix strategy:',
    pairs: [
      { left: 'Too generic, not specific enough', right: 'Add concrete examples or constraints' },
      { left: 'Wrong tone or voice', right: 'Specify the target audience and desired tone' },
      { left: 'Missing key content', right: 'Request specific additions explicitly' },
      { left: 'Good content, wrong format', right: 'Request restructuring while keeping content' }
    ],
    explanation: 'Effective iteration diagnoses the specific problem and applies a targeted fix rather than starting over or making vague requests.'
  }
];

// Tier 2: Integrated Application (10 questions)
// Tests: meta-prompting, persona calling, workflow design
const tier2Questions: QuizQuestion[] = [
  // Meta-Prompting (3-4 questions)
  {
    type: 'multiple-choice',
    id: 't2-meta-1',
    moduleId: 'meta-prompting-201',
    question: 'What is the CORE idea behind meta-prompting?',
    options: [
      'Using longer prompts to get better results',
      'Having AI critique and improve your prompts before executing them',
      'Copying prompts from online databases',
      'Using the same prompt template for all tasks'
    ],
    correctIndex: 1,
    explanation: 'Meta-prompting uses AI as a prompt engineer—asking it to analyze, critique, and improve your prompts before or after generating content.'
  },
  {
    type: 'select-all',
    id: 't2-meta-2',
    moduleId: 'meta-prompting-201',
    question: 'Select ALL effective meta-prompting techniques:',
    options: [
      'Asking AI to identify what\'s missing from your prompt',
      'Having AI suggest alternative approaches to your task',
      'Requesting AI to explain why it made certain choices in its output',
      'Copying the AI\'s suggested improvements without review',
      'Asking AI what clarifying questions it would ask about your prompt'
    ],
    correctIndices: [0, 1, 2, 4],
    explanation: 'All except blindly copying are effective. Meta-prompting is about using AI to think critically about prompts, not outsourcing your judgment entirely.'
  },
  {
    type: 'true-false',
    id: 't2-meta-3',
    moduleId: 'meta-prompting-201',
    question: 'Meta-prompting is only useful for beginners who don\'t know how to write good prompts yet.',
    correctAnswer: false,
    explanation: 'Meta-prompting remains valuable at all skill levels. Even expert prompt engineers use AI to identify blind spots, explore alternatives, and refine approaches they might not have considered.'
  },
  {
    type: 'multiple-choice',
    id: 't2-meta-4',
    moduleId: 'meta-prompting-201',
    question: 'You want to create a project rubric but aren\'t sure what criteria to include. Which meta-prompting approach is MOST effective?',
    options: [
      '"Write a rubric for my project."',
      '"What questions would you ask me before creating a rubric for a student project?"',
      '"Give me the best rubric template."',
      '"Make a perfect rubric."'
    ],
    correctIndex: 1,
    explanation: 'Asking the AI what questions it would ask surfaces important criteria you may not have considered, improving both the prompt and your thinking about the task.'
  },

  // Persona Calling (3 questions)
  {
    type: 'matching',
    id: 't2-persona-1',
    moduleId: 'persona-calling-201',
    question: 'Match each educational challenge to the MOST strategically valuable persona:',
    pairs: [
      { left: 'Designing assessment for deeper learning', right: 'Assessment researcher focused on authentic evaluation' },
      { left: 'Making content accessible for ELL students', right: 'ESL specialist with sheltered instruction expertise' },
      { left: 'Integrating social-emotional learning', right: 'School counselor with classroom SEL experience' },
      { left: 'Creating inquiry-based science lessons', right: 'Science educator trained in NGSS practices' }
    ],
    explanation: 'Strategic persona selection matches specific expertise to specific challenges. The persona\'s specialized knowledge shapes the response in ways a generic "teacher" role cannot.'
  },
  {
    type: 'multiple-choice',
    id: 't2-persona-2',
    moduleId: 'persona-calling-201',
    question: 'What distinguishes "persona calling" from basic role assignment?',
    options: [
      'Persona calling uses more formal language',
      'Persona calling strategically selects specific expertise for specific task types, rather than generic roles',
      'Persona calling requires longer prompts',
      'Persona calling only works for creative tasks'
    ],
    correctIndex: 1,
    explanation: 'Persona calling is strategic selection—matching particular expertise to particular challenges. It\'s about choosing the right perspective for the specific task, not just assigning any role.'
  },
  {
    type: 'select-all',
    id: 't2-persona-3',
    moduleId: 'persona-calling-201',
    question: 'When designing a unit on the Civil Rights Movement for diverse learners, which personas would provide COMPLEMENTARY perspectives? Select ALL that apply:',
    options: [
      'Historian specializing in primary source analysis',
      'Culturally responsive pedagogy expert',
      'Special education teacher with UDL expertise',
      'Random celebrity for engagement',
      'Curriculum designer focused on backward design'
    ],
    correctIndices: [0, 1, 2, 4],
    explanation: 'Each selected persona brings distinct, complementary expertise: content accuracy, cultural responsiveness, accessibility, and structural design. A celebrity adds entertainment, not educational value.'
  },

  // Workflow Design (3 questions)
  {
    type: 'multiple-choice',
    id: 't2-workflow-1',
    moduleId: 'workflow-design-201',
    question: 'What is the PRIMARY advantage of chaining prompts in a workflow rather than using one comprehensive prompt?',
    options: [
      'It uses fewer AI credits',
      'Each step can build on and refine the previous output, allowing for more complex and coherent results',
      'It\'s faster than single prompts',
      'It requires less thinking from the teacher'
    ],
    correctIndex: 1,
    explanation: 'Workflow chaining allows each step to build on previous outputs, enabling complex multi-stage tasks that would be impossible or inconsistent in a single prompt.'
  },
  {
    type: 'matching',
    id: 't2-workflow-2',
    moduleId: 'workflow-design-201',
    question: 'Match each step in a unit planning workflow to its logical position:',
    pairs: [
      { left: 'Step 1', right: 'Identify learning goals and standards' },
      { left: 'Step 2', right: 'Design summative assessment aligned to goals' },
      { left: 'Step 3', right: 'Plan learning activities that build toward assessment' },
      { left: 'Step 4', right: 'Create formative checks throughout the unit' }
    ],
    explanation: 'This follows backward design principles: goals first, then assessment, then activities, then formative checks. Each step\'s output informs the next.'
  },
  {
    type: 'true-false',
    id: 't2-workflow-3',
    moduleId: 'workflow-design-201',
    question: 'In a well-designed prompt workflow, you should always include the full output from all previous steps in each new prompt.',
    correctAnswer: false,
    explanation: 'Including everything creates bloated prompts. Effective workflows pass forward only the relevant portions of previous outputs—the specific content the next step needs to build upon.'
  }
];

// Tier 3: Studio Practice (10 questions)
// Tests: critical evaluation, detecting AI work, student activities, curriculum design
const tier3Questions: QuizQuestion[] = [
  // Critical Evaluation (2-3 questions)
  {
    type: 'select-all',
    id: 't3-eval-1',
    moduleId: 'critical-evaluation-301',
    question: 'When evaluating AI-generated content for classroom use, which criteria should you ALWAYS check? Select ALL that apply:',
    options: [
      'Factual accuracy against reliable sources',
      'Age-appropriateness for your students',
      'Whether the AI used formal language',
      'Potential bias or stereotypes in examples',
      'Alignment with your learning objectives',
      'Whether it sounds like AI wrote it'
    ],
    correctIndices: [0, 1, 3, 4],
    explanation: 'Accuracy, appropriateness, bias, and alignment are critical educational criteria. Formality and "sounding like AI" are stylistic concerns, not quality indicators.'
  },
  {
    type: 'multiple-choice',
    id: 't3-eval-2',
    moduleId: 'critical-evaluation-301',
    question: 'An AI generates a reading passage that seems factually accurate but includes a subtle cultural stereotype. What\'s the BEST response?',
    options: [
      'Use it anyway since the facts are correct',
      'Reject the entire output and start over',
      'Edit the passage to remove the stereotype while preserving the accurate content',
      'Ask students to identify the stereotype as a critical thinking exercise'
    ],
    correctIndex: 2,
    explanation: 'Editing preserves useful content while addressing the problem. Option D could be appropriate in some contexts, but introduces stereotype exposure without clear educational framing.'
  },
  {
    type: 'true-false',
    id: 't3-eval-3',
    moduleId: 'critical-evaluation-301',
    question: 'If AI-generated content sounds confident and well-written, you can generally trust its accuracy.',
    correctAnswer: false,
    explanation: 'AI often generates confident, fluent text that is factually wrong (hallucinations). Writing quality does not indicate accuracy—always verify facts independently.'
  },

  // Detecting AI Work (2-3 questions)
  {
    type: 'select-all',
    id: 't3-detect-1',
    moduleId: 'detecting-ai-work-301',
    question: 'Which patterns might indicate AI-generated student writing? Select ALL that apply:',
    options: [
      'Unusually consistent paragraph structure throughout',
      'Vocabulary significantly above the student\'s typical level',
      'Creative spelling errors',
      'Generic examples that don\'t reference personal experience',
      'Hedging phrases like "It\'s important to note that..."'
    ],
    correctIndices: [0, 1, 3, 4],
    explanation: 'Consistent structure, elevated vocabulary, generic examples, and AI-typical hedging phrases are red flags. Creative spelling errors are actually MORE human—AI rarely misspells creatively.'
  },
  {
    type: 'multiple-choice',
    id: 't3-detect-2',
    moduleId: 'detecting-ai-work-301',
    question: 'Which assignment design MOST effectively discourages unhelpful AI use while still allowing productive AI assistance?',
    options: [
      'Ban all AI use and use plagiarism detection software',
      'Require handwritten assignments only',
      'Design assignments that require personal reflection, local context, or process documentation that AI cannot provide',
      'Make assignments so easy that AI isn\'t needed'
    ],
    correctIndex: 2,
    explanation: 'Assignments requiring personal experience, local context, or documented process make AI shortcuts less useful while still allowing AI as a thinking tool for brainstorming or editing.'
  },
  {
    type: 'matching',
    id: 't3-detect-3',
    moduleId: 'detecting-ai-work-301',
    question: 'Match each assignment type to its vulnerability to unhelpful AI use:',
    pairs: [
      { left: 'Generic five-paragraph essay', right: 'High vulnerability - AI excels at this format' },
      { left: 'Reflection connecting to personal experience', right: 'Low vulnerability - requires authentic detail' },
      { left: 'Analysis of class-specific discussion', right: 'Low vulnerability - requires local context' },
      { left: 'Summary of a common text', right: 'High vulnerability - AI has likely seen the text' }
    ],
    explanation: 'Assignments requiring personal experience or class-specific context resist unhelpful AI use because AI lacks access to that information.'
  },

  // Student AI Activities (2 questions)
  {
    type: 'multiple-choice',
    id: 't3-student-1',
    moduleId: 'student-ai-activities-301',
    question: 'When designing student-facing AI activities, what should be the PRIMARY goal?',
    options: [
      'Teaching students to get AI to do their work efficiently',
      'Positioning AI as a thinking partner that enhances—not replaces—student cognition',
      'Showing students how powerful AI technology is',
      'Preparing students for AI jobs'
    ],
    correctIndex: 1,
    explanation: 'Student AI activities should develop thinking skills with AI as a tool, not outsource thinking to AI. The goal is enhanced cognition, not efficient shortcutting.'
  },
  {
    type: 'select-all',
    id: 't3-student-2',
    moduleId: 'student-ai-activities-301',
    question: 'Select ALL characteristics of well-designed student AI activities:',
    options: [
      'Students must evaluate and improve AI outputs, not just accept them',
      'The activity requires student thinking that AI cannot replace',
      'Students can complete the activity entirely with AI',
      'Clear guidelines about appropriate vs. inappropriate AI use',
      'Students document their process and AI interactions'
    ],
    correctIndices: [0, 1, 3, 4],
    explanation: 'Good activities require evaluation, irreplaceable student thinking, clear guidelines, and process documentation. If AI can complete it entirely, student learning is bypassed.'
  },

  // Curriculum AI Design (2 questions)
  {
    type: 'multiple-choice',
    id: 't3-curriculum-1',
    moduleId: 'curriculum-ai-design-301',
    question: 'When integrating AI into curriculum, which question should you ask FIRST?',
    options: [
      'Which AI tool has the best features?',
      'What learning goal does AI integration serve, and is AI the best way to achieve it?',
      'How can I use AI in every lesson?',
      'What will impress administrators about my AI use?'
    ],
    correctIndex: 1,
    explanation: 'Curriculum integration should be learning-goal driven, not technology-driven. AI should serve clear educational purposes, not be added for its own sake.'
  },
  {
    type: 'matching',
    id: 't3-curriculum-2',
    moduleId: 'curriculum-ai-design-301',
    question: 'Match each curriculum context to the appropriate level of AI integration:',
    pairs: [
      { left: 'Foundational skill development (e.g., basic math facts)', right: 'Minimal AI - students need to build fluency themselves' },
      { left: 'Complex research project', right: 'Structured AI - clear guidelines for productive use' },
      { left: 'Creative writing exploring personal voice', right: 'Limited AI - preserve authentic student expression' },
      { left: 'Brainstorming and ideation phase', right: 'Open AI - AI as thinking partner for exploration' }
    ],
    explanation: 'AI integration should match learning goals. Foundational skills and personal voice need human development; research and brainstorming can productively incorporate AI with appropriate structure.'
  }
];

export const BYPASS_QUIZ_DATA: TierQuizData[] = [
  { tierId: 1, questions: tier1Questions },
  { tierId: 2, questions: tier2Questions },
  { tierId: 3, questions: tier3Questions },
];

export const getQuestionsForTier = (tierId: number): QuizQuestion[] => {
  const tierData = BYPASS_QUIZ_DATA.find(t => t.tierId === tierId);
  return tierData?.questions || [];
};

export const getQuestionsForModules = (tierId: number, moduleIds: string[]): QuizQuestion[] => {
  const tierQuestions = getQuestionsForTier(tierId);
  return tierQuestions.filter(q => moduleIds.includes(q.moduleId));
};

export const getModulesFromQuestions = (questions: QuizQuestion[]): string[] => {
  return [...new Set(questions.map(q => q.moduleId))];
};
