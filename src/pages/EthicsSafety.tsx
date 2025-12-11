import { Shield, AlertTriangle, Eye, Lock, Scale, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { Button } from "@/components/ui/button";

const EthicsSafety = () => {
  return (
    <Layout>
      <PageHeader
        title="Ethics & Safety"
        description="Responsible AI usage frameworks, privacy considerations, and bias awareness. Essential knowledge for thoughtful AI integration in educational contexts."
        icon={<Shield className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Critical Warning */}
            <div className="mb-12 rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-destructive/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-2">
                    Critical Transparency
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    AI systems have significant limitations and risks that deserve serious consideration. 
                    This section prioritizes transparency about uncertainty over promotional enthusiasm. 
                    Responsible use requires understanding both capabilities and constraints.
                  </p>
                </div>
              </div>
            </div>

            {/* Framework Sources */}
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-charcoal">
                Guiding Frameworks
              </h2>
              <p className="mb-6 text-muted-foreground">
                This section synthesizes guidance from leading responsible AI frameworks:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "NIST AI Risk Management Framework",
                  "OECD AI in Education Guidelines",
                  "Stanford HAI Principles",
                  "Partnership on AI Recommendations",
                ].map((framework) => (
                  <span 
                    key={framework}
                    className="rounded-full border border-primary/20 bg-background px-4 py-2 text-sm text-muted-foreground"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-8">
              {/* Privacy */}
              <ContentCard
                title="Privacy Considerations"
                citation="NIST AI RMF (2023); FERPA Guidelines for Educational Technology."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Student data privacy is both a legal requirement (FERPA) and an ethical 
                      imperative. AI tools introduce specific privacy considerations that 
                      educators must understand.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                        <p className="font-medium text-destructive text-sm mb-2">Do NOT enter into AI systems:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Student names, ID numbers, or identifying information</li>
                          <li>• Specific disability or accommodation details</li>
                          <li>• Disciplinary records or behavioral notes</li>
                          <li>• Parent/guardian contact information</li>
                          <li>• Any data covered by FERPA without explicit consent</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                        <p className="font-medium text-green-700 text-sm mb-2">Generally acceptable to use:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Anonymized or fictional student scenarios</li>
                          <li>• General descriptions (e.g., "a 10th grader struggling with...")</li>
                          <li>• Curriculum content and educational standards</li>
                          <li>• Your own teaching materials and lesson plans</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Hallucinations & Accuracy */}
              <ContentCard
                title="Hallucinations & Accuracy Limits"
                citation="Ji, Z. et al. (2023). Survey of Hallucination in NLG. NIST AI RMF Playbook."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      All current large language models can and do generate false information that 
                      sounds authoritative. This is not a bug that will be fixed—it's inherent 
                      to how these systems work.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">High-risk areas for hallucination:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Specific facts, dates, statistics, and citations</li>
                          <li>• Claims about real people, especially less famous individuals</li>
                          <li>• Recent events (AI training data has cutoff dates)</li>
                          <li>• Technical or scientific details outside common knowledge</li>
                          <li>• Legal, medical, or safety-critical information</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-primary/50 pl-4">
                        <p className="font-medium text-charcoal text-sm mb-1">Mitigation Strategy:</p>
                        <p className="text-sm text-muted-foreground">
                          Treat AI output as a first draft that requires verification, not as 
                          authoritative information. Cross-reference any factual claims with 
                          reliable sources before sharing with students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Bias */}
              <ContentCard
                title="Bias Awareness & Mitigation"
                citation="OECD (2021). AI and Education. Stanford HAI (2023). Human-Centered AI Principles."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      AI systems reflect biases present in their training data and design choices. 
                      These biases can perpetuate stereotypes and produce culturally insensitive 
                      or exclusionary content.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">Common bias patterns in educational AI:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Default assumptions about student backgrounds and family structures</li>
                          <li>• Western-centric historical and cultural perspectives</li>
                          <li>• Gendered language and professional stereotypes</li>
                          <li>• Limited representation of diverse epistemologies</li>
                          <li>• Accessibility assumptions about technology access</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-primary/50 pl-4">
                        <p className="font-medium text-charcoal text-sm mb-1">Teacher Role:</p>
                        <p className="text-sm text-muted-foreground">
                          Review AI-generated content through a critical lens before classroom use. 
                          Ask: Whose perspectives are represented? Whose are missing? Does this 
                          reflect my students' diverse experiences and identities?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Appropriate Use */}
              <ContentCard
                title="Appropriate Use in School Contexts"
                citation="Partnership on AI (2023). Responsible AI in Education."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Different uses of AI carry different levels of risk and require different 
                      levels of human oversight.
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                        <p className="font-medium text-green-700 text-sm mb-2">Generally Lower Risk:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Brainstorming and ideation support</li>
                          <li>• Drafting materials teacher will edit</li>
                          <li>• Creating practice problems</li>
                          <li>• Generating diverse example scenarios</li>
                          <li>• Administrative task assistance</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                        <p className="font-medium text-destructive text-sm mb-2">Higher Risk / More Caution:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Grading or assessment decisions</li>
                          <li>• Student-facing AI interactions</li>
                          <li>• Content on sensitive/controversial topics</li>
                          <li>• Anything affecting student records</li>
                          <li>• Replacing human relationship/support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Transparency with Students */}
              <ContentCard
                title="Transparency with Students"
                citation="ISTE Standards for Students (2016). Stanford HAI (2023)."
              >
                <p className="mb-4">
                  When AI is used in educational contexts, students deserve to know. Transparency 
                  models digital citizenship and supports AI literacy development.
                </p>
                
                <div className="space-y-4">
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="font-medium text-charcoal text-sm mb-2">Consider discussing with students:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• When and how AI was used in creating materials</li>
                      <li>• Why human review of AI output matters</li>
                      <li>• How to evaluate AI-generated content critically</li>
                      <li>• Appropriate vs. inappropriate uses for their own work</li>
                      <li>• The importance of developing skills AI cannot replace</li>
                    </ul>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Living Document:</strong> Responsible AI guidance continues to evolve as technology 
              and understanding develop. These recommendations reflect current best practices but should 
              be revisited regularly. When in doubt, prioritize student welfare and err on the side of 
              caution.
            </ResearchNote>

            {/* Community Discussion CTA */}
            <div className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
              <h3 className="mb-3 font-serif text-xl font-semibold text-charcoal">
                Join the Conversation
              </h3>
              <p className="mb-6 text-muted-foreground">
                Have questions, concerns, or exciting discoveries about AI in education? 
                Share with your fellow TMAHS educators in our community discussion.
              </p>
              <Button asChild variant="phoenix" size="lg">
                <Link to="/community">
                  Visit Community Discussion
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline">
                <Link to="/classroom-resources">
                  Explore Classroom Resources
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/what-is-ai">
                  Review AI Basics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EthicsSafety;
