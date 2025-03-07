// pages/test.tsx or src/pages/test.tsx
import type { NextPage } from 'next';

interface TestPageProps {
  query: { id: string };
}

const TestPage: NextPage<TestPageProps> = ({ query }) => {
  return (
    <div>
      <h1>Test Page with ID: {query.id}</h1>
    </div>
  );
};

TestPage.getInitialProps = async ({ query }) => {
  return { query };
};

export default TestPage;
