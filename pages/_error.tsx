import { NextPageContext } from 'next';
import Link from 'next/link';

type Props = {
  statusCode?: number;
};

function Error({ statusCode }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#1d1d1d',
        color: '#fff',
      }}
    >
      <div>
        <p style={{ color: '#ffcc00', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
          Web Witch {statusCode ? `— ${statusCode}` : ''}
        </p>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
          משהו השתבש בדרך. נסי לרענן את הדף, או חזרי לעמוד הבית.
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '1rem', color: '#ccc' }}>
          Something went wrong. Try refreshing, or head back home.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          href="/he/home"
          style={{ color: '#ffcc00', textDecoration: 'underline' }}
        >
          עמוד הבית
        </Link>
        <Link
          href="/en/home"
          style={{ color: '#ffcc00', textDecoration: 'underline' }}
        >
          Home
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
