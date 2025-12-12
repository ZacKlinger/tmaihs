import { FileWarning, Eye, BookOpen, Search, Shield, Lightbulb, AlertTriangle, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { Button } from "@/components/ui/button";

const Plagiarism = () => {
  return (
    <Layout>
      <PageHeader
        title="Academic Integrity & AI"
        description="Navigating plagiarism, appropriate use, AI detection, and intellectual property in the age of generative AI—with practical frameworks for classroom implementation."
        icon={<FileWarning className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Core Principle */}
            <div className="mb-12 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-2">
                    The Fundamental Principle
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Students take ownership of their work.</strong> Work submitted must be their own. 
                    What "their own" means varies by context—sometimes AI-assisted work is perfectly 
                    appropriate; other times it undermines the learning purpose entirely. The key is 
                    <strong> explicit expectations and rigid guidelines</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Context Matters */}
              <ContentCard
                title="Context Determines Appropriateness"
                citation="ISTE (2023). 'AI in Education Guidance.' Stanford HAI (2024). 'Teaching in the Age of AI.'"
              >
                <p className="mb-4">
                  The same AI use that's perfectly acceptable in one assignment could be academic 
                  dishonesty in another. The difference lies in what skill is being developed.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                  <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                    <p className="font-medium text-green-700 text-sm mb-2">Often Appropriate:</p>
                    <p className="text-xs text-muted-foreground mb-2 italic">When the skill being developed isn't writing itself</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Using AI to brainstorm ideas for a science project</li>
                      <li>• Having AI help format a bibliography</li>
                      <li>• Getting AI feedback on a rough draft</li>
                      <li>• Using AI to explain a concept you then summarize yourself</li>
                      <li>• Creating visual aids with AI for a presentation</li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                    <p className="font-medium text-destructive text-sm mb-2">Often Problematic:</p>
                    <p className="text-xs text-muted-foreground mb-2 italic">When writing development is the learning goal</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Having AI write an essay meant to develop writing skills</li>
                      <li>• Submitting AI-generated analysis as original thought</li>
                      <li>• Using AI to complete reading comprehension exercises</li>
                      <li>• Having AI solve math problems meant to build skills</li>
                      <li>• Copying AI text without disclosure when originality is required</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
                  <p className="font-medium text-amber-700 dark:text-amber-400 text-sm mb-2">
                    <AlertTriangle className="inline h-4 w-4 mr-1" />
                    The Critical Insight:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Unless you explicitly state what is and isn't allowed, students will 
                    capitalize on the opportunity to use AI.</strong> This isn't malice—it's human 
                    nature to use available tools. Clear, assignment-specific guidelines are essential.
                  </p>
                </div>
              </ContentCard>

              {/* Rigid Expectations */}
              <ContentCard
                title="Setting Clear Expectations"
                citation="Eaton, S. (2023). 'Academic Integrity in the Age of AI.' University of Calgary."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Vague policies create confusion and inconsistent enforcement. Each assignment 
                      should clearly specify AI expectations.
                    </p>
                    
                    <div className="rounded-lg bg-secondary p-4 mb-4">
                      <p className="font-medium text-charcoal text-sm mb-3">Template for Assignment Instructions:</p>
                      <div className="bg-background rounded-lg p-4 border border-border">
                        <p className="text-sm font-medium text-charcoal mb-2">AI Use Policy for This Assignment:</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>✅ <strong>Allowed:</strong> [e.g., "Using AI to brainstorm initial ideas, check grammar after you've written your draft"]</li>
                          <li>❌ <strong>Not Allowed:</strong> [e.g., "Having AI generate any portion of your final text, using AI to answer analysis questions"]</li>
                          <li>📝 <strong>Required Disclosure:</strong> [e.g., "If you use AI at any point, note how at the end of your submission"]</li>
                          <li>🎯 <strong>Why:</strong> [e.g., "This assignment develops your analytical writing skills, which requires practice with your own thinking"]</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium text-charcoal text-sm mb-1">The "Why" Matters:</p>
                      <p className="text-sm text-muted-foreground">
                        Students are more likely to follow guidelines when they understand the learning 
                        purpose. "No AI because I said so" is less effective than "This essay develops 
                        your argument-construction skills, which only improves through practice."
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* AI Detection Software */}
              <ContentCard
                title="AI Detection: Limitations & Realities"
                citation="Sadasivan et al. (2024). 'Can AI-Generated Text be Reliably Detected?' arXiv. Weber-Wulff et al. (2023). 'Testing of Detection Tools for AI-Generated Text.' IJEI."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-amber-500/10 p-3">
                    <Search className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/30 p-4">
                      <p className="font-medium text-destructive text-sm mb-2">
                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                        Critical Warning
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>AI detection software is not reliable enough to serve as sole evidence 
                        of academic dishonesty.</strong> Research shows false positive rates that make 
                        these tools unsuitable for definitive judgments.
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">What Research Shows:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• False positive rates can exceed 20%</li>
                          <li>• Non-native English speakers flagged more often</li>
                          <li>• Detection accuracy drops with paraphrasing</li>
                          <li>• Tools disagree with each other frequently</li>
                          <li>• Simple editing defeats most detection</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">Human Indicators to Watch:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Unusually rhythmic sentence/paragraph length</li>
                          <li>• Vocabulary inconsistent with student's level</li>
                          <li>• Atypical writing conventions (em dashes, semicolons)</li>
                          <li>• Perfect grammar from a usually imperfect writer</li>
                          <li>• Generic content lacking personal voice</li>
                        </ul>
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4">
                      <p className="font-medium text-blue-700 dark:text-blue-400 text-sm mb-2">
                        If You Want to Try Detection:
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>GPTZero</strong> is among the more researched options, though it still 
                        has significant limitations. Use it as one data point among many, never as 
                        definitive proof.
                      </p>
                      <a 
                        href="https://gptzero.me" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        Visit GPTZero
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Transparency with Students */}
              <ContentCard
                title="Transparency with Students"
                citation="ISTE Standards for Students (2016). Stanford HAI (2023). 'Human-Centered AI Principles.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-teal-500/10 p-3">
                    <Eye className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      When AI is used in educational contexts, students deserve to know. 
                      Transparency models digital citizenship and supports AI literacy development.
                    </p>
                    
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
                </div>
              </ContentCard>

              {/* Hallucinations */}
              <ContentCard
                title="Hallucinations & Accuracy"
                citation="Ji, Z. et al. (2023). 'Survey of Hallucination in NLG.' NIST AI RMF Playbook."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Lightbulb className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      All current large language models can and do generate false information that 
                      sounds authoritative. This is not a bug that will be fixed—it's inherent 
                      to how these systems work.
                    </p>
                    
                    <div className="rounded-lg bg-secondary p-4 mb-4">
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
                        Treat AI output as a first draft that requires verification. 
                        Cross-reference any factual claims with reliable sources. Teach students 
                        the same critical approach—AI can start research, but can't replace it.
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Intellectual Property */}
              <ContentCard
                title="Intellectual Property Considerations"
                citation="U.S. Copyright Office (2023). 'Copyright Registration Guidance.' Harvard Law Review (2024). 'AI and IP Law.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-slate-500/10 p-3">
                    <Shield className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      The legal landscape around AI-generated content is rapidly evolving. 
                      Key considerations for educational contexts:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">Current Understanding:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Purely AI-generated content cannot be copyrighted (U.S. Copyright Office)</li>
                          <li>• Human-AI collaborative works have uncertain status</li>
                          <li>• AI training on copyrighted material is subject to ongoing litigation</li>
                          <li>• School policies may differ from legal requirements</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4">
                        <p className="font-medium text-blue-700 dark:text-blue-400 text-sm mb-2">Practical Guidance:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Treat AI output as you would any unowned material—cite your use</li>
                          <li>• Keep records of prompts used and AI involvement</li>
                          <li>• For published student work, ensure proper disclosure</li>
                          <li>• When in doubt, consult school administration on policy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Rapidly Evolving Field:</strong> Academic integrity policies, legal frameworks, 
              and detection technologies are changing quickly. These guidelines reflect current best 
              practices as of late 2024. Check for updates from your district and professional 
              organizations regularly.
            </ResearchNote>

            {/* Navigation */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline">
                <Link to="/ethics/data-privacy">
                  Data & Privacy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/community">
                  Join Community Discussion
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Plagiarism;
