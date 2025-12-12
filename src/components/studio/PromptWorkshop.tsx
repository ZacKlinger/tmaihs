import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, ArrowRight } from "lucide-react";

interface PromptExample {
  label: string;
  prompt: string;
}

interface PromptWorkshopProps {
  title: string;
  description: string;
  starterPrompts: PromptExample[];
  iterationTips: string[];
  toolLinks: { name: string; url: string }[];
}

export const PromptWorkshop = ({
  title,
  description,
  starterPrompts,
  iterationTips,
  toolLinks,
}: PromptWorkshopProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Tool Links */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm font-medium text-foreground mb-3">
            Open your preferred AI tool to practice:
          </p>
          <div className="flex flex-wrap gap-2">
            {toolLinks.map((tool) => (
              <Button
                key={tool.name}
                variant="outline"
                size="sm"
                asChild
                className="gap-2"
              >
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  {tool.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Starter Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Starter Prompts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {starterPrompts.map((example, index) => (
            <div key={index} className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {example.label}
              </p>
              <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                <p className="text-sm font-mono whitespace-pre-wrap">
                  {example.prompt}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Iteration Tips */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            What to Try Next
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {iterationTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-amber-500 font-medium">{index + 1}.</span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
