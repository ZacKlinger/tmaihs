import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import {
  CREDENTIAL_TITLE,
  ISSUER,
  PD_STATEMENT,
  COMPETENCIES,
} from '@/lib/credentialContent';

// Register fonts
Font.register({
  family: 'Crimson Pro',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm1MP5s7dtC4yZNE.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm18NZs7dtC4yZNE.ttf', fontWeight: 600 },
  ],
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.ttf', fontWeight: 500 },
  ],
});

Font.register({
  family: 'JetBrains Mono',
  src: 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.ttf',
});

const primaryColor = '#7D2E46'; // hsl(345, 55%, 28%)
const mutedColor = '#6B7280';
const borderColor = '#E5E7EB';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
  },
  container: {
    flex: 1,
    border: `1pt solid ${borderColor}`,
    padding: 40,
  },
  decorativeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  decorativeLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${primaryColor}33`,
  },
  diamond: {
    width: 8,
    height: 8,
    marginHorizontal: 16,
    backgroundColor: `${primaryColor}40`,
    borderRadius: 2,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  certificateLabel: {
    fontSize: 8,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: mutedColor,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Crimson Pro',
    fontWeight: 600,
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  recipient: {
    textAlign: 'center',
    marginBottom: 35,
  },
  awardedLabel: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: mutedColor,
    marginBottom: 12,
  },
  recipientName: {
    fontSize: 32,
    fontFamily: 'Crimson Pro',
    fontWeight: 600,
    color: primaryColor,
    letterSpacing: 0.5,
  },
  competenciesSection: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
  },
  competenciesLabel: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: mutedColor,
    textAlign: 'center',
    marginBottom: 16,
  },
  competencyItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 30,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: primaryColor,
    marginTop: 5,
    marginRight: 10,
  },
  competencyText: {
    fontSize: 10,
    color: mutedColor,
    lineHeight: 1.5,
    flex: 1,
  },
  pdStatement: {
    textAlign: 'center',
    marginBottom: 30,
  },
  pdText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: mutedColor,
    paddingHorizontal: 40,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: `${borderColor}88`,
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLeft: {
    alignItems: 'flex-start',
  },
  dateLabel: {
    fontSize: 8,
    color: mutedColor,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 11,
    fontWeight: 500,
    marginBottom: 16,
  },
  issuerName: {
    fontSize: 13,
    fontFamily: 'Crimson Pro',
    fontWeight: 600,
    color: primaryColor,
    marginBottom: 4,
  },
  issuerDesc: {
    fontSize: 8,
    color: mutedColor,
    maxWidth: 180,
    lineHeight: 1.4,
  },
  footerRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 16,
  },
  certIdSection: {
    alignItems: 'flex-end',
  },
  certIdLabel: {
    fontSize: 8,
    color: mutedColor,
    marginBottom: 4,
  },
  certIdValue: {
    fontSize: 11,
    fontFamily: 'JetBrains Mono',
    fontWeight: 500,
    marginBottom: 8,
  },
  verifyText: {
    fontSize: 8,
    color: mutedColor,
  },
  qrContainer: {
    padding: 4,
    borderWidth: 1,
    borderColor: `${borderColor}88`,
    borderRadius: 4,
  },
  qrImage: {
    width: 64,
    height: 64,
  },
});

interface CertificatePDFProps {
  recipientName: string;
  completionDate: string;
  certificateId: string;
  qrCodeDataUrl: string;
}

export const CertificatePDF = ({
  recipientName,
  completionDate,
  certificateId,
  qrCodeDataUrl,
}: CertificatePDFProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        {/* Decorative top line */}
        <View style={styles.decorativeTop}>
          <View style={styles.decorativeLine} />
          <View style={styles.diamond} />
          <View style={styles.decorativeLine} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.certificateLabel}>Certificate of Completion</Text>
          <Text style={styles.title}>{CREDENTIAL_TITLE}</Text>
        </View>

        {/* Recipient */}
        <View style={styles.recipient}>
          <Text style={styles.awardedLabel}>Awarded to</Text>
          <Text style={styles.recipientName}>{recipientName}</Text>
        </View>

        {/* Competencies */}
        <View style={styles.competenciesSection}>
          <Text style={styles.competenciesLabel}>Demonstrated Competencies</Text>
          {COMPETENCIES.map((comp) => (
            <View key={comp.id} style={styles.competencyItem}>
              <View style={styles.bullet} />
              <Text style={styles.competencyText}>{comp.statement}</Text>
            </View>
          ))}
        </View>

        {/* PD Statement */}
        <View style={styles.pdStatement}>
          <Text style={styles.pdText}>{PD_STATEMENT}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.dateLabel}>Date of Completion</Text>
            <Text style={styles.dateValue}>{completionDate}</Text>
            <Text style={styles.issuerName}>{ISSUER.name}</Text>
            <Text style={styles.issuerDesc}>{ISSUER.descriptor}</Text>
          </View>

          <View style={styles.footerRight}>
            <View style={styles.certIdSection}>
              <Text style={styles.certIdLabel}>Certificate ID</Text>
              <Text style={styles.certIdValue}>{certificateId}</Text>
              <Text style={styles.verifyText}>Verify at tmaihs.com/verify</Text>
            </View>
            <View style={styles.qrContainer}>
              <Image style={styles.qrImage} src={qrCodeDataUrl} />
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
