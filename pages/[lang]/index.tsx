import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langParam = context.params?.lang;
  const lang = langParam === 'he' || langParam === 'en' ? langParam : 'he'; // כברירת מחדל 'he'

  return {
    redirect: {
      destination: `/${lang}/home`,
      permanent: false,
    },
  };
};

export default function RedirectPage() {
  return null;
}
