import { MessageSquareText, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";

const PromptEngineering = () => {
  return (
    <Layout>
      <PageHeader
        title="Prompt Engineering"
        description="Learn research-backed techniques for communicating effectively with AI systems. Better prompts lead to more useful outputs."
        icon={<MessageSquareText className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                Prompt engineering is the practice of crafting inputs that help AI systems produce 
                more relevant, accurate, and useful outputs. These techniques are grounded in HCI 
                research on instruction-following and cognitive science principles.
              </p>
            </div>

            {/* Core Principles */}
            <div className="mb-12">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                Core Principles
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <ContentCard
                  title="Be Specific"
                  citation="Ko, A. et al. (2023). Human-AI Interaction Guidelines. IEEE."
                >
                  <p className="mb-4">
                    Vague prompts produce vague results. Specific instructions about format, 
                    length, audience, and purpose dramatically improve output quality.
                  </p>
                  <div className="rounded-lg bg-destructive/5 p-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-destructive mb-1">
                      <XCircle className="h-4 w-4" />
                      <span className="font-medium">Vague</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "Write something about the Civil War"
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-500/5 p-3">
                    <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Specific</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "Write a 3-paragraph overview of the causes of the US Civil War for 10th grade 
                      students. Focus on economic factors and include one discussion question."
                    </p>
                  </div>
                </ContentCard>

                <ContentCard
                  title="Provide Context"
                  citation="Nielsen, J. Progressive Disclosure Guidelines. NN/g."
                >
                  <p className="mb-4">
                    AI systems don't know your classroom, students, or curriculum. Background 
                    information helps generate more relevant and appropriate responses.
                  </p>
                  <div className="rounded-lg bg-destructive/5 p-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-destructive mb-1">
                      <XCircle className="h-4 w-4" />
                      <span className="font-medium">Missing context</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "Create a math worksheet"
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-500/5 p-3">
                    <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">With context</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "Create a worksheet on fraction multiplication for 6th graders who have 
                      mastered adding fractions but struggle with word problems. Include 5 problems 
                      with increasing difficulty."
                    </p>
                  </div>
                </ContentCard>

                <ContentCard
                  title="Chunk Requests"
                  citation="Paas, F. & Ayres, P. (2014). Cognitive Load Theory. Springer."
                >
                  <p className="mb-4">
                    Complex requests often produce better results when broken into smaller steps. 
                    This aligns with cognitive load theory—managing complexity through sequencing.
                  </p>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="text-sm font-medium text-charcoal mb-2">Instead of one complex prompt:</p>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal pl-4">
                      <li>First, ask for a topic outline</li>
                      <li>Review and refine the outline</li>
                      <li>Then request content for each section</li>
                      <li>Finally, ask for polish and formatting</li>
                    </ol>
                  </div>
                </ContentCard>

                <ContentCard
                  title="Request Formats"
                  citation="Amershi, S. et al. (2019). Guidelines for Human-AI Interaction. CHI."
                >
                  <p className="mb-4">
                    Specify how you want information structured. Lists, tables, numbered steps, 
                    and other formats help organize output for your actual use case.
                  </p>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="text-sm font-medium text-charcoal mb-2">Format examples:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• "Present this as a numbered list"</li>
                      <li>• "Create a two-column table comparing..."</li>
                      <li>• "Use bullet points with one sentence each"</li>
                      <li>• "Format as a rubric with 4 performance levels"</li>
                    </ul>
                  </div>
                </ContentCard>
              </div>
            </div>

            {/* Failure Analysis */}
            <div className="mb-12">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                When Prompts Fail: Analysis & Improvement
              </h2>

              <ContentCard
                title="Common Failure Patterns"
                citation="Doshi-Velez, F. & Kim, B. (2017). Towards Rigorous Science of Interpretable ML. arXiv."
              >
                <div className="space-y-6">
                  <div className="border-l-2 border-destructive/50 pl-4">
                    <p className="font-medium text-charcoal mb-2">Pattern: Output is too generic</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Likely cause:</strong> Prompt lacks specificity about audience, purpose, or constraints
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <ArrowRight className="h-3 w-3" />
                      <span>Add details about who will use this and in what context</span>
                    </div>
                  </div>

                  <div className="border-l-2 border-destructive/50 pl-4">
                    <p className="font-medium text-charcoal mb-2">Pattern: Output contains errors or fabrications</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Likely cause:</strong> Request exceeds AI knowledge or asks for facts without verification
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <ArrowRight className="h-3 w-3" />
                      <span>Ask for reasoning, request citations, or break into verifiable parts</span>
                    </div>
                  </div>

                  <div className="border-l-2 border-destructive/50 pl-4">
                    <p className="font-medium text-charcoal mb-2">Pattern: Output misses the point</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Likely cause:</strong> Key requirement was implicit rather than explicit
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <ArrowRight className="h-3 w-3" />
                      <span>State your actual goal directly—don't assume it's obvious</span>
                    </div>
                  </div>

                  <div className="border-l-2 border-destructive/50 pl-4">
                    <p className="font-medium text-charcoal mb-2">Pattern: Output is too long or short</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Likely cause:</strong> No length or scope constraints provided
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <ArrowRight className="h-3 w-3" />
                      <span>Specify word count, paragraph count, or time-to-read</span>
                    </div>
                  </div>
                </div>
              </ContentCard>
            </div>

            {/* Educator-Specific Examples */}
            <div>
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                Example Prompts for Educators
              </h2>

              <div className="space-y-6">
                <ContentCard title="Lesson Planning Support">
                  <div className="rounded-lg bg-card border border-border/50 p-4 font-mono text-sm text-muted-foreground">
                    "I'm planning a 50-minute lesson on photosynthesis for 9th grade biology. 
                    My students respond well to hands-on activities and struggle with abstract 
                    concepts. Create a lesson outline that includes: (1) a hook activity (5 min), 
                    (2) direct instruction with a visual model (15 min), (3) a partner activity 
                    (20 min), and (4) an exit ticket question. Include one check-for-understanding 
                    question after each section."
                  </div>
                </ContentCard>

                <ContentCard title="Differentiated Materials">
                  <div className="rounded-lg bg-card border border-border/50 p-4 font-mono text-sm text-muted-foreground">
                    "Here is a reading passage from our textbook about the Great Migration. 
                    Create two versions: (1) a simplified version at approximately 6th grade 
                    reading level that maintains all key concepts, and (2) an extension version 
                    that adds additional historical context and 2-3 analytical questions. 
                    Mark vocabulary words that may need pre-teaching in each version."
                  </div>
                </ContentCard>

                <ContentCard title="Feedback Drafting">
                  <div className="rounded-lg bg-card border border-border/50 p-4 font-mono text-sm text-muted-foreground">
                    "I'm providing feedback on a student essay about climate change solutions. 
                    The rubric criteria are: (1) clear thesis, (2) evidence quality, (3) 
                    organization, (4) writing conventions. Draft feedback using a 'glow and grow' 
                    format with one specific strength and one specific area for improvement for 
                    each criterion. Keep feedback encouraging and actionable. I will review and 
                    personalize before sharing with the student."
                  </div>
                </ContentCard>
              </div>
            </div>

            <ResearchNote>
              <strong>Research Foundation:</strong> These techniques draw from CHI's Human-AI 
              Interaction Guidelines, cognitive load theory, and explainable AI research. 
              Effective prompting is a skill that improves with practice—don't expect perfection 
              on first attempts.
            </ResearchNote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PromptEngineering;
