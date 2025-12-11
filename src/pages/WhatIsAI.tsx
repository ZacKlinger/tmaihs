import { Brain, AlertTriangle, Cpu, MessageCircle, Zap, Search, Image } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";

const WhatIsAI = () => {
  return (
    <Layout>
      <PageHeader
        title="What Is AI?"
        description="Clear, jargon-free explanations of AI technology—what it can do, what it can't, and how it actually works."
        icon={<Brain className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Quick Summary */}
            <div className="mb-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
              <h2 className="mb-4 font-serif text-xl font-semibold text-charcoal text-center">
                The 30-Second Version
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
                AI tools like ChatGPT are <strong>pattern-matching systems</strong>—they've analyzed billions of 
                texts to predict what words come next. They're incredibly useful for generating drafts and ideas, 
                but they don't truly "understand" content and can confidently produce incorrect information.
              </p>
            </div>

            {/* Visual Concept Cards */}
            <div className="mb-12">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                How AI Actually Works
              </h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">Step 1: Training</h3>
                  <p className="text-sm text-muted-foreground">
                    AI reads billions of texts—books, websites, articles—and learns patterns about 
                    how words relate to each other.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <Zap className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">Step 2: Prediction</h3>
                  <p className="text-sm text-muted-foreground">
                    When you ask a question, AI predicts the most likely next words based on 
                    patterns it learned—one word at a time.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <MessageCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">Step 3: Output</h3>
                  <p className="text-sm text-muted-foreground">
                    The result sounds human because it follows human language patterns—but there's 
                    no actual comprehension happening.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="mb-12">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal text-center">
                Key Concepts to Understand
              </h2>
              
              <div className="space-y-6">
                <ContentCard
                  title="Large Language Models (LLMs)"
                  citation="Brown, T. et al. (2020). Language Models are Few-Shot Learners. NeurIPS."
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <p className="mb-3">
                        ChatGPT, Claude, and similar tools are called "Large Language Models" because they:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span><strong>Large:</strong> Trained on massive amounts of text data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span><strong>Language:</strong> Focused on understanding and generating text</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span><strong>Model:</strong> A mathematical system that finds patterns</span>
                        </li>
                      </ul>
                    </div>
                    <div className="md:w-48 rounded-lg bg-secondary/50 p-4">
                      <p className="text-xs font-medium text-charcoal mb-2">Think of it like:</p>
                      <p className="text-sm text-muted-foreground italic">
                        The world's most sophisticated autocomplete—predicting text based on everything 
                        it's ever read.
                      </p>
                    </div>
                  </div>
                </ContentCard>

                <ContentCard
                  title="Hallucinations: When AI Gets It Wrong"
                  citation="Ji, Z. et al. (2023). Survey of Hallucination in Natural Language Generation. ACM."
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-destructive/10 p-3 flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="mb-3">
                        AI can confidently generate incorrect information—a phenomenon called "hallucination." 
                        This happens because AI optimizes for <em>plausible-sounding</em> text, not truthful text.
                      </p>
                      <div className="rounded-lg bg-destructive/5 p-4">
                        <p className="text-sm font-medium text-charcoal mb-2">Common examples:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Making up citations to research papers that don't exist</li>
                          <li>• Stating incorrect dates, statistics, or historical facts</li>
                          <li>• Inventing biographical details about real people</li>
                          <li>• Contradicting itself within the same response</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </ContentCard>

                <ContentCard
                  title="Types of AI You'll Encounter"
                  citation="NASEM (2023). Artificial Intelligence in Science. National Academies Press."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium text-charcoal">Text AI (ChatGPT, Claude)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Generates and analyzes written content—lesson plans, feedback, explanations
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Image className="h-5 w-5 text-primary" />
                        <span className="font-medium text-charcoal">Image AI (DALL-E, Midjourney)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Creates images from text descriptions—illustrations, diagrams, visual aids
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu className="h-5 w-5 text-primary" />
                        <span className="font-medium text-charcoal">Specialized AI (Khanmigo)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Built for specific tasks with guardrails—educational tools with safety features
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="font-medium text-charcoal">Custom AI (Playlab)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        AI you can train on your own documents and customize for specific purposes
                      </p>
                    </div>
                  </div>
                </ContentCard>
              </div>
            </div>

            {/* What AI Cannot Do */}
            <div className="mb-12">
              <ContentCard
                title="What AI Cannot Do"
                citation="Marcus, G. & Davis, E. (2019). Rebooting AI: Building Artificial Intelligence We Can Trust."
              >
                <p className="mb-4">
                  Understanding AI's limitations is just as important as knowing its capabilities:
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-2 rounded-lg bg-destructive/5 p-3">
                    <span className="mt-0.5 text-destructive">✗</span>
                    <span className="text-sm">Truly understand meaning or context</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-destructive/5 p-3">
                    <span className="mt-0.5 text-destructive">✗</span>
                    <span className="text-sm">Verify whether its outputs are accurate</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-destructive/5 p-3">
                    <span className="mt-0.5 text-destructive">✗</span>
                    <span className="text-sm">Access real-time or current information</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-destructive/5 p-3">
                    <span className="mt-0.5 text-destructive">✗</span>
                    <span className="text-sm">Apply common sense reasoning reliably</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-destructive/5 p-3">
                    <span className="mt-0.5 text-destructive">✗</span>
                    <span className="text-sm">Replace human judgment in important decisions</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-destructive/5 p-3">
                    <span className="mt-0.5 text-destructive">✗</span>
                    <span className="text-sm">Build genuine relationships with students</span>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Research Foundation:</strong> These explanations are adapted from Russell & Norvig's 
              foundational AI textbook, recent NeurIPS and ACL research on language models, and the National 
              Academies' 2023 consensus report. Understanding these fundamentals helps set realistic 
              expectations when using AI tools.
            </ResearchNote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatIsAI;