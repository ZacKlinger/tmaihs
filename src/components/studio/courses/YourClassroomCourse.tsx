import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface YourClassroomCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const YourClassroomCourse = (props: YourClassroomCourseProps) => {
  const sections = [
  {
    id: "context",
    type: "context" as const,
    title: "The Scenario",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">A Prompt That Knows Nothing About You</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You teach SDC science at TMAHS. Fourteen of your twenty-two students have IEPs. Six are emerging English learners. Three read below fifth-grade level. The school issued Chromebooks last year, but yours share a cart with two other classrooms, so you get devices maybe twice a week. Your students are eight weeks into a hydroponics build — they chose butterhead lettuce and collard greens, and the harvest is going to the community fridge on Third Street.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              You need a data-recording sheet for tomorrow's pH readings. So you open Claude and type: "Create a data recording sheet for a high school science class doing hydroponics." What comes back assumes students have laptops, can read at grade level, and are working through a standard lab curriculum. It's clean. It's professional. It has nothing to do with your room.
            </p>
          </div>
          <p>
            That gap is not a flaw in the tool. It's a gap in what the tool was given to work with. AI pattern-matches to the most common version of whatever you describe. "High school science class doing hydroponics" retrieves the average case — and your classroom is not the average case.
          </p>
          <p>
            Think about what a substitute teacher needs on their first day in your room. Not a curriculum guide — a document that says: here's who these students are, here's what they're working on, here's what they can and can't access, here's what to watch for. That document, handed to AI instead of a substitute, is what makes the difference between a generic worksheet and a useful one.
          </p>
          <p>
            In Module 1, you learned what AI actually is — a pattern-completion engine that works within what you give it. This module is about giving it the right material. You're going to build the first two sections of your <strong>AI Classroom Constitution</strong>: who is actually in the room, and what constraints shape every lesson you plan.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Sweller's cognitive load research" /> shows that the more precisely you define a task, the less noise both you and the system have to filter. Specificity is not extra work — it's the shortcut.
          </div>
        </div>

  },
  {
    id: "mental-model",
    type: "mental-model" as const,
    title: "Mental Model",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">What the Model Doesn't Know (and What That Costs You)</h2>
          <p className="text-lg">
            Every classroom is a specific ecosystem. Yours has a particular mix of reading levels, language backgrounds, IEP accommodations, device availability, and time constraints. When you prompt AI without mentioning any of this, you're asking it to cook dinner without telling it who's eating.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Generic Prompt:</p>
              <p className="text-sm">"Create a data recording sheet for a high school hydroponics project"</p>
              <p className="text-xs text-muted-foreground mt-2">
                AI assumes grade-level reading, individual device access, a 50-minute period, and no accommodation needs. The output requires students to type observations into a digital form with complex data fields.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">Specific Prompt:</p>
              <p className="text-sm">
                "Create a data recording sheet for 10th grade SDC science. 14 of 22 students have IEPs; 6 are emerging ELs. Reading levels range from 4th to 8th grade. Students share a Chromebook cart and only have devices on Tuesdays and Thursdays — this sheet needs to work on paper. They're recording pH readings for butterhead lettuce and collard greens in Week 8 of a 16-week hydroponics build. Keep the sheet to one page with large print, visual supports, and a sentence frame for observations."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                AI now knows who's in the room, what they can access, and how the sheet needs to function. The output is something you'd actually hand out.
              </p>
            </div>
          </div>

          <p>
            Six categories of information change everything about what AI produces for you. Think of them as the soil composition of your particular garden — without knowing the soil, no one can tell you what to plant.
          </p>

          <ul>
            <li><strong>IEP and accommodation context:</strong> How many students have IEPs? What kinds of accommodations shape your planning — extended time, modified assignments, visual supports, read-aloud needs?</li>
            <li><strong>Language backgrounds:</strong> How many English learners? At what proficiency levels? What home languages are in the room?</li>
            <li><strong>Reading levels:</strong> What's the actual range? Not the grade level on paper — the functional range you plan for.</li>
            <li><strong>Device access:</strong>Language backgrounds: How many English learners? At what proficiency levels? What home languages are in the room?

        </li>
            <li><strong>Time and pacing:</strong> How long is your period? How often do you meet? Is this a block schedule, a traditional period, or something else?</li>
            <li><strong>Chronic absenteeism:</strong> What's the attendance pattern? If a third of your class misses any given Monday, your materials need to account for re-entry.</li>
          </ul>

          <p>
            None of these are secrets. They're the planning variables you already carry in your head every time you design a lesson. The Constitution just writes them down in a form AI can use.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-8">A Note About Privacy</h3>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="text-muted-foreground">
              You're about to describe your students to a machine. That deserves a pause.
            </p>
            <p className="text-muted-foreground mt-3">
              Here's what's actually happening when you paste your Constitution into Claude or Gemini: the model reads your text, generates a response, and — in a standard session — does not retain that information after the conversation ends. It doesn't add your students to a database. It doesn't train on your session data by default. The next time you open a new conversation, the model has no memory of what you shared.
            </p>
            <p className="text-muted-foreground mt-3">
              That said, "the model doesn't retain it" is not the same as "it's completely private." Your text passes through a server. The company's data policies govern what happens to it in transit and in logs. And the line between aggregate demographics ("14 students have IEPs") and identifiable information ("Marcus has an IEP for dysgraphia and extended time") matters. The first is a planning variable. The second is a student record.
            </p>
            <p className="text-muted-foreground mt-3">
              The rule of thumb: describe your classroom the way you'd describe it to a colleague you trust but who doesn't know your students by name. Aggregate numbers, general accommodation types, overall reading ranges. Never student names, never specific diagnosis details, never anything that could identify an individual child to someone reading over your shoulder.
            </p>
          </div>

          <p>
            This isn't just caution — it's also better prompting. AI doesn't need to know that one student has a specific learning disability to produce a worksheet with visual supports. It needs to know that visual supports are a standard feature of materials in your room. The aggregate is both more ethical and more useful.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-8">How Uploading the Constitution Works</h3>

          <p>
            The mechanics are simple. At the start of any AI session, you paste your Constitution — the whole document — before your actual request. Think of it as tuning an instrument before you play. The model reads the Constitution as context, and everything it generates in that session is shaped by what you provided.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-2">The pattern looks like this:</p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>1. Open a new AI session</p>
              <p>2. Paste your full Constitution (all sections you've built so far)</p>
              <p>3. Add a line break and your actual request</p>
              <p>4. The model uses your Constitution as the lens for everything it produces</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">
              You do this every new session. The Constitution doesn't carry over between conversations — you bring it with you each time. Keep it somewhere easy to copy: a Google Doc, a note on your phone, a pinned file.
            </p>
          </div>

          <p>
            Why does pasting a document at the top of a conversation change the output so much? Because AI generates each word based on everything that came before it in the conversation. Your Constitution becomes part of that "everything." It's not a prompt — it's the ground the prompt stands on.
          </p>

          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Universal Design for Learning (UDL) framework" /> argues that designing for the margins benefits everyone in the room. The same logic applies here — a Constitution built around your most complex learners produces materials that work for all of them.
          </div>
        </div> },
  {
    id: "cfu-1",
    type: "cfu" as const,
    title: "Check 1",
    advancedCfuData: {
      id: "your-classroom-cfu-1",
      type: "identify-missing" as const,
      prompt: "Create a vocabulary review activity for my 10th grade science class. We're studying plant biology and I want something interactive that takes about 20 minutes.",
      context: "A teacher at TMAHS wrote this prompt for their SDC science classroom. The class has 22 students, 14 with IEPs, 6 emerging English learners, reading levels from 4th to 8th grade, and shared Chromebook access only on Tuesdays and Thursdays. They're in Week 8 of a hydroponics project. Which specific classroom details are missing from this prompt — details that would actually change the output?",
      elements: [
      {
        id: "iep-context",
        label: "IEP and accommodation needs (14 of 22 students have IEPs)",
        isMissing: true,
        explanation: "With 14 IEP students in 22, accommodations aren't an add-on — they're the baseline. AI needs to know that visual supports, modified text, and extended processing time are standard features, not modifications. Without this, the activity will assume neurotypical grade-level processing."
      },
      {
        id: "reading-levels",
        label: "Actual reading level range (4th–8th grade, not 10th)",
        isMissing: true,
        explanation: "The prompt says '10th grade' but the functional reading range is 4th to 8th. AI will pitch vocabulary and instructions at a 10th-grade level — which means half the class can't access the activity independently. The reading range is the single detail that changes the output the most."
      },
      {
        id: "language-backgrounds",
        label: "English learner count and proficiency levels",
        isMissing: true,
        explanation: "Six emerging ELs need specific supports — home language connections, visual definitions, sentence frames for academic language. A vocabulary activity without EL scaffolding will miss a quarter of the class."
      },
      {
        id: "device-access",
        label: "Device availability (shared cart, not daily access)",
        isMissing: true,
        explanation: "If this lesson falls on a non-device day, an 'interactive digital activity' is useless. AI defaults to assuming students have screens. Saying 'shared Chromebook cart, Tuesdays and Thursdays only' changes whether the activity is paper-based or digital."
      },
      {
        id: "project-connection",
        label: "Connection to current hydroponics project phase (Week 8, pH readings)",
        isMissing: true,
        explanation: "'Plant biology vocabulary' is generic. These students are in Week 8 of a hydroponics build, actively measuring pH and planning nutrient mixes. The vocabulary review should use their actual data and their actual plants — not a textbook word list."
      },
      {
        id: "font-size",
        label: "Font size and formatting preferences",
        isMissing: false,
        explanation: "Formatting preferences are nice-to-haves, not constraints that change the substance of what AI produces. You can always adjust font size after the fact. Spend your specificity on who's in the room, not what the margins look like."
      },
      {
        id: "ai-tool-choice",
        label: "Which AI tool to use (Claude vs. Gemini vs. ChatGPT)",
        isMissing: false,
        explanation: "Tool choice doesn't affect the quality of the output for this kind of task. A well-specified prompt produces useful vocabulary activities in any of them. The missing details are about your students, not your software."
      },
      {
        id: "standards-code",
        label: "Specific NGSS standard code number",
        isMissing: false,
        explanation: "While standards alignment matters for unit planning, a single vocabulary review activity doesn't hinge on the standard code. The project context and student needs shape this activity far more than a standards reference number would."
      }],

      minCorrect: 3
    }
  },
  {
    id: "workshop",
    type: "workshop" as const,
    title: "Practice",
    workshopData: {
      title: "Build Your Constitution: Demographics & Constraints",
      description: "This is where your Constitution starts taking shape. You're writing two sections — one about who's in the room, one about what constrains every lesson you plan. Use your real classroom, not the hydroponics example. When you paste these into an AI tool and ask for anything, you'll see the output shift from generic to specific. That shift is the whole point.",
      toolLinks: [
      { name: "Claude", url: "https://claude.ai" },
      { name: "Gemini", url: "https://gemini.google.com" }],

      starterPrompts: [
      {
        label: "Constitution Section 1: Student Demographics & IEP Context",
        prompt: `STUDENT DEMOGRAPHICS & IEP CONTEXT — save this as Section 1 of your AI Classroom Constitution.

I teach [GRADE/COURSE] at [SCHOOL NAME] in [CITY/NEIGHBORHOOD].
Class size: [NUMBER] students

IEP/504 context:
- Students with IEPs: [NUMBER] of [TOTAL]
- Common accommodation types: [e.g., "extended time, modified assignments, visual supports, read-aloud, preferential seating"]
- General support level: [e.g., "most students need scaffolded instructions and chunked tasks"]

Language backgrounds:
- English learners: [NUMBER] at [PROFICIENCY LEVELS — e.g., "emerging/developing"]
- Home languages represented: [e.g., "Spanish, Armenian, Tagalog"]
- Language supports I routinely use: [e.g., "bilingual glossaries, sentence frames, visual vocabulary"]

Reading levels:
- Functional range: [e.g., "4th–8th grade reading level across the class"]
- Grade level on paper vs. reality: [e.g., "10th graders, but most materials need to be written at 6th-grade level with vocabulary support"]

Chronic absenteeism:
- Attendance pattern: [e.g., "average 78% daily attendance; 6–8 students miss any given day"]
- How this affects planning: [e.g., "materials need to be self-contained; can't assume students saw yesterday's lesson"]

---
TEST IT: Paste this section into an AI tool and ask for a warm-up activity for your class. Compare the result to what you'd get from "create a warm-up for 10th grade science." Notice what changes.`
      },
      {
        label: "Constitution Section 4: Classroom Constraints",
        prompt: `CLASSROOM CONSTRAINTS — save this as Section 4 of your AI Classroom Constitution.

Time and scheduling:
- Period length: [MINUTES]
- Meeting frequency: [e.g., "daily," "block schedule — 90 min Tue/Thu," "every other day"]
- Realistic activity window: [e.g., "after attendance and warm-up, I have about 35 usable minutes"]

Device access:
- Setup: [e.g., "shared Chromebook cart with two other classrooms," "1:1 iPads," "phones only," "no devices"]
- Availability: [e.g., "Tuesdays and Thursdays only," "daily but unreliable Wi-Fi"]
- Default assumption: [e.g., "plan for paper-first; devices are a bonus, not a baseline"]

Room and materials:
- Physical setup: [e.g., "tables of 4, no individual desks," "rows with limited space for movement," "lab stations"]
- Available materials: [e.g., "projector, whiteboard, printed handouts, lab equipment for hydroponics"]
- Printing constraints: [e.g., "can print up to 30 pages per day; anything longer needs advance notice"]

Pacing realities:
- Transition time: [e.g., "5 minutes between activities minimum; my students need explicit transition cues"]
- Attention span: [e.g., "most students stay engaged 10–15 minutes per activity before needing a shift"]
- Scaffolding norm: [e.g., "I model everything before releasing to independent work; no cold starts"]

---
TEST IT: Paste both Section 1 and Section 4 into an AI tool. Ask for a lesson activity. See how the output respects your actual constraints — time, devices, pacing — instead of assuming an ideal classroom.`
      }],

      iterationTips: [
      "The numbers matter more than you think. '14 of 22 students have IEPs' tells AI that accommodations are the norm, not the exception. It changes the entire baseline of what gets generated.",
      "Be honest about device access. If you share a cart and only get Chromebooks twice a week, say so. AI will default to assuming every student has a screen unless you tell it otherwise.",
      "Describe your attendance pattern. If a third of the class misses any given Monday, your materials need to work for students walking in cold. That's a constraint AI should know about.",
      "Your reading level range is probably wider than the grade on the door. Use the functional range — the one you actually plan for — not the one on the schedule."]

    }
  },
  {
    id: "reflection",
    type: "reflection" as const,
    title: "Reflection",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Document Begins</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You now have two sections of your AI Classroom Constitution. Section 1 tells any AI tool who is in your room — the IEP context, the language backgrounds, the reading levels, the attendance patterns that shape every material you produce. Section 4 tells it what you're working with — the time, the devices, the room, the pacing realities.
            </p>
            <p className="text-muted-foreground mt-3">
              These two sections alone will change what AI produces for you. Not because the tool got smarter, but because you gave it the information it was missing.
            </p>
          </div>

          <p>
            Think about what happened when you tested your sections in the workshop. The warm-up activity that came back — did it assume your students could read at grade level, or did it account for the range you described? Did it require a device, or did it work on paper? Those differences trace directly back to what you wrote.
          </p>

          <p>
            There's a question worth sitting with: what would a colleague down the hall include in their Constitution that you wouldn't? Their room has different students, different constraints, different patterns of absence and presence. The same AI, given their Constitution, would produce entirely different materials. That's the point. The Constitution is not a template to fill out — it's a portrait of a specific place.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Before the Next Module</p>
            <p className="text-muted-foreground">
              Keep your two sections somewhere you can grab them quickly — a pinned doc, a note on your desktop. Before your next AI session for anything school-related, paste them in first. Use them for a week. Notice what the AI gets right that it didn't before, and notice what it still misses. The gaps you find will tell you what the next sections need to cover.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Your Constitution knows your students and your constraints. The next module adds precision to how you describe what you need — not just who's in the room, but how to tell AI exactly what to make, in language specific enough that the first output is close to usable.
            </p>
          </div>
        </div>

  }];


  return (
    <MicroCourseViewer
      courseId="your-classroom-101"
      title="Your Classroom, Not a Generic One"
      sections={sections}
      {...props} />);


};