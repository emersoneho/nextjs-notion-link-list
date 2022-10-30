import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  return (

    <div className={styles.container}>
      <Head>
        <title>BenBox Shop</title>
        <meta name="description" content="BenBox Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo ao  <a href="https://benboxs.shop">BenBoxShop!</a>
        </h1>

        <div className={styles.grid}>
          {data.map((product: any) => (
            <Link href={product.link} legacyBehavior key={product.id} >
              <a target="_blank" rel="noreferrer" className={styles.card}>
                <h2>{product.title}</h2>
                <Image
                  alt={product.description}
                  src={product.image}
                  width={200}
                  height={200}
                />
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

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/public/products`)
  const data = await res.json()

  return { props: { data } }
}
