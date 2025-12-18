import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useVerifyCertificate } from '@/hooks/useCertificate';
import { 
  CREDENTIAL_TITLE, 
  ISSUER, 
  PD_STATEMENT, 
  PD_EXPLANATION,
  COMPETENCIES,
  ISTE_STANDARDS,
  UDL_GUIDELINES,
  TIER_DESCRIPTIONS,
  COMPLETION_CRITERIA,
} from '@/lib/credentialContent';
import { TIERS, COURSE_NAMES } from '@/lib/studioTiers';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ExternalLink,
  ChevronDown,
  Clock,
  Award,
  BookOpen,
  Shield,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const Verify = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const { certificate, loading, notFound, error } = useVerifyCertificate(certificateId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Verifying credential...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-serif font-semibold mb-4">
              Credential Not Found
            </h1>
            <p className="text-muted-foreground mb-2">
              The certificate ID <code className="bg-muted px-2 py-1 rounded text-sm">{certificateId}</code> could not be verified.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Please check that the ID was entered correctly, or contact the credential holder.
            </p>
            <Link 
              to="/" 
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Return to TMAIHS
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Verification Status */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Verified Credential</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2">
            {certificate?.recipient_name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {CREDENTIAL_TITLE}
          </p>
        </div>

        {/* Certificate Details Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Certificate ID</p>
              <p className="font-mono font-medium">{certificate?.certificate_id}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Date Issued</p>
              <p className="font-medium">{certificate && formatDate(certificate.issued_at)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground mb-1">Issuer</p>
              <p className="font-medium">{ISSUER.name}</p>
              <p className="text-sm text-muted-foreground">{ISSUER.descriptor}</p>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <Accordion type="multiple" className="space-y-4" defaultValue={['completion']}>
          {/* Completion Criteria */}
          <AccordionItem value="completion" className="bg-card border border-border rounded-xl overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-medium">Completion Criteria</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <p className="text-muted-foreground mb-4">{COMPLETION_CRITERIA.summary}</p>
              
              <div className="space-y-4">
                {TIER_DESCRIPTIONS.map((tier) => (
                  <div key={tier.tier} className="border-l-2 border-primary/30 pl-4">
                    <p className="font-medium text-sm">Tier {tier.tier}: {tier.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{tier.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {TIERS.find(t => t.id === tier.tier)?.courseIds.map(courseId => (
                        <Badge key={courseId} variant="secondary" className="text-xs">
                          {COURSE_NAMES[courseId]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {COMPLETION_CRITERIA.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Demonstrated Competencies */}
          <AccordionItem value="competencies" className="bg-card border border-border rounded-xl overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">Demonstrated Competencies</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <ul className="space-y-4">
                {COMPETENCIES.map((comp) => (
                  <li key={comp.id} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comp.statement}
                    </p>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* PD Equivalency */}
          <AccordionItem value="pd" className="bg-card border border-border rounded-xl overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Professional Development Equivalency</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <p className="font-medium text-foreground mb-2">{PD_STATEMENT}</p>
              <p className="text-sm text-muted-foreground">{PD_EXPLANATION}</p>
            </AccordionContent>
          </AccordionItem>

          {/* Standards Alignment */}
          <AccordionItem value="standards" className="bg-card border border-border rounded-xl overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">Standards Alignment</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {/* ISTE Standards */}
              <div className="mb-8">
                <h4 className="font-medium text-foreground mb-4">ISTE Educator Standards</h4>
                <div className="space-y-4">
                  {ISTE_STANDARDS.map((standard) => (
                    <div key={standard.indicator} className="border-l-2 border-primary/30 pl-4">
                      <p className="text-sm font-medium">
                        {standard.indicator}: {standard.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{standard.alignment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* UDL Guidelines */}
              <div>
                <h4 className="font-medium text-foreground mb-4">CAST UDL Guidelines</h4>
                <div className="space-y-4">
                  {UDL_GUIDELINES.map((guideline) => (
                    <div key={guideline.checkpoint} className="border-l-2 border-primary/30 pl-4">
                      <p className="text-sm font-medium">
                        Checkpoint {guideline.checkpoint}: {guideline.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Principle: {guideline.principle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{guideline.alignment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Issuer Description */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {ISSUER.fullDescription}
          </p>
          <Link 
            to="/" 
            className="text-primary hover:underline text-sm inline-flex items-center gap-1 mt-4"
          >
            Learn more about TMAIHS
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
