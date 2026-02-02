import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ReservationEmailProps {
  guestName?: string;
  date?: string;
  time?: string;
  guests?: string;
  tableId?: string;
  zone?: string;
}

export const ReservationEmailTemplate = ({
  guestName = 'Guest',
  date = 'Tonight',
  time = '7:00 PM',
  guests = '2',
  tableId = 'M1',
  zone = 'Main Floor',
}: ReservationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Table at Lalibela is Confirmed: {date} @ {time}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>LALIBELA<span style={dot}>.</span></Text>
            <Text style={tagline}>WHERE CASUAL MEETS EXTRAORDINARY</Text>
          </Section>
          
          {/* FIXED: Replaced broken Unsplash URL with a high-quality working one */}
          <Img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
            width="600"
            height="300"
            alt="Lalibela Atmosphere"
            style={heroImage}
          />

          <Section style={content}>
            <Heading style={greeting}>Selam, {guestName}.</Heading>
            <Text style={paragraph}>
              We are delighted to confirm your reservation. Your table has been meticulously selected to ensure your evening at Lalibela is nothing short of extraordinary.
            </Text>

            <Section style={detailsBox}>
              <table style={{ width: '100%' }}>
                <tr>
                  <td style={detailLabel}>DATE</td>
                  <td style={detailValue}>{date}</td>
                </tr>
                <tr><td colSpan={2}><Hr style={divider} /></td></tr>
                <tr>
                  <td style={detailLabel}>ARRIVAL</td>
                  <td style={detailValue}>{time}</td>
                </tr>
                <tr><td colSpan={2}><Hr style={divider} /></td></tr>
                <tr>
                  <td style={detailLabel}>PARTY</td>
                  <td style={detailValue}>{guests} Guests</td>
                </tr>
                <tr><td colSpan={2}><Hr style={divider} /></td></tr>
                <tr>
                  <td style={detailLabel}>TABLE</td>
                  <td style={detailValue}>{tableId} — {zone}</td>
                </tr>
              </table>
            </Section>

            <Section style={buttonContainer}>
              <Link href="#" style={button}>
                MANAGE RESERVATION
              </Link>
            </Section>

            <Text style={footerNote}>
              If you have any dietary requirements or if your plans change, please let us know at least 24 hours in advance. We look forward to welcoming you soon.
            </Text>
          </Section>

          <Hr style={fullDivider} />

          <Section style={footer}>
            <Text style={footerText}>
              45 Lalibela Way, Culinary Arts District, NY 10012
            </Text>
            <Text style={footerText}>
              (555) 777-8888 • concierge@lalibela-dining.com
            </Text>
            <Section style={socials}>
              <Link href="#" style={socialLink}>INSTAGRAM</Link>
              <Link href="#" style={socialLink}>FACEBOOK</Link>
              <Link href="#" style={socialLink}>TWITTER</Link>
            </Section>
            <Text style={copyright}>
              © 2024 LALIBELA RESTAURANT GROUP. ALL RIGHTS RESERVED.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#020617',
  fontFamily: '"Inter", "HelveticaNeue", Helvetica, Arial, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#0f172a',
  margin: '0 auto',
  width: '600px',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid rgba(212, 175, 55, 0.1)',
};

const header = {
  padding: '40px 0',
  textAlign: 'center' as const,
};

const logo = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ffffff',
  letterSpacing: '0.2em',
  margin: '0',
};

const dot = {
  color: '#D4AF37',
};

const tagline = {
  fontSize: '10px',
  color: '#94a3b8',
  letterSpacing: '0.4em',
  marginTop: '10px',
  fontWeight: 'bold',
};

const heroImage = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover' as const,
};

const content = {
  padding: '40px 50px',
};

const greeting = {
  fontSize: '28px',
  color: '#ffffff',
  fontWeight: '700',
  margin: '0 0 20px 0',
};

const paragraph = {
  fontSize: '15px',
  color: '#94a3b8',
  lineHeight: '26px',
  margin: '0 0 30px 0',
};

const detailsBox = {
  backgroundColor: '#020617',
  padding: '30px',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  marginBottom: '30px',
};

const detailLabel = {
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#D4AF37',
  letterSpacing: '0.2em',
  margin: '0',
  padding: '10px 0',
};

const detailValue = {
  fontSize: '14px',
  color: '#ffffff',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'right' as const,
  padding: '10px 0',
};

const divider = {
  borderColor: 'rgba(255, 255, 255, 0.05)',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#D4AF37',
  borderRadius: '4px',
  color: '#020617',
  fontSize: '12px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '18px 40px',
  letterSpacing: '0.3em',
};

const footerNote = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '22px',
  fontStyle: 'italic',
};

const fullDivider = {
  borderColor: 'rgba(255, 255, 255, 0.05)',
  margin: '0',
};

const footer = {
  padding: '40px 50px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#475569',
  margin: '5px 0',
};

const socials = {
  margin: '25px 0',
};

const socialLink = {
  fontSize: '10px',
  color: '#D4AF37',
  fontWeight: 'bold',
  letterSpacing: '0.2em',
  margin: '0 15px',
  textDecoration: 'none',
};

const copyright = {
  fontSize: '9px',
  color: '#334155',
  letterSpacing: '0.3em',
  marginTop: '20px',
};

export default ReservationEmailTemplate;