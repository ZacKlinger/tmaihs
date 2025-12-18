import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { usePersistentProgress } from '@/hooks/usePersistentProgress';
import { useCertificate } from '@/hooks/useCertificate';
import { getVerificationUrl, generateQRCodeDataUrl } from '@/lib/certificateUtils';
import { CertificatePDF } from '@/components/certificate/CertificatePDF';
import { 
  CREDENTIAL_TITLE, 
  ISSUER, 
  PD_STATEMENT,
  COMPETENCIES,
} from '@/lib/credentialContent';
import { Download, ArrowLeft, Loader2, User } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const Certificate = () => {
  const { user, loading: authLoading } = useAuth();
  const { displayName, loading: profileLoading } = useProfile();
  const { allCoursesCompleted, completedAt, loading: progressLoading } = usePersistentProgress();
  const { certificate, loading: certLoading, issueCertificate } = useCertificate(user?.id);
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  const isLoading = authLoading || progressLoading || profileLoading || certLoading;

  // Redirect if not eligible
  useEffect(() => {
    if (!authLoading && !progressLoading && !profileLoading) {
      if (!user || !allCoursesCompleted) {
        navigate('/learning-studio');
      }
    }
  }, [user, allCoursesCompleted, authLoading, progressLoading, profileLoading, navigate]);

  // Auto-issue certificate when eligible
  useEffect(() => {
    async function autoIssue() {
      if (user && allCoursesCompleted && !certificate && !certLoading) {
        const name = displayName || user.email || 'Educator';
        const email = user.email || '';
        await issueCertificate(name, email);
      }
    }
    autoIssue();
  }, [user, allCoursesCompleted, certificate, certLoading, displayName, issueCertificate]);

  // Generate QR code data URL for PDF
  useEffect(() => {
    async function generateQR() {
      if (certificate) {
        const url = getVerificationUrl(certificate.certificate_id);
        const dataUrl = await generateQRCodeDataUrl(url);
        setQrCodeDataUrl(dataUrl);
      }
    }
    generateQR();
  }, [certificate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Preparing your credential...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !allCoursesCompleted) {
    return null;
  }

  const recipientName = displayName || user.email || 'Educator';
  const completionDate = completedAt 
    ? new Date(completedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

  const verificationUrl = certificate ? getVerificationUrl(certificate.certificate_id) : '';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Controls - hidden in print */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learning-studio')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Studio
          </Button>
          {certificate && qrCodeDataUrl && (
            <PDFDownloadLink
              document={
                <CertificatePDF
                  recipientName={recipientName}
                  completionDate={completionDate}
                  certificateId={certificate.certificate_id}
                  qrCodeDataUrl={qrCodeDataUrl}
                />
              }
              fileName={`TMAI-Certificate-${recipientName.replace(/\s+/g, '-')}.pdf`}
            >
              {({ loading, error }) => {
                if (error) {
                  console.error('PDF generation error:', error);
                  return (
                    <Button variant="destructive" className="gap-2">
                      <Download className="h-4 w-4" />
                      Error - Retry
                    </Button>
                  );
                }
                return (
                  <Button className="gap-2" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {loading ? 'Preparing...' : 'Download Certificate'}
                  </Button>
                );
              }}
            </PDFDownloadLink>
          )}
        </div>

        {/* Certificate */}
        <div 
          ref={certificateRef}
          className="bg-background border border-border rounded-none print:rounded-none p-10 md:p-16 shadow-sm print:shadow-none print:border print:border-border/50 aspect-[1.414] flex flex-col"
        >
          {/* Decorative top line */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-primary/20" />
            <div className="w-3 h-3 rotate-45 border-2 border-primary/40" />
            <div className="flex-1 h-px bg-primary/20" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Certificate of Completion
            </p>
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tight">
              {CREDENTIAL_TITLE}
            </h1>
          </div>

          {/* Recipient */}
          <div className="text-center mb-10 flex-shrink-0">
            <p className="text-xs text-muted-foreground mb-3 tracking-wide uppercase">
              Awarded to
            </p>
            <p className="text-3xl md:text-4xl font-serif font-semibold text-primary tracking-tight">
              {recipientName}
            </p>
            {!displayName && (
              <p className="text-xs text-muted-foreground mt-3 print:hidden flex items-center justify-center gap-1">
                <User className="h-3 w-3" />
                Want your name here?{' '}
                <button 
                  onClick={() => navigate('/learning-studio')}
                  className="text-primary hover:underline"
                >
                  Update your profile
                </button>
              </p>
            )}
          </div>

          {/* Competencies */}
          <div className="flex-1 flex flex-col justify-center mb-8">
            <p className="text-xs text-muted-foreground text-center mb-4 tracking-wide uppercase">
              Demonstrated Competencies
            </p>
            <ul className="space-y-2 max-w-2xl mx-auto">
              {COMPETENCIES.map((comp) => (
                <li 
                  key={comp.id}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{comp.statement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PD Statement */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground italic">
              {PD_STATEMENT}
            </p>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-border/50">
            <div className="flex justify-between items-end">
              {/* Left: Date & Issuer */}
              <div className="text-left">
                <p className="text-xs text-muted-foreground mb-1">Date of Completion</p>
                <p className="font-medium text-sm mb-4">{completionDate}</p>
                <p className="font-serif text-primary font-medium">{ISSUER.name}</p>
                <p className="text-xs text-muted-foreground max-w-[200px]">
                  {ISSUER.descriptor}
                </p>
              </div>

              {/* Right: Certificate ID & QR */}
              {certificate && (
                <div className="text-right flex items-end gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Certificate ID</p>
                    <p className="font-mono text-sm font-medium">{certificate.certificate_id}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Verify at tmaihs.com/verify
                    </p>
                  </div>
                  <div className="bg-background p-1 border border-border/50 rounded">
                    <QRCodeSVG 
                      value={verificationUrl}
                      size={64}
                      level="M"
                      bgColor="transparent"
                      fgColor="hsl(345, 55%, 28%)"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional info - hidden in print */}
        <div className="mt-8 text-center print:hidden">
          <p className="text-sm text-muted-foreground">
            This credential can be verified at{' '}
            {certificate && (
              <a 
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-mono"
              >
                {verificationUrl}
              </a>
            )}
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header, footer, nav {
            display: none !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Certificate;
