import React from 'react';
import { Box } from '@material-ui/core';
import { Topbar } from './components/Topbar';
import { Footer } from './components/Footer';



export const Layout: React.FC = (
  { children }
)=>{
  return (
    <>
      <Topbar/>
      <Box>
        {children}
      </Box>
      <Footer/>
    </>
  );
};