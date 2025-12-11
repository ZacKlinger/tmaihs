import { Brain, AlertTriangle, Cpu, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";

const WhatIsAI = () => {
  return (
    <Layout>
      <PageHeader
        title="What Is AI?"
        description="Accurate, research-aligned explanations of artificial intelligence, machine learning, and large language models—including their capabilities and limitations."
        icon={<Brain className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Introduction */}
            <div className="mb-12 text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Understanding what AI can and cannot do is foundational to using it effectively in educational contexts. 
                This section provides clear, jargon-free explanations grounded in computer science research.
              </p>
            </div>

            {/* Core Concepts Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              <ContentCard
                title="What Is Machine Learning?"
                citation="Russell, S. & Norvig, P. (2021). Artificial Intelligence: A Modern Approach, 4th Edition."
              >
                <p className="mb-4">
                  Machine learning is a subset of AI where systems learn patterns from data rather than 
                  following explicit programming rules. Instead of being told exactly what to do, 
                  these systems identify statistical relationships in large datasets.
                </p>
                <p>
                  <strong>Key insight:</strong> ML systems excel at pattern recognition but lack true 
                  understanding. They identify correlations, not causation.
                </p>
              </ContentCard>

              <ContentCard
                title="What Are Large Language Models?"
                citation="Brown, T. et al. (2020). Language Models are Few-Shot Learners. NeurIPS."
              >
                <p className="mb-4">
                  Large Language Models (LLMs) like GPT are trained on vast amounts of text to predict 
                  what words come next in a sequence. They generate human-like text by recognizing 
                  and reproducing patterns from their training data.
                </p>
                <p>
                  <strong>Key insight:</strong> LLMs don't "know" facts—they generate probable text based 
                  on patterns. This is why they can produce plausible-sounding but incorrect information.
                </p>
              </ContentCard>

              <ContentCard
                title="Understanding Hallucinations"
                citation="Ji, Z. et al. (2023). Survey of Hallucination in Natural Language Generation. ACM Computing Surveys."
                className="md:col-span-2"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-destructive/10 p-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="mb-4">
                      "Hallucination" refers to AI-generated content that sounds authoritative but is factually 
                      incorrect, fabricated, or inconsistent with reality. This occurs because LLMs optimize 
                      for generating probable text, not truthful text.
                    </p>
                    <p className="mb-4">
                      <strong>Common hallucination patterns include:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fabricated citations and research studies</li>
                      <li>Incorrect dates, statistics, or historical facts</li>
                      <li>Made-up biographical information about real people</li>
                      <li>Logical contradictions within the same response</li>
                    </ul>
                  </div>
                </div>
              </ContentCard>

              <ContentCard
                title="What AI Cannot Do"
                citation="Marcus, G. & Davis, E. (2019). Rebooting AI: Building Artificial Intelligence We Can Trust."
              >
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Understand context the way humans do</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Access real-time information unless specifically designed to</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Verify the truth of its own outputs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Reason causally or apply common sense reliably</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Replace human judgment in complex decisions</span>
                  </li>
                </ul>
              </ContentCard>

              <ContentCard
                title="Types of AI Systems"
                citation="NASEM (2023). Artificial Intelligence in Science. National Academies Press."
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Cpu className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-charcoal">Generative AI</strong>
                      <p className="text-sm">Creates new content (text, images, code) based on patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-charcoal">Conversational AI</strong>
                      <p className="text-sm">Engages in dialogue (chatbots, virtual assistants)</p>
                    </div>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Research Foundation:</strong> These explanations draw from Russell & Norvig's foundational 
              AI textbook, recent surveys on LLM capabilities from ACL and NeurIPS, and the National Academies' 
              2023 consensus report on AI in science. Understanding these fundamentals helps educators set 
              appropriate expectations when integrating AI tools.
            </ResearchNote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatIsAI;
