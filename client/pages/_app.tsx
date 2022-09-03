import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'
import AppMenu from '../component/Menu/Menu'
import Image from 'next/image' 
import { wrapper } from '../store'
import Player from '../component/Player/Player'

function WrappedApp({ Component, pageProps }: AppProps) {
  return (<>
    <header className={styles.header}>
      <AppMenu />
    </header>

    <main className={styles.main}>
      <Component {...pageProps} />
      
      <Player />
    </main>

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer">
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </>)
}

export default wrapper.withRedux(WrappedApp);
