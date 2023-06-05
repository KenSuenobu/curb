import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ConfirmDialog from '../components/dialogs/ConfirmDialog';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ConfirmDialog/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

