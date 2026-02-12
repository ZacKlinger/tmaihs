import { Leaf, Droplets, Zap, Factory, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { Button } from "@/components/ui/button";

const EnvironmentalConsiderations = () => {
  return (
    <Layout>
      <PageHeader
        title="Environmental Considerations"
        description="Understanding the environmental footprint of AI systems—from water consumption to energy use—and making informed decisions about when AI's benefits outweigh its costs."
        icon={<Leaf className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            {/* Key Insight */}
            <div className="mb-12 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-2">
                    The Hidden Cost of Convenience
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Every AI query has a physical footprint. Understanding these costs doesn't mean 
                    avoiding AI entirely—it means using it thoughtfully, the same way we consider 
                    any resource consumption.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Water Consumption */}
              <ContentCard
                title="Water Consumption"
                citation="Pengfei Li et al. (2023). 'Making AI Less Thirsty.' arXiv. University of California, Riverside."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <Droplets className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-6">
                      AI data centers require massive cooling systems that consume significant amounts 
                      of water. This consumption happens at two levels: <strong>training</strong> (building 
                      the AI model) and <strong>inference</strong> (every time you ask it a question).
                    </p>
                    
                    {/* Visual Comparison */}
                    <div className="mb-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-6 border border-blue-200 dark:border-blue-800">
                      <h4 className="font-serif text-lg font-semibold text-charcoal mb-4 text-center">
                        Putting It In Perspective
                      </h4>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-3xl mb-2">🌾</div>
                          <p className="font-medium text-charcoal text-sm">Training GPT-3</p>
                          <p className="text-2xl font-bold text-blue-600 my-2">~700,000 liters</p>
                          <p className="text-xs text-muted-foreground">
                            Enough to irrigate about <strong>1 acre of farmland</strong> for a growing season
                          </p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-4 text-center">
                          <div className="text-3xl mb-2">💧</div>
                          <p className="font-medium text-charcoal text-sm">Per Query (GPT-4)</p>
                          <p className="text-2xl font-bold text-blue-600 my-2">~5-50 mL</p>
                          <p className="text-xs text-muted-foreground">
                            About <strong>1-10 teaspoons</strong> of water per response
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-background/70 rounded-lg p-4">
                        <p className="text-sm text-center text-muted-foreground">
                          <strong>The Farmland Analogy:</strong> The water used to train major AI models 
                          like GPT-4 and similar systems collectively approaches what would irrigate 
                          <strong> hundreds of acres of farmland</strong>—comparable to a small farm 
                          operation's annual water needs.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-secondary p-4">
                      <p className="font-medium text-charcoal text-sm mb-2">What this means for educators:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Consider batching questions rather than sending many small queries</li>
                        <li>• Use AI when it genuinely adds value, not just for convenience</li>
                        <li>• Discuss environmental tradeoffs as part of AI literacy with students</li>
                        <li>• Location matters: data centers in cooler climates use less water for cooling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Energy Consumption */}
              <ContentCard
                title="Energy & Carbon Footprint"
                citation="Patterson et al. (2021). 'Carbon Emissions and Large Neural Network Training.' Google Research. Strubell et al. (2019). 'Energy and Policy Considerations for Deep Learning in NLP.'"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-amber-500/10 p-3">
                    <Zap className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      Training a large language model can consume as much electricity as <strong>100 
                      US homes use in a year</strong>. While individual queries are small, the 
                      cumulative impact of billions of daily queries is significant.
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-3 mb-4">
                      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-center">
                        <p className="text-sm text-muted-foreground">A Google search</p>
                        <p className="text-lg font-bold text-amber-600">~0.3 Wh</p>
                      </div>
                      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-center">
                        <p className="text-sm text-muted-foreground">A Claude query</p>
                        <p className="text-lg font-bold text-amber-600">~2.9 Wh</p>
                      </div>
                      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-center">
                        <p className="text-sm text-muted-foreground">Ratio</p>
                        <p className="text-lg font-bold text-amber-600">~10x more</p>
                      </div>
                    </div>

                    <div className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium text-charcoal text-sm mb-1">The Silver Lining:</p>
                      <p className="text-sm text-muted-foreground">
                        Major AI companies are increasingly powering data centers with renewable energy. 
                        Microsoft, Google, and others have committed to carbon-neutral or carbon-negative 
                        operations—but the transition is ongoing and varies by location.
                      </p>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* E-Waste & Hardware */}
              <ContentCard
                title="Hardware & E-Waste"
                citation="Gupta et al. (2022). 'Chasing Carbon: The Elusive Environmental Footprint of Computing.' IEEE."
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-slate-500/10 p-3">
                    <Factory className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">
                      The AI boom has created unprecedented demand for specialized chips (GPUs, TPUs). 
                      Manufacturing these requires rare earth minerals, and rapid hardware refresh 
                      cycles create growing e-waste concerns.
                    </p>
                    
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="font-medium text-charcoal text-sm mb-2">Often overlooked impacts:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Mining for rare earth minerals often involves significant environmental disruption</li>
                        <li>• GPU manufacturing has its own water and energy footprint</li>
                        <li>• Rapid model improvements drive hardware obsolescence</li>
                        <li>• E-waste from data centers is a growing challenge</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ContentCard>

              {/* Balanced Perspective */}
              <ContentCard
                title="A Balanced Perspective"
                citation="Kaack et al. (2022). 'Aligning artificial intelligence with climate change mitigation.' Nature Climate Change."
              >
                <p className="mb-4">
                  Environmental impact should inform, not paralyze, our decisions about AI use. 
                  Consider these nuances:
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                    <p className="font-medium text-green-700 text-sm mb-2">AI can help the environment:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Optimizing energy grids and reducing waste</li>
                      <li>• Accelerating climate research</li>
                      <li>• Monitoring deforestation and wildlife</li>
                      <li>• Improving agricultural efficiency</li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
                    <p className="font-medium text-amber-700 text-sm mb-2">Questions to ask yourself:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Does this task genuinely benefit from AI?</li>
                      <li>• Could a simpler tool accomplish the same goal?</li>
                      <li>• Am I using AI out of habit or necessity?</li>
                      <li>• How can I batch requests for efficiency?</li>
                    </ul>
                  </div>
                </div>
              </ContentCard>
            </div>

            <ResearchNote>
              <strong>Evolving Data:</strong> Environmental impact figures vary widely based on data 
              center location, cooling methods, and energy sources. These estimates represent current 
              research but will change as infrastructure improves. The principle remains: thoughtful 
              use respects both educational goals and environmental responsibility.
            </ResearchNote>

            {/* Navigation */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline">
                <Link to="/ethics/social-implications">
                  Explore Social Implications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/ethics/plagiarism">
                  Academic Integrity & AI
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EnvironmentalConsiderations;
