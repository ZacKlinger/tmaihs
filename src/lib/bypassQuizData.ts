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

// Tier 1: The Constitution (10 questions)
// Tests: AI understanding, classroom specificity, description, judgment
const tier1Questions: QuizQuestion[] = [
  // What Is AI, Really? (3 questions)
  {
    type: 'multiple-choice',
    id: 't1-ai-1',
    moduleId: 'what-is-ai-101',
    question: 'When a language model generates a confident, detailed answer about a topic, what is actually happening?',
    options: [
      'The model is retrieving facts from a verified database',
      'The model is predicting the most statistically likely next tokens based on patterns in its training data',
      'The model understands the topic and reasons about it like a human expert',
      'The model searches the internet for the most recent information'
    ],
    correctIndex: 1,
    explanation: 'Language models predict text sequences based on statistical patterns. They don\'t understand, retrieve verified facts, or search the internet. This is why hallucination is structural — the model completes patterns whether or not the content is accurate.'
  },
  {
    type: 'true-false',
    id: 't1-ai-2',
    moduleId: 'what-is-ai-101',
    question: 'AI hallucination is a bug that will be fixed in future model versions.',
    correctAnswer: false,
    explanation: 'Hallucination is structural to how language models work — they predict likely text, not verified truth. It can be reduced but not eliminated, which is why teacher judgment remains essential.'
  },
  {
    type: 'multiple-choice',
    id: 't1-ai-3',
    moduleId: 'what-is-ai-101',
    question: 'What does "Constitutional AI" mean for teachers building their own classroom constitutions?',
    options: [
      'AI follows the U.S. Constitution when generating content',
      'Values and guidelines are trained into the model, suggesting that explicit values improve AI behavior — the same principle applies to teacher-written constitutions',
      'AI cannot be used in ways that violate school policy',
      'Constitutional AI means the model always produces accurate content'
    ],
    correctIndex: 1,
    explanation: 'Constitutional AI trains values into models to shape their behavior. The parallel for teachers: when you upload a document that explicitly states your values, constraints, and context, the model\'s output becomes more aligned with your classroom reality.'
  },

  // Your Classroom (3 questions)
  {
    type: 'select-all',
    id: 't1-classroom-1',
    moduleId: 'your-classroom-101',
    question: 'Which classroom details should be included in a Classroom Constitution to make AI outputs specific and usable? Select ALL that apply:',
    options: [
      'Student IEP rates and accommodation needs',
      'The AI tool you prefer to use',
      'Language backgrounds and reading levels in the room',
      'Device access and technology constraints',
      'Your favorite teaching quotes'
    ],
    correctIndices: [0, 2, 3],
    explanation: 'IEP context, language backgrounds, and device constraints directly shape what AI can produce that\'s usable in your specific classroom. Tool preference and inspirational quotes don\'t affect output quality.'
  },
  {
    type: 'multiple-choice',
    id: 't1-classroom-2',
    moduleId: 'your-classroom-101',
    question: 'A teacher pastes their constitution into AI and asks for a formative assessment. The output assumes all students read at grade level, includes technology their students don\'t have access to, and uses vocabulary above their students\' level. What\'s most likely missing from the constitution?',
    options: [
      'The teacher\'s name and school',
      'Student demographics, reading levels, and classroom constraints',
      'A longer, more detailed prompt',
      'The specific AI tool instructions'
    ],
    correctIndex: 1,
    explanation: 'When AI produces generic output despite a constitution, the missing pieces are usually the specific details about who is in the room and what they have access to. These are Sections 1 and 4 of the constitution.'
  },
  {
    type: 'true-false',
    id: 't1-classroom-3',
    moduleId: 'your-classroom-101',
    question: 'When you paste your Classroom Constitution into an AI chat session, the model permanently stores that information and remembers it in future sessions.',
    correctAnswer: false,
    explanation: 'Most AI models don\'t retain information between sessions. Your constitution must be uploaded at the start of every new session — it\'s working context, not stored memory. This is why the constitution is a document you paste daily.'
  },

  // Description (2 questions)
  {
    type: 'matching',
    id: 't1-description-1',
    moduleId: 'description-101',
    question: 'Match each prompt element to its function in producing specific AI output:',
    pairs: [
      { left: 'Constraints (grade level, time, format)', right: 'Narrows the output to what\'s actually usable in your room' },
      { left: 'Persona ("You are a co-teacher for an SDC science class")', right: 'Shapes the perspective and expertise the AI draws from' },
      { left: 'Context (constitution sections)', right: 'Pre-loads the specific reality of your classroom' },
      { left: 'Task ("Create a Week 8 formative assessment")', right: 'Defines exactly what you need the AI to produce' }
    ],
    explanation: 'Each element of description serves a specific function. Constraints narrow, personas shape perspective, context grounds in reality, and the task defines the output. Together they replace the need for long, complex prompts.'
  },
  {
    type: 'multiple-choice',
    id: 't1-description-2',
    moduleId: 'description-101',
    question: 'What is the relationship between description and the Classroom Constitution?',
    options: [
      'They are unrelated — description is about prompting, the constitution is about values',
      'The constitution IS pre-loaded description — infrastructure that makes every subsequent prompt shorter and more powerful',
      'The constitution replaces the need for description in prompts',
      'Description is only needed when you don\'t have a constitution'
    ],
    correctIndex: 1,
    explanation: 'The constitution is description you\'ve already written. When you upload it, every prompt starts with your classroom reality already established — so you can focus on the specific task instead of re-describing your context every time.'
  },

  // When to Use It (2 questions)
  {
    type: 'select-all',
    id: 't1-judgment-1',
    moduleId: 'when-to-use-it-101',
    question: 'Which classroom tasks are APPROPRIATE to delegate to AI? Select ALL that apply:',
    options: [
      'Generating differentiated versions of an assessment you\'ve already designed',
      'Deciding which students need intervention',
      'Drafting a parent communication about project progress',
      'Building relationships with students who are struggling',
      'Sourcing materials and estimating costs for a hands-on project'
    ],
    correctIndices: [0, 2, 4],
    explanation: 'AI can help with differentiation, communication drafts, and logistics — tasks where your judgment shapes the input and you review the output. Relationship-building and intervention decisions require the human knowledge that only you have.'
  },
  {
    type: 'multiple-choice',
    id: 't1-judgment-2',
    moduleId: 'when-to-use-it-101',
    question: 'Section 5 of the Classroom Constitution — Teacher\'s Vision for Student Outcomes — is described as the most important section. Why?',
    options: [
      'It\'s the longest section and contains the most detail',
      'It defines what you actually believe your students can achieve, which becomes the mandate AI works from when building your PBL unit',
      'It\'s required for certification',
      'It replaces the need for state standards'
    ],
    correctIndex: 1,
    explanation: 'Section 5 is the north star. When AI helps you build a PBL unit in Tier 2, your vision for student outcomes is what it works toward — not a generic standard, but what you believe is possible for these specific students.'
  }
];

// Tier 2: The Unit (10 questions)
// Tests: backwards planning, persona/iteration, implementation
const tier2Questions: QuizQuestion[] = [
  // Backwards Planning (3-4 questions)
  {
    type: 'multiple-choice',
    id: 't2-planning-1',
    moduleId: 'backwards-planning-201',
    question: 'What does backwards planning require that traditional unit planning doesn\'t?',
    options: [
      'More detailed lesson plans',
      'Starting from the final student outcome and designing backward through phases, so every activity serves the endpoint',
      'Using AI for every planning step',
      'Longer planning timelines'
    ],
    correctIndex: 1,
    explanation: 'Backwards planning starts from what students will demonstrate at the end and works backward. Every phase — launch, inquiry, build, present, reflect — exists to move students toward that outcome.'
  },
  {
    type: 'true-false',
    id: 't2-planning-2',
    moduleId: 'backwards-planning-201',
    question: 'Before backwards planning with AI, teachers should re-read and sharpen Section 5 of their constitution (Vision for Student Outcomes).',
    correctAnswer: true,
    explanation: 'The vision has to be clear before the map can be drawn. If Section 5 is vague, the backwards plan will be vague. AI can only work toward what you\'ve articulated.'
  },
  {
    type: 'select-all',
    id: 't2-planning-3',
    moduleId: 'backwards-planning-201',
    question: 'Which elements should a backwards-planned PBL semester timeline include? Select ALL that apply:',
    options: [
      'Clear phases (launch, inquiry, build, present, reflect)',
      'Daily lesson plans for every session',
      'Checkpoints where student progress is assessed',
      'Moments where the timeline might need to flex based on student needs',
      'A driving question that connects every phase'
    ],
    correctIndices: [0, 2, 3, 4],
    explanation: 'A semester timeline needs phases, checkpoints, flex points, and a driving question. Daily lesson plans are too granular for a semester-level plan — those come later during implementation.'
  },
  {
    type: 'multiple-choice',
    id: 't2-planning-4',
    moduleId: 'backwards-planning-201',
    question: 'You upload your constitution and ask AI to create a semester timeline. The output looks polished but doesn\'t connect to your Section 5 vision. What\'s the best response?',
    options: [
      'Accept it — AI knows best about PBL structure',
      'Start over with a completely different prompt',
      'Tell AI specifically where the timeline diverges from your vision and ask it to revise those sections',
      'Abandon AI planning and do it by hand'
    ],
    correctIndex: 2,
    explanation: 'This is iteration — name what\'s working, identify where it misses the mark (specifically, the disconnect from your vision), and ask for targeted revision. The AI got the structure right; it just needs to be steered toward your actual goals.'
  },

  // Persona & Iteration (3 questions)
  {
    type: 'matching',
    id: 't2-persona-1',
    moduleId: 'persona-iteration-201',
    question: 'Match each technique to its purpose in the PBL design process:',
    pairs: [
      { left: 'Persona assignment', right: 'Gives AI a specific expertise and perspective to draw from' },
      { left: 'Meta-prompting', right: 'Asks AI to improve your prompt before executing it' },
      { left: 'Iteration', right: 'Refines output through targeted feedback across multiple rounds' },
      { left: 'Differentiation through iteration', right: 'Adapts a single project structure for different learner needs' }
    ],
    explanation: 'Persona shapes perspective, meta-prompting improves the ask, iteration refines the output, and differentiation through iteration ensures the unit works for all students in the room.'
  },
  {
    type: 'multiple-choice',
    id: 't2-persona-2',
    moduleId: 'persona-iteration-201',
    question: 'What is meta-prompting?',
    options: [
      'Writing very long, detailed prompts',
      'Asking AI to critique and improve your prompt before it executes it',
      'Using multiple AI tools at once',
      'Prompting about the concept of prompting in general'
    ],
    correctIndex: 1,
    explanation: 'Meta-prompting asks AI to be your prompt engineer — "Before you do this task, what questions would you ask me? What\'s missing from my prompt?" This consistently produces better results than even well-crafted first attempts.'
  },
  {
    type: 'select-all',
    id: 't2-persona-3',
    moduleId: 'persona-iteration-201',
    question: 'Which are effective iteration practices? Select ALL that apply:',
    options: [
      'Name what\'s working before naming what isn\'t',
      'Give 1-3 specific changes per iteration round',
      'Rewrite the entire prompt from scratch each time',
      'Describe what you want instead of what\'s wrong',
      'Keep iterating until the output is perfect'
    ],
    correctIndices: [0, 1, 3],
    explanation: 'Effective iteration preserves what works, makes specific targeted changes, and describes the desired replacement. Starting over loses progress, and perfection is the enemy of usable — know when to stop.'
  },

  // Draft to Implementation (3 questions)
  {
    type: 'multiple-choice',
    id: 't2-implement-1',
    moduleId: 'draft-to-implementation-201',
    question: 'What primarily separates a theoretically sound PBL unit from an implementable one?',
    options: [
      'Length and detail',
      'Teacher clarity, student-facing language, and logistical specificity',
      'How many standards it covers',
      'Whether it was designed with AI'
    ],
    correctIndex: 1,
    explanation: 'An implementable unit has clear teacher instructions, language students can actually understand, and specific logistics (materials, timing, room setup). A unit can be pedagogically brilliant and still fail Monday morning if these are missing.'
  },
  {
    type: 'true-false',
    id: 't2-implement-2',
    moduleId: 'draft-to-implementation-201',
    question: 'If students will use AI during a PBL project, the teacher should prepare them in advance with clear guidance about when and how to use it.',
    correctAnswer: true,
    explanation: 'Transparency about AI use is part of implementation. Students need to know what the teacher\'s role becomes, what AI interactions look like, and what productive use means in the context of their specific project.'
  },
  {
    type: 'select-all',
    id: 't2-implement-3',
    moduleId: 'draft-to-implementation-201',
    question: 'Using AI to anticipate where students will struggle means: Select ALL that apply:',
    options: [
      'Asking AI to identify potential misconceptions based on your constitution\'s student demographics',
      'Designing scaffolds before problems arise rather than improvising in the moment',
      'Eliminating all difficulty from the project',
      'Building in checkpoints where you can assess and adjust',
      'Creating a backup plan that removes the project\'s challenge'
    ],
    correctIndices: [0, 1, 3],
    explanation: 'Anticipating struggle means identifying likely friction points and designing for them — not eliminating productive difficulty. The goal is preparation, not prevention of all challenge.'
  }
];

