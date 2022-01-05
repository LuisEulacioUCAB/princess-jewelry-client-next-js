import React, { ReactElement } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {AuthCallback} from '../src/auth-callback/AuthCallback';
import Home from '../src/home/Home';
import { MainLoader } from '../shared/components/MainLoader';


/**
 * @returns {ReactElement} Return a reactElement.
 */
export default function App(): ReactElement {
  const { isLoading } = useUser();

  AuthCallback();

  if (isLoading) return <MainLoader>Loading Home...</MainLoader>

  return <Home/>;
}