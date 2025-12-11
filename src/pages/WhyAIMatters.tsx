import { Lightbulb, Clock, Users, Sparkles, Scale } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";

const WhyAIMatters = () => {
  return (
    <Layout>
      <PageHeader
        title="Why AI Matters"
        description="Explore how AI tools might support your teaching practice—from workload reduction to creative augmentation. These are possibilities to consider, not prescriptions to follow."
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
              surveys, UNESCO's global review of AI in education, and human-centered AI frameworks. 
              The goal is to present possibilities with appropriate nuance, respecting teacher 
              professional judgment.
            </ResearchNote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyAIMatters;