// Tier 3: The Practice (10 questions)
// Tests: evaluation, student AI work, constitution revision
const tier3Questions: QuizQuestion[] = [
  // Evaluating Output (3 questions)
  {
    type: 'multiple-choice',
    id: 't3-eval-1',
    moduleId: 'evaluating-output-301',
    question: 'What is the difference between AI-assisted evaluation and AI-delegated evaluation?',
    options: [
      'AI-assisted uses better AI tools',
      'AI-assisted means AI provides analysis that YOU judge and decide on; AI-delegated means you accept AI\'s verdict as final',
      'AI-delegated is faster and therefore better for busy teachers',
      'There is no meaningful difference'
    ],
    correctIndex: 1,
    explanation: 'The distinction is the whole ballgame. AI-assisted evaluation keeps you in the professional judgment seat — AI surfaces things, you decide what matters. AI-delegated evaluation outsources the judgment itself, which is the one thing AI cannot do for your specific classroom.'
  },
  {
    type: 'select-all',
    id: 't3-eval-2',
    moduleId: 'evaluating-output-301',
    question: 'When using AI to evaluate your own PBL unit, which research-backed frameworks should you evaluate against? Select ALL that apply:',
    options: [
      'ICAP (Interactive, Constructive, Active, Passive engagement levels)',
      'Bloom\'s Taxonomy word count requirements',
      'Culturally sustaining pedagogy principles',
      'Universal Design for Learning (UDL)',
      'AI-generated readability scores only'
    ],
    correctIndices: [0, 2, 3],
    explanation: 'ICAP, culturally sustaining pedagogy, and UDL are research-backed frameworks that address engagement quality, cultural responsiveness, and accessibility. Word counts and readability scores alone don\'t evaluate pedagogical quality.'
  },
  {
    type: 'true-false',
    id: 't3-eval-3',
    moduleId: 'evaluating-output-301',
    question: 'If AI gives your PBL unit a positive evaluation, you can be confident it\'s ready to teach.',
    correctAnswer: false,
    explanation: 'AI evaluations are useful but limited — the model doesn\'t know your students, your relationships, or the specific dynamics of your classroom. AI can surface patterns and frameworks; you own the final judgment about whether something is ready for your room.'
  },

  // AI in Student Work (4 questions)
  {
    type: 'multiple-choice',
    id: 't3-student-1',
    moduleId: 'ai-student-work-301',
    question: 'Why must policy precede accusation when it comes to student AI use?',
    options: [
      'Because AI detection tools are 100% unreliable',
      'Because students deserve clear expectations before consequences — you can\'t hold students accountable to rules they didn\'t know existed',
      'Because schools require it legally',
      'Because AI detection is too expensive'
    ],
    correctIndex: 1,
    explanation: 'The principle is fairness: students need to know what\'s expected before they can be held accountable. A classroom AI policy establishes those expectations. Without one, any accusation of misuse is standing on nothing.'
  },
  {
    type: 'select-all',
    id: 't3-student-2',
    moduleId: 'ai-student-work-301',
    question: 'Which elements belong in a classroom AI policy? Select ALL that apply:',
    options: [
      'When students may and may not use AI during the project',
      'What productive AI use looks like with specific examples',
      'A list of approved AI tools ranked by quality',
      'What students should do if they\'re unsure whether AI use is appropriate',
      'How the policy will be revised as technology and practice evolve'
    ],
    correctIndices: [0, 1, 3, 4],
    explanation: 'A strong policy addresses when, how, uncertainty protocols, and revision plans. Ranking AI tools is a logistics detail, not a policy element — the principles should hold regardless of which tool students use.'
  },
  {
    type: 'matching',
    id: 't3-student-3',
    moduleId: 'ai-student-work-301',
    question: 'Match each student AI use case to whether it undermines or extends learning:',
    pairs: [
      { left: 'Student asks AI to write their data analysis', right: 'Undermines — bypasses the analytical thinking the assignment develops' },
      { left: 'Student asks AI to argue against their hypothesis', right: 'Extends — AI challenges student thinking, student responds' },
      { left: 'Student pastes a prompt and submits the raw output', right: 'Undermines — no student thinking involved' },
      { left: 'Student asks AI to explain a concept they\'re stuck on, then applies it', right: 'Extends — AI clarifies, student does the work' }
    ],
    explanation: 'The distinction is who does the thinking. AI that replaces student cognition undermines learning; AI that responds to student thinking and requires student judgment extends it.'
  },
  {
    type: 'true-false',
    id: 't3-student-4',
    moduleId: 'ai-student-work-301',
    question: 'AI detection tools can reliably determine whether a student used AI to complete an assignment.',
    correctAnswer: false,
    explanation: 'AI detection tools produce false positives (flagging human writing as AI) and false negatives (missing actual AI use). They are unreliable, which is exactly why policy and transparent expectations are more effective than surveillance.'
  },

  // Closing the Loop (3 questions)
  {
    type: 'multiple-choice',
    id: 't3-loop-1',
    moduleId: 'closing-the-loop-301',
    question: 'Why should the Classroom Constitution be revised quarterly rather than written once?',
    options: [
      'Because the AI tools change too frequently',
      'Because classrooms, students, and the teacher\'s own understanding evolve — a static document becomes inaccurate over time',
      'Because administrators require quarterly updates',
      'Because the original constitution was probably wrong'
    ],
    correctIndex: 1,
    explanation: 'A constitution that doesn\'t change with the classroom stops being useful. New students arrive, your understanding deepens, your practice shifts. Quarterly revision keeps the document honest and current.'
  },
  {
    type: 'select-all',
    id: 't3-loop-2',
    moduleId: 'closing-the-loop-301',
    question: 'The three documents that should "speak to each other" by the end of the curriculum are: Select ALL that apply:',
    options: [
      'The revised Classroom Constitution',
      'The lesson plan database',
      'The complete PBL unit',
      'The classroom AI policy',
      'The school technology plan'
    ],
    correctIndices: [0, 2, 3],
    explanation: 'Constitution, PBL unit, and AI policy are the three living documents. The constitution grounds both; the PBL unit applies the constitution\'s vision; the AI policy governs how AI is used within both. They form a coherent practice.'
  },
  {
    type: 'matching',
    id: 't3-loop-3',
    moduleId: 'closing-the-loop-301',
    question: 'Match each constitution section to the kind of revision it most commonly needs:',
    pairs: [
      { left: 'Section 1: Student Demographics', right: 'Update for new students, changed IEP statuses, shifted reading levels' },
      { left: 'Section 2: Pedagogical Values', right: 'Refine based on what you\'ve learned about AI-assisted teaching' },
      { left: 'Section 4: Classroom Constraints', right: 'Adjust for new technology, changed schedules, different room setups' },
      { left: 'Section 5: Vision for Student Outcomes', right: 'Deepen based on what you now believe is possible after teaching with AI' }
    ],
    explanation: 'Each section evolves for different reasons. Demographics shift with enrollment, values deepen with experience, constraints change with logistics, and vision expands as you see what\'s possible.'
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
