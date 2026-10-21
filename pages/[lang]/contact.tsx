import styled from '@emotion/styled';
import PageSeo from '@/components/PageSeo';
import ContactForm from '@/components/ContactForm';
import WhatsAppLink from '@/components/WhatsAppLink';
import { langStaticPaths, langStaticProps, useT } from '@/lib/i18n';
import { Actions, Container, H1, Lead, Section } from '@/styles/ui';

export const getStaticPaths = langStaticPaths;
export const getStaticProps = langStaticProps;

const Or = styled.p`
  margin-block-start: 3rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

export default function Contact() {
  const t = useT().contact;
  return (
    <>
      <PageSeo page='contact' />
      <Section>
        <Container>
          <H1>{t.h1}</H1>
          <Lead>{t.lead}</Lead>
          <Actions>
            <WhatsAppLink location='contact_page' />
          </Actions>
          <Or>{t.orForm}</Or>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
