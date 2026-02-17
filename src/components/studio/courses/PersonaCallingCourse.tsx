import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface PersonaCallingCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const PersonaCallingCourse = (props: PersonaCallingCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Work Context</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              "You're planning a semester-long civic engagement project where students will propose solutions to 
              local housing issues. You need to design materials that consider multiple perspectives—housing advocates, 
              city planners, longtime residents, developers. What if you could consult each of these experts during 
              your prep period?"
            </p>
          </div>
          <p>
            <strong>Persona calling</strong> extends role assignment by strategically selecting expert perspectives
            that match specific task types. Different personas bring different expertise, priorities, and blind spots.
          </p>
          <p>
            You stress-tested your PBL unit concept in the last course. Now you'll get outside
            perspectives on it — from a PBL specialist, a relevant community stakeholder, and a
            student who might struggle. Each perspective will surface something different about your
            unit design before you build it out.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This technique draws on <ResearchLink text="Culturally Sustaining Pedagogy" /> (Paris & Alim)—ensuring 
            multiple perspectives are centered, not just dominant voices.
          </div>
        </div>
      ),
    },
    {
      id: "mental-model",
      type: "mental-model" as const,
      title: "Mental Model",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Persona Calling Mental Model</h2>
          <p className="text-lg">
            Different tasks benefit from different expert lenses. The key is matching the right persona 
            to your specific need—not just calling any expert.
          </p>
          
          <h3 className="text-lg font-semibold mt-6">Persona Categories for PBL</h3>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Content & Design Personas</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Subject matter expert (accuracy, depth)</li>
                <li>• Curriculum designer (scope, sequence, alignment)</li>
                <li>• PBL specialist (authentic tasks, driving questions)</li>
                <li>• Assessment expert (validity, evidence of learning)</li>
              </ul>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Perspective & Critique Personas</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Community stakeholder (real-world relevance)</li>
                <li>• Skeptical audience member (challenge assumptions)</li>
                <li>• End user of student work (usability, impact)</li>
                <li>• Student voice (confusion points, engagement)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Matching Personas to Project Phases</h3>
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Project Phase</th>
                  <th className="text-left py-2">Best Personas</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2">Driving question design</td>
                  <td>PBL specialist, community member with lived experience</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Research scaffolding</td>
                  <td>Subject expert, librarian/research specialist</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Prototype critique</td>
                  <td>End user, skeptical stakeholder, design critic</td>
                </tr>
                <tr>
                  <td className="py-2">Presentation prep</td>
                  <td>Target audience member, media/communication coach</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 mt-6">
            <p className="text-sm">
              <strong>Caution:</strong> Personas can inadvertently reinforce stereotypes. Be specific about 
              individual perspectives rather than demographic categories. "A housing advocate who has worked with 
              displaced families for 10 years" is better than "a Latino community member."
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "persona-calling-cfu-1",
        type: "output-match" as const,
        question: "Match each persona to the type of feedback they would provide.",
        description: "Different personas prioritize different aspects of project work.",
        pairs: [
          {
            promptId: "p1",
            prompt: "PBL curriculum designer with 15 years experience at High Tech High",
            outputId: "o1",
            output: "The driving question is too broad—students won't know where to start. Try: 'How can we reduce food waste in our school cafeteria by 30%?' This is specific, measurable, and actionable.",
            explanation: "PBL specialists focus on driving question quality, authenticity, and manageable scope.",
          },
          {
            promptId: "p2",
            prompt: "City council member who reviews student proposals annually",
            outputId: "o2",
            output: "Nice ideas, but I need to see budget projections and a realistic timeline. Who's responsible for maintenance after students graduate? These are the questions I'll ask in the meeting.",
            explanation: "Real stakeholders focus on feasibility, sustainability, and accountability—not just ideas.",
          },
          {
            promptId: "p3",
            prompt: "10th grader who struggled with last semester's project",
            outputId: "o3",
            output: "I don't understand what 'synthesize multiple sources' means. Can I see an example of what a good one looks like? Also, when you say 'present to stakeholders,' who are they exactly?",
            explanation: "Student personas surface confusion points, jargon, and missing scaffolds that teachers overlook.",
          },
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "persona-calling-cfu-2",
        type: "persona-task-match" as const,
        question: "Select the most effective persona for each task.",
        description: "Consider what expertise each task requires at this project phase.",
        tasks: [
          {
            id: "t1",
            description: "Students are interviewing community members next week. You need to prepare them for conversations with people who have strong opinions about the issue.",
            correctPersonaId: "community",
            explanation: "A community member with lived experience can model the types of responses students will encounter and prepare them for emotional or complex conversations.",
          },
          {
            id: "t2",
            description: "You're designing the project milestones and need to ensure each checkpoint builds toward the final product.",
            correctPersonaId: "pbl",
            explanation: "A PBL specialist understands backward design and can ensure milestones create a coherent arc, not disconnected activities.",
          },
          {
            id: "t3",
            description: "Students have drafted their proposals. You want to identify where their arguments are weakest before the public presentation.",
            correctPersonaId: "skeptic",
            explanation: "A skeptical stakeholder will find holes in reasoning and ask the tough questions students will face, allowing time to strengthen arguments.",
          },
        ],
        personas: [
          { id: "expert", name: "Subject Matter Expert", description: "Deep content knowledge" },
          { id: "community", name: "Community Member with Lived Experience", description: "Real-world perspective on the issue" },
          { id: "pbl", name: "PBL Curriculum Designer", description: "Project structure and scaffolding expertise" },
          { id: "skeptic", name: "Skeptical Stakeholder", description: "Critical evaluation of proposals" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Get Perspectives on Your PBL Unit",
        description: "Your unit concept has been stress-tested. Now get perspectives on it from the people who matter — a PBL specialist, a community stakeholder from your project, and a student. Load your Constitution, paste your unit concept, and ask each persona to review it.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Three-Perspective Unit Review",
            prompt: `[PASTE YOUR AI CLASSROOM CONSTITUTION FIRST]

---

Here's my PBL unit concept (revised after pre-mortem):
[PASTE YOUR UNIT CONCEPT + PRE-MORTEM REVISIONS]

Review this unit from THREE different perspectives:

PERSPECTIVE 1: As a PBL curriculum specialist, evaluate the driving question and project structure. Is this Gold Standard? What's missing?

PERSPECTIVE 2: As a [RELEVANT COMMUNITY STAKEHOLDER FROM YOUR CONSTITUTION], evaluate whether this project would produce work you'd actually find useful. Would you show up to the final presentation?

PERSPECTIVE 3: As a student in this class who struggles with [RELEVANT SKILL], identify where you'd get stuck and what would help.

For each perspective, give me specific, actionable feedback I can use to revise the unit before I build it out.`,
          },
          {
            label: "Community Interview Preparation",
            prompt: `You are a [SPECIFIC COMMUNITY MEMBER TYPE] who will be interviewed by high school students about [TOPIC].

Your perspective:
- You've been affected by this issue for [X] years
- You're [supportive/skeptical/conflicted] about proposed solutions because [REASON]
- You communicate in a [direct/emotional/guarded] way

A student asks you: "[SAMPLE QUESTION]"

Respond as you authentically would. Then, as yourself, tell me: What should students be prepared for when interviewing people like me?`,
          },
        ],
        iterationTips: [
          "Be specific about personas: 'longtime resident who remembers the neighborhood before gentrification' vs. 'community member.'",
          "Use personas to surface blind spots: 'What would a [skeptic/expert/affected person] say is missing from this plan?'",
          "Combine personas: 'You are a city planner WHO IS ALSO a parent of a student at this school.'",
          "Rotate personas across project phases—research benefits from experts; presentations benefit from audience members.",
        ],
      },
    },
    {
      id: "reflection",
      type: "reflection" as const,
      title: "Reflection",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Reflection & Transfer</h2>
          
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium mb-2">Your PBL Unit: Perspectives Gathered</p>
            <p className="text-muted-foreground">
              Your unit concept has now been stress-tested and reviewed from multiple perspectives.
              Save the feedback — note what resonated, what you're changing, and what you're
              keeping despite the critique. That reasoning is part of your design rationale.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Next: Build It</p>
            <p className="text-muted-foreground">
              In the next course, you'll take your revised unit concept and build it into a complete
              PBL unit — driving question, milestone map, assessment rubric, and scaffolds. The
              concept work you've done here means you'll be building from a strong foundation
              rather than discovering problems midway through.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Save your persona library:</strong> The perspectives you called on for this unit
              are reusable. Add them to your Constitution under a "Perspective Library" section —
              for community projects, you always consult a PBL specialist, a community stakeholder,
              and a struggling student.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="persona-calling-201"
      title="Persona Calling: Strategic Expert Perspectives"
      sections={sections}
      {...props}
    />
  );
};
