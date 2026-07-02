import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/he/home',
      permanent: true,
    },
  };
};

export default function RootRedirect() {
  return null;
}
