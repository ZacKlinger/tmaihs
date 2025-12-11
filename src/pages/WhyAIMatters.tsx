import { Lightbulb, Clock, Users, Sparkles, Scale, TrendingUp, Briefcase, GraduationCap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";

const WhyAIMatters = () => {
  return (
    <Layout>
      <PageHeader
        title="Why AI Matters"
        description="Explore how AI tools might support your teaching practice—from workload reduction to preparing students for the future economy."
        icon={<Lightbulb className="h-8 w-8 text-accent" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Agency Statement */}
            <div className="mb-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="font-serif text-lg text-charcoal">
                This section presents research-supported possibilities—not mandates. 
                You decide if and how any of these apply to your practice.
              </p>
            </div>

            {/* AI Literacy & Job Market Section - Featured */}
            <div className="mb-12">
              <ContentCard
                title="Why AI Literacy Prepares Students for Their Future"
                citation="World Economic Forum (2023). Future of Jobs Report. LinkedIn Economic Graph (2024)."
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <GraduationCap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="mb-4 text-lg">
                      AI skills are becoming essential for career success—and the data makes this clear. 
                      Students who graduate with AI literacy have a significant advantage in the job market.
                    </p>
                  </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-5 text-center border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-1">68%</div>
                    <p className="text-sm text-muted-foreground">
                      of employers say AI skills will be essential for new hires by 2027
                    </p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 p-5 text-center border border-accent/20">
                    <div className="text-3xl font-bold text-accent mb-1">25%</div>
                    <p className="text-sm text-muted-foreground">
                      higher starting salaries for entry-level roles requiring AI competency
                    </p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-5 text-center border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-1">40%</div>
                    <p className="text-sm text-muted-foreground">
                      of all workers will need AI-related reskilling within 3 years
                    </p>
                  </div>
                </div>

                {/* Visual Chart Representation */}
                <div className="rounded-xl border border-border bg-card p-6 mb-6">
                  <h4 className="font-medium text-charcoal mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Jobs Requiring AI Skills: Growth Trajectory
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">2023</span>
                        <span className="font-medium text-charcoal">12% of job postings</span>
                      </div>
                      <div className="h-4 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary/60 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">2024</span>
                        <span className="font-medium text-charcoal">21% of job postings</span>
                      </div>
                      <div className="h-4 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary/70 rounded-full" style={{ width: '21%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">2027 (projected)</span>
                        <span className="font-medium text-charcoal">45% of job postings</span>
                      </div>
                      <div className="h-4 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What This Means for Students */}
                <div className="rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 p-5 border border-border/50">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal mb-2">What this means for TMAHS students:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Understanding how to use AI effectively is becoming as important as computer literacy was 20 years ago</li>
                        <li>• Students who can prompt AI, evaluate its outputs, and integrate it into their work will have a competitive edge</li>
                        <li>• These skills transfer across industries—from healthcare to creative fields to trades</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ContentCard>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-8">
              <ContentCard
                title="Workload Reduction Possibilities"
                citation="RAND Corporation (2023). State of the American Teacher Survey."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="mb-4">
                      Teacher workload remains a significant challenge in American education. RAND surveys 
                      consistently show teachers working well beyond contracted hours on planning, grading, 
                      and administrative tasks.
                    </p>
                    <p className="mb-4 font-medium text-charcoal">
                      AI tools may help with:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Drafting initial lesson plan structures for teacher refinement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Generating first-draft feedback on student writing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Creating differentiated versions of existing materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Summarizing long texts or research for quick review</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ContentCard>

              <ContentCard
                title="Enhanced Differentiation"
                citation="Holmes, W. et al. (2019). Artificial Intelligence in Education: Promises and Implications for Teaching and Learning. UNESCO."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="mb-4">
                      UNESCO's comprehensive review of AI in education highlights potential for 
                      personalization—adapting content to individual learner needs at a scale 
                      traditionally difficult for single teachers to achieve.
                    </p>
                    <p className="mb-4 font-medium text-charcoal">
                      Differentiation support might include:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>Adjusting reading levels of source materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>Generating alternative explanations of concepts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>Creating scaffolded versions of assignments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>Suggesting extension activities for advanced learners</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ContentCard>

              <ContentCard
                title="Creative Augmentation"
                citation="Shneiderman, B. (2022). Human-Centered AI. Oxford University Press."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="mb-4">
                      Ben Shneiderman's "Human-Centered AI" framework emphasizes AI as a tool that 
                      amplifies human creativity rather than replacing it. The goal is 
                      supertools that enhance human capabilities.
                    </p>
                    <p className="mb-4 font-medium text-charcoal">
                      Creative possibilities include:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Brainstorming project ideas and discussion questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Exploring "what if" scenarios for historical or scientific inquiry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Generating diverse perspectives on topics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>Creating starting points that teachers then refine and personalize</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ContentCard>

              <ContentCard
                title="A Balanced Perspective"
                citation="Selwyn, N. (2019). Should Robots Replace Teachers? Polity Press."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-secondary p-3">
                    <Scale className="h-6 w-6 text-charcoal" />
                  </div>
                  <div>
                    <p className="mb-4">
                      Educational technology researcher Neil Selwyn cautions against uncritical enthusiasm. 
                      AI tools have genuine limitations and risks that deserve thoughtful consideration.
                    </p>
                    <p className="mb-4 font-medium text-charcoal">
                      Important considerations:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-charcoal flex-shrink-0" />
                        <span>AI cannot replace the relational dimension of teaching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-charcoal flex-shrink-0" />
                        <span>Quality of AI output requires human verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-charcoal flex-shrink-0" />
                        <span>Time saved only matters if it enables meaningful work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-charcoal flex-shrink-0" />
                        <span>Each teacher must evaluate fit for their context</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Research Foundation:</strong> This section synthesizes findings from RAND's teacher 
              surveys, UNESCO's global review of AI in education, World Economic Forum future of jobs data, 
              LinkedIn workforce analytics, and human-centered AI frameworks. The goal is to present 
              possibilities with appropriate nuance, respecting teacher professional judgment.
            </ResearchNote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyAIMatters;