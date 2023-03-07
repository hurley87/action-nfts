import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import Art from '@/components/Art';

const Home: NextPage = () => {
  return (
    <Layout>
      <Art />
    </Layout>
  );
};

export default Home;
