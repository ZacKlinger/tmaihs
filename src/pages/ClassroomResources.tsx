import { FolderOpen, BookOpen, ExternalLink, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { Button } from "@/components/ui/button";
import dailyProjectSheet from "@/assets/daily-project-sheet.jpg";
import workExample from "@/assets/work-example-new.png";
import claudeLogo from "@/assets/claude-logo.png";
import playlabLogo from "@/assets/playlab-logo.png";
import khanmigoLogo from "@/assets/khanmigo-logo.svg";
import hydroponicsBuild1 from "@/assets/hydroponics-build-1.jpg";
import hydroponicsBuild2 from "@/assets/hydroponics-build-2.jpg";

const aiTools = [
{
  id: "claude",
  name: "Claude",
  provider: "Anthropic",
  logo: claudeLogo,
  description: "Claude serves as a powerful PBL design partner for teachers. Trained on your school's resources and frameworks, it can align multiple content areas to a single project, create backwards plans with weekly inquiry arcs, and even source materials — saving significant time and cost in project development.",
  useCases: [
  {
    title: "PBL Unit Design",
    description: "Share your standards, class profile, and project vision. Claude creates a complete backwards plan with phased learning targets, inquiry structures, and scaffolds."
  },
  {
    title: "Feedback on Ideas",
    description: "Share lesson concepts, project ideas, or assessment drafts with Claude to receive constructive feedback, identify gaps, and explore alternative approaches."
  },
  {
    title: "Question Generation",
    description: "Generate discussion questions, comprehension checks, or higher-order thinking prompts at various Bloom's taxonomy levels for any content area."
  }],

  links: {
    main: "https://claude.ai",
    training: "https://www.anthropic.com/news/anthropic-teach-for-all"
  },
  citation: "Research on AI-assisted lesson planning suggests that teachers find generative AI most valuable for differentiation and personalization tasks (Mollick & Mollick, 2023).",
  caseStudy: {
    title: "Case Study: AI-Designed Hydroponics PBL",
    subtitle: "SDC Science — Physics, Biology & Chemistry Integration",
    summary: "Claude was used to design a 16-week interdisciplinary hydroponics project for a Special Day Class enrolling students in physics, biology, and chemistry. After being trained on TMAHS-provided PBL resources, Claude seamlessly aligned content areas to a singular project, created a backwards plan with weekly inquiry arcs, and sourced all parts for a combined build cost of only $1,100 — compared to $5,000 for an educational hydroponics kit.",
    highlights: [
    { label: "Duration", value: "16 weeks" },
    { label: "Subjects integrated", value: "Physics, Biology, Chemistry" },
    { label: "Build cost", value: "$1,100 vs. $5,000 kit" },
    { label: "Class profile", value: "8 IEP students, mixed grade levels" }],

    images: [
    { src: hydroponicsBuild1, alt: "Teacher preparing lumber for hydroponics build at TMAHS" },
    { src: hydroponicsBuild2, alt: "Student sawing wood for the hydroponics system build" }],

    unitPlan: {
      title: "Designing, Building, and Optimizing a Classroom Hydroponics System",
      phases: [
      {
        name: "Phase 1: Engineering Foundations",
        weeks: "Weeks 1–3",
        focus: "Defining the problem and building the system",
        standards: "HS-ETS1-1, HS-ETS1-2, HS-ETS1-3",
        targets: ["Explain the problem and constraints", "Compare hydroponic system designs", "Build and test a prototype"]
      },
      {
        name: "Phase 2: Physics of Systems",
        weeks: "Weeks 4–6",
        focus: "Energy, flow, and stability",
        standards: "HS-PS3-3, HS-PS2-1, HS-PS2-6",
        targets: ["Explain how energy and forces affect the system", "Adjust flow and structure to improve performance", "Identify and fix system problems"]
      },
      {
        name: "Phase 3: Biology of Growth",
        weeks: "Weeks 7–8",
        focus: "Photosynthesis and plant needs",
        standards: "HS-LS1-5, HS-LS1-3",
        targets: ["Explain what plants need to grow", "Connect plant health to system conditions", "Observe and describe changes using scientific language"]
      },
      {
        name: "Phase 4: Chemistry of Solutions",
        weeks: "Weeks 9–10",
        focus: "Nutrients, pH, and chemical interactions",
        standards: "HS-PS1-2, HS-PS1-5",
        targets: ["Explain what a solution is", "Measure and adjust nutrient levels and pH", "Predict how chemical changes affect plants"]
      },
      {
        name: "Phase 5: Matter, Systems & Resilience",
        weeks: "Weeks 11–12",
        focus: "Growth, cycling, and system stability",
        standards: "HS-LS1-6, HS-LS2-7",
        targets: ["Explain where plant mass comes from", "Identify system disturbances and respond", "Evaluate system health over time"]
      },
      {
        name: "Phase 6: Optimization & Sustainability",
        weeks: "Weeks 13–15",
        focus: "Revision, impact, and communication",
        standards: "HS-ETS1-4, HS-ESS3-4, HS-LS2-8",
        targets: ["Improve a system based on evidence", "Explain sustainability tradeoffs", "Defend design decisions"]
      }]

    }
  }
},
{
  id: "playlab",
  name: "Playlab",
  provider: "Playlab.ai",
  logo: playlabLogo,
  description: "Playlab enables teachers to create custom AI assistants—either student-facing tutors or behind-the-scenes teacher tools. You can train bots on specific documents, rubrics, or instructional frameworks to create tailored learning experiences.",
  useCases: [
  {
    title: "Student-Facing Tutor",
    description: "Build an AI coach trained on your curriculum materials that guides students through assignments while maintaining your instructional approach."
  },
  {
    title: "Teacher Planning Assistant",
    description: "Create a private bot trained on your standards, pacing guides, and preferred resources to help with planning and differentiation."
  },
  {
    title: "Workflow Automation",
    description: "Design bots that structure student input—collecting responses, guiding reflection, or scaffolding complex multi-step tasks."
  }],

  links: {
    main: "https://www.playlab.ai",
    training: "https://learn.playlab.ai/introduction"
  },
  liveExample: {
    title: "Daily Project Sheet Coach",
    url: "https://www.playlab.ai/project/cmfbjdhwo1f0io70uxfuxecyr",
    description: "This Playlab bot was built to support students completing the Daily Project Sheet—a structured worksheet for project-based learning. The AI is trained on the worksheet template, grade-level math standards, and student interest profiles. When students access the bot, they select their interest area and the relevant standard, and the AI coaches them through each section of the worksheet with personalized, Socratic guidance."
  },
  citation: "Custom AI tutoring systems that incorporate learner context and structured scaffolding show promise for supporting productive struggle without reducing cognitive demand (Kapur, 2016; VanLehn, 2011)."
},
{
  id: "khanmigo",
  name: "Khanmigo",
  provider: "Khan Academy",
  logo: khanmigoLogo,
  description: "Khanmigo is Khan Academy's AI-powered teaching assistant designed specifically for educators. It provides structured tools that generate classroom-ready materials while maintaining pedagogical integrity.",
  useCases: [
  {
    title: "Quiz Generator",
    description: "Input your content topic and grade level, and Khanmigo generates a ready-to-use Google Form quiz with varied question types aligned to learning objectives."
  },
  {
    title: "Blooket Generator",
    description: "Create engaging game-based assessments by specifying your topic. Khanmigo produces Blooket-compatible question sets for interactive review sessions."
  },
  {
    title: "Lesson Planner",
    description: "Outline your learning goals and time constraints, and receive a structured lesson plan with activities, discussion prompts, and formative checks."
  }],

  links: {
    main: "https://www.khanmigo.ai",
    training: "https://www.khanacademy.org/khan-for-educators/khanmigo-for-educators"
  },
  exampleOutput: {
    type: "mockup",
    title: "Generated Quiz Example",
    content: `**Topic:** Linear Equations | **Grade:** 8th

**Question 1:** A taxi charges $3.50 plus $2.25 per mile. Write an equation representing the total cost C for m miles.
A) C = 2.25 + 3.50m
B) C = 3.50 + 2.25m ✓
C) C = 5.75m
D) C = 3.50 × 2.25m

**Question 2:** Solve for x: 2x + 7 = 15
[Open response field]

**Question 3:** Which graph represents y = -2x + 4?
[Image options A-D]`
  },
  citation: "Khan Academy's Khanmigo leverages GPT-4 with guardrails designed for educational contexts, emphasizing Socratic questioning over direct answers (Khan, 2023)."
}];


const ClassroomResources = () => {
  return (
    <Layout>
      <PageHeader
        title="Classroom Resources"
        description="Curated AI tools for educators, each with specific use cases, training resources, and real examples. These tools can support lesson planning, differentiation, and student engagement."
        icon={<FolderOpen className="h-8 w-8 text-primary" />} />


      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-5xl">
            {/* Research Context */}
            <div className="mb-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex-shrink-0">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="mb-3 font-serif text-xl font-semibold text-charcoal">
                    Research Foundation: AI as a Teaching Tool
                  </h2>
                  <p className="mb-4 text-muted-foreground leading-relaxed">
                    Research on AI in education emphasizes the importance of teacher agency in tool selection and use. 
                    Effective AI integration occurs when teachers maintain pedagogical decision-making while leveraging 
                    AI for time-intensive tasks like content generation and differentiation.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Key citations:</strong> Mollick, E. & Mollick, L. (2023). Assigning AI: Seven Approaches for Students. 
                    Holmes, W. et al. (2019). Artificial Intelligence in Education. Springer.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Tools Section */}
            <div className="mb-16">
              



              <div className="space-y-12">
                {aiTools.map((tool, index) =>
                <div
                  key={tool.id}
                  className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-soft opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}>

                    {/* Tool Header */}
                    <div className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden">
                            <img src={tool.logo} alt={`${tool.name} logo`} className="h-10 w-10 object-contain" />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl font-semibold text-charcoal">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{tool.provider}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <a
                          href={tool.links.main}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">

                            Visit Site
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                          <a
                          href={tool.links.training}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors">

                            Teacher Training
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Tool Content */}
                    <div className="p-6">
                      <p className="mb-6 text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Use Cases */}
                      <div className="mb-6">
                        <h4 className="mb-4 font-medium text-charcoal">Use Cases</h4>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {tool.useCases.map((useCase) =>
                        <div
                          key={useCase.title}
                          className="rounded-xl bg-secondary/50 p-4">

                              <p className="mb-2 font-medium text-charcoal text-sm">{useCase.title}</p>
                              <p className="text-sm text-muted-foreground">{useCase.description}</p>
                            </div>
                        )}
                        </div>
                      </div>

                      {/* Case Study */}
                      {tool.caseStudy &&
                    <div className="mb-6">
                          <h4 className="mb-2 font-medium text-charcoal">{tool.caseStudy.title}</h4>
                          <p className="mb-3 text-xs font-medium text-primary uppercase tracking-wide">{tool.caseStudy.subtitle}</p>
                          <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                            {tool.caseStudy.summary}
                          </p>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            {tool.caseStudy.highlights.map((h: {label: string;value: string;}) =>
                        <div key={h.label} className="rounded-xl bg-secondary/50 p-3 text-center">
                                <p className="text-xs text-muted-foreground mb-1">{h.label}</p>
                                <p className="text-sm font-semibold text-charcoal">{h.value}</p>
                              </div>
                        )}
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2 mb-5">
                            {tool.caseStudy.images.map((img: {src: string;alt: string;}, i: number) =>
                        <div key={i} className="rounded-xl border border-border overflow-hidden">
                                <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-64 object-cover"
                            loading="lazy" />

                              </div>
                        )}
                          </div>

                          {/* Unit Plan Accordion */}
                          {tool.caseStudy.unitPlan &&
                      <details className="group rounded-xl border border-border overflow-hidden">
                              <summary className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-primary/5 to-transparent p-4 hover:from-primary/10 transition-colors">
                                <div>
                                  <p className="font-medium text-charcoal text-sm">View Full Unit Plan</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{tool.caseStudy.unitPlan.title}</p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                              </summary>
                              <div className="border-t border-border p-4 space-y-4">
                                {tool.caseStudy.unitPlan.phases.map((phase: {name: string;weeks: string;focus: string;standards: string;targets: string[];}) =>
                          <div key={phase.name} className="rounded-lg bg-secondary/30 p-4">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                                      <h5 className="font-medium text-charcoal text-sm">{phase.name}</h5>
                                      <span className="text-xs text-muted-foreground">{phase.weeks}</span>
                                    </div>
                                    <p className="text-xs text-primary mb-1.5">Focus: {phase.focus}</p>
                                    <p className="text-xs text-muted-foreground mb-2">NGSS: {phase.standards}</p>
                                    <ul className="space-y-1">
                                      {phase.targets.map((t: string) =>
                              <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                                          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                                          {t}
                                        </li>
                              )}
                                    </ul>
                                  </div>
                          )}
                                <p className="text-xs text-muted-foreground italic pt-2 border-t border-border/50">
                                  Week 16 culminates with a harvest event, student presentations, and self-assessment reflections.
                                </p>
                              </div>
                            </details>
                      }
                        </div>
                    }

                      {tool.liveExample &&
                    <div className="mb-6">
                          <h4 className="mb-4 font-medium text-charcoal">Live Example: {tool.liveExample.title}</h4>
                          <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                            {tool.liveExample.description}
                          </p>
                          
                          {/* Side-by-side worksheet images */}
                          <div className="grid gap-6 md:grid-cols-2 mb-4">
                            <div className="rounded-xl border border-border overflow-hidden">
                              <div className="bg-secondary/50 px-4 py-2 border-b border-border">
                                <p className="text-sm font-medium text-charcoal">Blank Worksheet Template</p>
                              </div>
                              <div className="p-2 bg-white">
                                <img
                              src={dailyProjectSheet}
                              alt="Daily Project Sheet - blank template with sections for name, date, topic, do-now, 3 key steps, and practice problems"
                              className="w-full h-auto rounded" />

                              </div>
                            </div>
                            <div className="rounded-xl border border-border overflow-hidden">
                              <div className="bg-secondary/50 px-4 py-2 border-b border-border">
                                <p className="text-sm font-medium text-charcoal">Completed Student Work</p>
                              </div>
                              <div className="p-2 bg-white">
                                <img
                              src={workExample}
                              alt="Completed Daily Project Sheet showing student work on San Francisco housing data analysis with calculations and graphs"
                              className="w-full h-auto rounded" />

                              </div>
                            </div>
                          </div>

                          <a
                        href={tool.liveExample.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">

                            Try the Live Bot
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                    }

                      {/* Citation */}
                      <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-4">
                        {tool.citation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scaffolding Resources */}
            <div className="mb-12">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                Scaffolding for Diverse Learners
              </h2>
              
              <ContentCard
                title="Culturally Sustaining Pedagogy"
                citation="Paris, D. & Alim, H. S. (2017). Culturally Sustaining Pedagogies. Teachers College Press.">

                <p className="mb-4">
                  When using AI tools, consider these principles for culturally sustaining practice:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Community connection:</strong> Use AI to generate content that reflects students' cultural contexts and lived experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Multiple epistemologies:</strong> Prompt AI tools to present multiple perspectives and ways of knowing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Student voice:</strong> Train custom AI tools (like Playlab bots) on student interests and community topics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Critical review:</strong> Always review AI outputs for bias and cultural relevance before classroom use</span>
                  </li>
                </ul>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Important Note:</strong> These tools are resources for teacher exploration, not mandated 
              solutions. Each tool has strengths and limitations, and their effectiveness depends on thoughtful 
              integration into your specific instructional context. Start small, experiment, and adapt based 
              on what works for your students.
            </ResearchNote>

            {/* Navigation */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild variant="phoenix">
                <Link to="/prompt-engineering">
                  Learn Prompt Techniques
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/ethics-safety">
                  Review Ethics & Safety
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>);

};

export default ClassroomResources;