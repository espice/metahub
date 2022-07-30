import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/pages/Home.module.scss';
import Layout from '../components/Layout';
import Content from '../modules/Settings';

export default function Settings() {
  return (
    <Layout
      page={{
        title: 'Welcome',
      }}
    >
      <Content />
    </Layout>
  );
}
