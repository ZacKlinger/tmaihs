import { Link } from "react-router-dom";
import { 
  Brain, 
  Lightbulb, 
  MessageSquareText, 
  FolderOpen, 
  Shield,
  Users,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "What Is AI?",
    description: "Accurate, research-aligned explanations of machine learning, LLMs, and their limitations.",
    href: "/what-is-ai",
    icon: Brain,
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Why AI Matters",
    description: "Explore workload reduction, enhanced differentiation, and creative augmentation possibilities.",
    href: "/why-ai-matters",
    icon: Lightbulb,
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Prompt Engineering",
    description: "Learn instruction-following techniques, specificity strategies, and failure analysis.",
    href: "/prompt-engineering",
    icon: MessageSquareText,
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Micro-courses",
    description: "Interactive mini-lessons with hands-on exercises to build your AI skills step by step.",
    href: "/learning-studio",
    icon: GraduationCap,
    color: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
    featured: true,
  },
  {
    title: "Classroom Resources",
    description: "Project-based learning templates with research rationales and scaffolds for diverse learners.",
    href: "/classroom-resources",
    icon: FolderOpen,
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Ethics & Safety",
    description: "Responsible usage frameworks, privacy considerations, and bias mitigation strategies.",
    href: "/ethics-safety",
    icon: Shield,
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Community Dialogue",
    description: "Join the conversation with fellow educators about AI in the classroom.",
    href: "/community",
    icon: Users,
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
];

export function NavigationCards() {
  return (
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
            Explore the Library
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Navigate to any section that interests you. Each resource is designed to support 
            teacher agency and provide research-backed guidance without prescription.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Link
              key={section.href}
              to={section.href}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 transition-all duration-300",
                section.color,
                "border border-border/50 hover:border-primary/20",
                "card-lift",
                section.featured && "md:col-span-2 lg:col-span-1",
                "opacity-0 animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={cn(
                "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-soft",
                "transition-transform duration-300 group-hover:scale-110"
              )}>
                <section.icon className={cn("h-6 w-6", section.iconColor)} />
              </div>

              {/* Content */}
              <h3 className="mb-2 font-serif text-xl font-semibold text-charcoal">
                {section.title}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>

              {/* Link indicator */}
              <div className="flex items-center text-sm font-medium text-primary">
                <span>Explore</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              {/* Featured badge */}
              {section.featured && (
                <div className="absolute right-4 top-4 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                  Featured
                </div>
              )}

              {/* Decorative arc */}
              <svg
                className="absolute -bottom-8 -right-8 h-32 w-32 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]"
                viewBox="0 0 100 50"
                fill="none"
              >
                <path
                  d="M0 50 Q50 0 100 50"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
