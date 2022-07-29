import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/pages/Home.module.scss';
import Layout from '../components/Layout';

import Content from '../modules/Home';

export default function Home() {
  return (
    <Layout
      page={{
        title: 'Home',
      }}
    >
      <Content />
    </Layout>
  );
}
