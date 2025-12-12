import { Users, Brain, Briefcase, Scale, Heart, TrendingDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { Button } from "@/components/ui/button";

const SocialImplications = () => {
  return (
    <Layout>
      <PageHeader
        title="Social Implications"
        description="Examining how AI affects mental health, employment, equity, and human connection—critical considerations for preparing students for an AI-integrated world."
        icon={<Users className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Framework Note */}
            <div className="mb-12 text-center">
              <p className="text-muted-foreground">
                Drawing from research in psychology, economics, and sociology to understand 
                AI's broader societal effects.
              </p>
            </div>

            <div className="space-y-8">
              {/* Mental Health */}
              <ContentCard
                title="Mental Health Considerations"
                citation="Pang et al. (2024). 'Mental health implications of AI adoption.' Nature Humanities & Social Sciences Communications. APA (2023). 'Technology and Mental Health.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-rose-500/10 p-3">
                    <Brain className="h-6 w-6 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Research shows complex relationships between AI adoption and mental wellbeing. 
                      Understanding these dynamics helps educators support students navigating an 
                      AI-saturated world.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 p-4">
                        <p className="font-medium text-rose-700 dark:text-rose-400 text-sm mb-2">Anxiety & Uncertainty:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Fear of AI replacing human capabilities can create chronic stress</li>
                          <li>• Students may feel pressure to "compete" with AI tools</li>
                          <li>• Uncertainty about future career paths can heighten anxiety</li>
                          <li>• Research shows self-efficacy mediates these effects—building confidence helps</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4">
                        <p className="font-medium text-blue-700 dark:text-blue-400 text-sm mb-2">Over-reliance Risks:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Using AI for emotional support may reduce genuine human connection</li>
                          <li>• Dependency on AI for decision-making can erode personal agency</li>
                          <li>• Constant availability of AI "companions" may mask loneliness</li>
                        </ul>
                      </div>

                      <div className="border-l-2 border-primary/50 pl-4">
                        <p className="font-medium text-charcoal text-sm mb-1">For Educators:</p>
                        <p className="text-sm text-muted-foreground">
                          Open conversations about these feelings normalize the experience. Emphasizing 
                          uniquely human skills—creativity, empathy, complex reasoning—builds confidence 
                          that AI enhances rather than replaces human value.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Social Isolation */}
              <ContentCard
                title="Social Isolation & Connection"
                citation="Turkle, S. (2017). 'Alone Together.' MIT. Twenge, J. (2024). 'Generations.' Free Press."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-purple-500/10 p-3">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      As AI becomes more conversational and "human-like," researchers increasingly 
                      study its effects on genuine human relationships and social skills development.
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">Concerns:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• AI "friends" may substitute for real relationships</li>
                          <li>• Reduced practice with human social nuances</li>
                          <li>• Preference for AI's "always available" nature</li>
                          <li>• Diminished tolerance for human imperfection</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">Opportunities:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• AI can help socially anxious individuals practice</li>
                          <li>• Assistive AI supports those with communication differences</li>
                          <li>• Human time freed up for deeper connections</li>
                          <li>• Collaborative work with AI can be social</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Classroom Implication:</strong> Intentionally design activities that 
                        require genuine human collaboration—AI can support but not replace peer 
                        discussion, debate, and cooperative problem-solving.
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Unemployment & Economic Disruption */}
              <ContentCard
                title="Employment & Economic Disruption"
                citation="World Economic Forum (2023). 'Future of Jobs Report.' McKinsey Global Institute (2024). 'AI and the Future of Work.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-amber-500/10 p-3">
                    <Briefcase className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      AI will transform the job market in ways we're only beginning to understand. 
                      Educators play a crucial role in preparing students for this shifting landscape.
                    </p>
                    
                    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 mb-4">
                      <p className="font-medium text-amber-700 dark:text-amber-400 text-sm mb-2">What Research Suggests:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>300 million</strong> jobs globally may be affected by AI automation (Goldman Sachs)</li>
                        <li>• Most jobs will be <em>transformed</em>, not eliminated outright</li>
                        <li>• New job categories will emerge that don't exist today</li>
                        <li>• Transition periods can be economically and psychologically challenging</li>
                      </ul>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="h-4 w-4 text-destructive" />
                          <p className="font-medium text-destructive text-sm">Higher Automation Risk:</p>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Routine data processing</li>
                          <li>• Basic content creation</li>
                          <li>• Repetitive analysis tasks</li>
                          <li>• Standard customer service</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                        <p className="font-medium text-green-700 text-sm mb-2">More Resilient:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Complex problem-solving</li>
                          <li>• Emotional intelligence roles</li>
                          <li>• Creative & strategic work</li>
                          <li>• Human care & connection</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 border-l-2 border-primary/50 pl-4">
                      <p className="font-medium text-charcoal text-sm mb-1">Educator Responsibility:</p>
                      <p className="text-sm text-muted-foreground">
                        Emphasize adaptability, continuous learning, and skills that complement AI. 
                        Avoid both unfounded optimism ("AI will create more jobs than it destroys") 
                        and paralyzing doom ("There won't be any jobs left").
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Equity & Access */}
              <ContentCard
                title="Equity & Digital Divides"
                citation="OECD (2023). 'AI and Inclusive Growth.' UNESCO (2024). 'AI in Education: Equity Considerations.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-teal-500/10 p-3">
                    <Scale className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      AI has the potential to either narrow or widen existing inequalities. 
                      The outcome depends on intentional choices about access, design, and deployment.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                        <p className="font-medium text-destructive text-sm mb-2">Equity Concerns:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Premium AI tools often require paid subscriptions</li>
                          <li>• AI training data may underrepresent marginalized communities</li>
                          <li>• AI literacy gaps may compound existing educational disparities</li>
                          <li>• Bias in AI can perpetuate discrimination in hiring, lending, and more</li>
                          <li>• Communities with less infrastructure may fall further behind</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                        <p className="font-medium text-green-700 text-sm mb-2">Equity Opportunities:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• AI can provide personalized learning at scale</li>
                          <li>• Translation tools break down language barriers</li>
                          <li>• Accessibility features support diverse learners</li>
                          <li>• Free AI tools democratize access to information</li>
                          <li>• Rural areas can access expertise previously unavailable</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 p-4">
                        <p className="text-sm text-muted-foreground">
                          <strong>For TMAHS Context:</strong> Consider which students have home access 
                          to AI tools, ensure classroom AI use doesn't disadvantage students without 
                          personal devices, and explicitly teach critical evaluation skills that level 
                          the playing field regardless of access to premium tools.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Bias & Discrimination */}
              <ContentCard
                title="Bias & Algorithmic Discrimination"
                citation="Buolamwini, J. & Gebru, T. (2018). 'Gender Shades.' MIT. Noble, S. (2018). 'Algorithms of Oppression.' NYU Press."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      AI systems learn from historical data, which often contains embedded biases. 
                      These biases can be amplified and systematized in ways that harm already 
                      marginalized groups.
                    </p>
                    
                    <div className="rounded-lg bg-secondary p-4 mb-4">
                      <p className="font-medium text-charcoal text-sm mb-2">Documented bias patterns:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Facial recognition performing worse on darker skin tones</li>
                        <li>• Language models reflecting gender and racial stereotypes</li>
                        <li>• Hiring algorithms disadvantaging women and minorities</li>
                        <li>• Medical AI trained primarily on data from white populations</li>
                        <li>• Content moderation disproportionately flagging certain dialects</li>
                      </ul>
                    </div>

                    <div className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium text-charcoal text-sm mb-1">Teacher Role:</p>
                      <p className="text-sm text-muted-foreground">
                        Review AI-generated content through a critical lens. Ask: Whose perspectives 
                        are represented? Whose are missing? Use bias awareness as a teaching opportunity—
                        students can learn to critically evaluate AI output the same way they evaluate 
                        any source.
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Ongoing Research:</strong> Social implications of AI are actively studied across 
              psychology, sociology, economics, and policy fields. These considerations should evolve 
              with emerging evidence. Encourage students to engage with these questions—they will 
              shape AI's trajectory.
            </ResearchNote>

            {/* Navigation */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline">
                <Link to="/ethics/plagiarism">
                  Academic Integrity & AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/ethics/data-privacy">
                  Data & Privacy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SocialImplications;
