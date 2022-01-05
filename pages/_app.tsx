import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { theme } from '../shared/mui-theme';
import '../styles/globals.css';
import { ApolloProvider } from '../src/apollo/ApolloProvider';
import { Snackbar } from '../shared/components/snackbar/Snackbar';
import { fetchCategories } from '../src/admin/categories/category-actions';
import { fetchGeolocation } from '../src/geolocation/geolocation-actions';
import 'react-phone-number-input/style.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const routeChangeStart = (): void => NProgress.start();
    const routeChangeComplete = (): void => NProgress.done();
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jssStyles.parentElement!.removeChild(jssStyles);
    }

    fetchCategories(1, 100);
    fetchGeolocation();

  }, []);

  return (
    <UserProvider>
      <ApolloProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <Component {...pageProps} />
          <Snackbar />
        </MuiThemeProvider>
      </ApolloProvider>
    </UserProvider>
  );
};

export default MyApp;
