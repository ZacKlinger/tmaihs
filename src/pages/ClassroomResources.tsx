import { FolderOpen, BookOpen, Users, Target, Lightbulb, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { Button } from "@/components/ui/button";

const pblProjects = [
  {
    title: "Community Storytelling Archive",
    subject: "English Language Arts / Social Studies",
    duration: "4-6 weeks",
    description: "Students interview community members, transcribe oral histories, and create a digital archive that preserves local narratives.",
    aiRole: "AI assists with transcription, suggests interview questions, and helps students identify themes across stories.",
    drivingQuestion: "How do the stories of our community shape our understanding of local history and identity?",
    icapLevel: "Interactive",
  },
  {
    title: "Environmental Impact Assessment",
    subject: "Science / Math",
    duration: "3-4 weeks",
    description: "Students analyze local environmental data, identify patterns, and propose evidence-based solutions to a community environmental challenge.",
    aiRole: "AI helps with data analysis prompts, suggests visualization approaches, and provides feedback on scientific writing.",
    drivingQuestion: "What environmental challenges affect our neighborhood, and what solutions could make a measurable difference?",
    icapLevel: "Constructive",
  },
  {
    title: "Cultural Celebration Design",
    subject: "Art / World Languages",
    duration: "3-4 weeks",
    description: "Students research cultural celebrations, design inclusive event materials, and create multilingual resources for community engagement.",
    aiRole: "AI supports translation drafts, suggests design principles, and provides cultural context for teacher review.",
    drivingQuestion: "How can we design an event that authentically celebrates and shares the cultural traditions in our community?",
    icapLevel: "Constructive",
  },
  {
    title: "Historical Perspective Project",
    subject: "History / English",
    duration: "2-3 weeks",
    description: "Students research a historical event from multiple perspectives, create character journals, and participate in structured dialogue.",
    aiRole: "AI generates initial perspective prompts, suggests primary sources, and helps students draft character voice examples.",
    drivingQuestion: "How do different perspectives on the same historical event help us understand its complexity and lasting impact?",
    icapLevel: "Interactive",
  },
];

const ClassroomResources = () => {
  return (
    <Layout>
      <PageHeader
        title="Classroom Resources"
        description="Project-based learning templates and classroom tools grounded in learning sciences research. Each resource includes research rationales, scaffolds, and suggestions for AI integration."
        icon={<FolderOpen className="h-8 w-8 text-accent" />}
      />

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
                    Research Foundation: Project-Based Learning
                  </h2>
                  <p className="mb-4 text-muted-foreground leading-relaxed">
                    These templates are informed by extensive PBL research, particularly Barron & Darling-Hammond's 
                    synthesis and Krajcik & Blumenfeld's design principles. Effective PBL includes authentic 
                    driving questions, sustained inquiry, student voice and choice, critique and revision, 
                    and public products.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Key citations:</strong> Barron, B. & Darling-Hammond, L. (2008). Teaching for Meaningful 
                    Learning. Krajcik, J. & Blumenfeld, P. (2006). Project-Based Learning. In Cambridge Handbook 
                    of the Learning Sciences.
                  </p>
                </div>
              </div>
            </div>

            {/* ICAP Framework Explanation */}
            <div className="mb-12">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal text-center">
                Understanding Activity Levels (ICAP Framework)
              </h2>
              <p className="mb-8 text-center text-muted-foreground">
                Each project indicates its primary ICAP level based on Chi & Wylie's framework for 
                differentiating learning activities by cognitive engagement.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { level: "Interactive", description: "Students co-construct knowledge through dialogue", color: "bg-accent/10 border-accent/30" },
                  { level: "Constructive", description: "Students generate new outputs beyond given information", color: "bg-primary/10 border-primary/30" },
                  { level: "Active", description: "Students manipulate or act on materials", color: "bg-secondary border-border" },
                  { level: "Passive", description: "Students receive information without overt action", color: "bg-muted border-border" },
                ].map((item) => (
                  <div key={item.level} className={`rounded-xl border p-4 ${item.color}`}>
                    <p className="font-medium text-charcoal">{item.level}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                <em>Citation: Chi, M. T. H. & Wylie, R. (2014). The ICAP Framework. Educational Psychologist.</em>
              </p>
            </div>

            {/* PBL Templates */}
            <div className="mb-16">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                Project-Based Learning Templates
              </h2>

              <div className="space-y-8">
                {pblProjects.map((project, index) => (
                  <div
                    key={project.title}
                    className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-soft opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Header */}
                    <div className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-charcoal">
                            {project.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                              {project.subject}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                              <Clock className="h-3 w-3" />
                              {project.duration}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {project.icapLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      {/* Driving Question */}
                      <div className="mb-6 rounded-xl bg-secondary/50 p-4">
                        <div className="flex items-start gap-3">
                          <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-charcoal mb-1">Driving Question</p>
                            <p className="text-muted-foreground italic">"{project.drivingQuestion}"</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Description */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-primary" />
                            <p className="text-sm font-medium text-charcoal">Project Overview</p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* AI Role */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-accent" />
                            <p className="text-sm font-medium text-charcoal">AI Integration (Optional)</p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.aiRole}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scaffolding Resources */}
            <div className="mb-12">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                Scaffolding for Diverse Learners
              </h2>
              
              <ContentCard
                title="Culturally Sustaining Pedagogy"
                citation="Paris, D. & Alim, H. S. (2017). Culturally Sustaining Pedagogies. Teachers College Press."
              >
                <p className="mb-4">
                  Each PBL template above is designed to support culturally sustaining practices:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Community connection:</strong> Projects draw on local contexts and student communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Multiple epistemologies:</strong> Value diverse ways of knowing and expressing understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Student voice:</strong> Built-in choice points let students shape their inquiry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span><strong>Multilingual supports:</strong> AI can assist with translation drafts (with teacher review)</span>
                  </li>
                </ul>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Important Note:</strong> These templates are starting points for teacher adaptation, 
              not prescriptions. Effective PBL requires teacher knowledge of students, context, and 
              curriculum—elements that cannot be captured in generic templates. Use these as inspiration 
              and modify extensively for your specific situation.
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
    </Layout>
  );
};

export default ClassroomResources;
