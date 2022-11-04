import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { data as pageData } from '../config/data'

export default function Home({ data }: { data: any }) {
  return (

    <div className={styles.container}>
      <Head>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {pageData.home.title} <a href="https://benboxs.shop">{data.title}!</a>
        </h1>

        <div className={styles.grid}>
          {data.link.map((item: any) => (
            <Link href={item.link} legacyBehavior key={item.id} >
              <a target="_blank" rel="noreferrer" className={styles.card}>
                <h2>{item.title}</h2>
              </a>
            </Link>
          ))}
        </div>

        <div className={styles.grid}>
          {data.footer.map((item: any) => (
            <Link href={item.link} legacyBehavior key={item.id} >
              <a target="_blank" rel="noreferrer">
                <h2>{item.title}</h2>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by EAS Tecnologia
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="EAS Tecnologia" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/public/links`)
  const data = await res.json()

  return {
    props: { data },
    revalidate: 10,
  }
}
