import { Lock, Shield, AlertTriangle, Database, Eye, FileCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { ResearchBadge } from "@/components/shared/ResearchBadge";
import { Button } from "@/components/ui/button";

const DataPrivacy = () => {
  return (
    <Layout>
      <PageHeader
        title="Data & Privacy"
        description="Protecting student information, understanding data collection practices, and navigating FERPA compliance in AI-integrated educational environments."
        icon={<Lock className="h-8 w-8 text-primary" />}
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
                    Legal & Ethical Imperative
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Student data privacy is both a legal requirement (FERPA, COPPA) and an ethical 
                    imperative. AI tools introduce specific privacy risks that educators must 
                    understand and actively mitigate.
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
                This section synthesizes guidance from leading data privacy frameworks:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <ResearchBadge label="FERPA" href="https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html" />
                <ResearchBadge label="COPPA" href="https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa" />
                <ResearchBadge label="NIST Privacy Framework" />
                <ResearchBadge label="Future of Privacy Forum" href="https://fpf.org/" />
              </div>
            </div>

            <div className="space-y-8">
              {/* What NOT to Enter */}
              <ContentCard
                title="What to Never Enter into AI Systems"
                citation="FERPA (20 U.S.C. § 1232g). NIST AI RMF (2023). U.S. Dept. of Education Privacy Guidance."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-destructive/10 p-3">
                    <Lock className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Most AI tools store and may train on user inputs. This means any information 
                      you enter could be retained, analyzed, or potentially exposed.
                    </p>
                    
                    <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4 mb-4">
                      <p className="font-medium text-destructive text-sm mb-2">
                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                        Do NOT enter into AI systems:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Student names, ID numbers, or any identifying information</li>
                        <li>• Specific disability or accommodation details</li>
                        <li>• IEP information or special education records</li>
                        <li>• Disciplinary records or behavioral notes</li>
                        <li>• Parent/guardian contact information</li>
                        <li>• Grades linked to identifiable students</li>
                        <li>• Medical or health information</li>
                        <li>• Immigration status or family legal situations</li>
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
                        <li>• Generic questions about pedagogy or subject matter</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* How AI Companies Use Data */}
              <ContentCard
                title="How AI Companies Handle Your Data"
                citation="Anthropic Privacy Policy (2024). Google AI Privacy Practices. Microsoft Copilot Data Handling."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Understanding what happens to your data helps inform appropriate use decisions.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="font-medium text-charcoal text-sm mb-2">Common Data Practices:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• <strong>Retention:</strong> Most services retain conversations for 30+ days</li>
                          <li>• <strong>Training:</strong> Unless opted out, data may improve AI models</li>
                          <li>• <strong>Human Review:</strong> Some conversations may be reviewed by staff</li>
                          <li>• <strong>Third Parties:</strong> Data may be shared with cloud providers</li>
                          <li>• <strong>Deletion:</strong> "Deleting" doesn't always mean permanent removal</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
                        <p className="font-medium text-amber-700 dark:text-amber-400 text-sm mb-2">Enterprise vs. Consumer Accounts:</p>
                        <p className="text-sm text-muted-foreground">
                          School-provided AI tools often have stricter data handling. If your district 
                          provides AI access, use those accounts rather than personal consumer versions 
                          for any work-related tasks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Student-Facing AI */}
              <ContentCard
                title="When Students Use AI Directly"
                citation="COPPA (15 U.S.C. §§ 6501-6506). Future of Privacy Forum (2023). 'Student Privacy in the Age of AI.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-purple-500/10 p-3">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      When students interact with AI tools, additional considerations apply—
                      especially for students under 13 (COPPA) or using school-directed tools.
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                        <p className="font-medium text-destructive text-sm mb-2">Risks to Consider:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Students may share personal information inadvertently</li>
                          <li>• AI may ask follow-up questions that elicit private data</li>
                          <li>• Usage patterns themselves can be revealing</li>
                          <li>• Students may not understand data permanence</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                        <p className="font-medium text-green-700 text-sm mb-2">Protective Measures:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Explicitly teach what not to share</li>
                          <li>• Use school-vetted tools with student protections</li>
                          <li>• Consider supervised rather than independent use</li>
                          <li>• Obtain appropriate consent for new tools</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 border-l-2 border-primary/50 pl-4">
                      <p className="font-medium text-charcoal text-sm mb-1">Age Considerations:</p>
                      <p className="text-sm text-muted-foreground">
                        Most consumer AI tools (Claude, Gemini, ChatGPT) have age 13+ terms of service. 
                        For younger students, only use tools specifically designed for educational use 
                        with appropriate compliance certifications.
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* FERPA Compliance */}
              <ContentCard
                title="FERPA Compliance Checklist"
                citation="U.S. Department of Education (2023). FERPA Guidance for AI in Education."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-teal-500/10 p-3">
                    <FileCheck className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Use this checklist when considering any AI tool that might interact with 
                      student information.
                    </p>
                    
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="font-medium text-charcoal text-sm mb-3">Before Using an AI Tool:</p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">□</span>
                          Is the tool approved by your district's IT/privacy office?
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">□</span>
                          Does the tool have a signed Data Privacy Agreement with the district?
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">□</span>
                          Does the vendor claim FERPA/COPPA compliance?
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">□</span>
                          Is data processing confined to the U.S. (if required by district)?
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">□</span>
                          Can you use the tool without entering any student PII?
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">□</span>
                          Is there a clear process for data deletion if needed?
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4">
                      <p className="font-medium text-blue-700 dark:text-blue-400 text-sm mb-2">When in Doubt:</p>
                      <p className="text-sm text-muted-foreground">
                        If you're unsure whether a use case is compliant, consult your school's 
                        administration or district privacy officer before proceeding. It's always 
                        safer to anonymize than to assume protection.
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Practical De-identification */}
              <ContentCard
                title="Practical De-identification Strategies"
                citation="NIST Privacy Framework (2023). 'De-identification Best Practices.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      When you need to discuss student scenarios with AI, here's how to do it safely:
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                        <p className="font-medium text-destructive text-sm mb-2">Instead of:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• "Maria Garcia in my 3rd period..."</li>
                          <li>• "Student ID #12345 has an IEP for..."</li>
                          <li>• "The Jones family is dealing with..."</li>
                        </ul>
                      </div>
                      
                      <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                        <p className="font-medium text-green-700 text-sm mb-2">Use:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• "A 10th grade student who..."</li>
                          <li>• "A student with reading support needs..."</li>
                          <li>• "A student whose family is experiencing..."</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 border-l-2 border-primary/50 pl-4">
                      <p className="font-medium text-charcoal text-sm mb-1">Best Practice:</p>
                      <p className="text-sm text-muted-foreground">
                        Before submitting any prompt about a student, ask yourself: "If someone 
                        at this company read this, could they identify the student?" If yes, 
                        generalize further.
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Regulatory Landscape:</strong> Data privacy regulations continue to evolve at 
              federal, state, and district levels. California's CCPA, state student privacy laws, 
              and proposed federal AI legislation may introduce new requirements. Stay updated 
              through your district's communications and professional organizations.
            </ResearchNote>

            {/* Community CTA */}
            <div className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
              <h3 className="mb-3 font-serif text-xl font-semibold text-charcoal">
                Questions About Privacy & AI?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Share concerns and learn from fellow TMAHS educators navigating these 
                challenges in our community discussion.
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
                <Link to="/ethics/environmental">
                  Environmental Considerations
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/classroom-resources">
                  Explore Classroom Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DataPrivacy;
