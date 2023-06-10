import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '@/components/header';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps){
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default MyApp;