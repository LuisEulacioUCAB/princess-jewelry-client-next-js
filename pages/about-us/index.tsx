import React from 'react';
import { Layout } from '../../shared/layout/Layout';
import { HomeAboutUs } from '../../src/home/HomeAboutUs';

const AboutUs: React.FC = ()=>{
  return (
    <Layout>
      <HomeAboutUs/>
    </Layout>
  );
};

export default AboutUs;