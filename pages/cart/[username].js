import Head from 'next/head'
import Image from 'next/image'
import styles from '/styles/Home.module.css'
import Layout from '/components/Layout/Layout'
import Footer from '/components/Footer/IntroduceInfo.js'
import { useRouter } from 'next/router'
import Cart from '/components/Cart/Cart'


export default function Home() {

    const router = useRouter()
    const { username } = router.query

    return (

        <div className={styles.container}>
            <Head>
                <title>{"Sản phẩm tambolu"}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet" />
            </Head>

            <main className={styles.main}>

                <Layout />

                <Cart/>

                <Footer />

            </main>

            <footer className={styles.footer}>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}
