import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { ProductCard, Layout } from '@components'
import { productData } from '@utils/sampleData'
import { IProductData } from '@utils/interfaces'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Chimoney frontend developer challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <main className={styles.home}>
        <main className={styles.home__main}>
          <section className={styles.home__products_container}>
            {productData?.map((item: IProductData) => (
              <ProductCard 
                key={item.id}
                id={item.id}
                oldPrice={item.oldPrice}
                newPrice={item.newPrice}
                name={item.name}
                image={item.image}
                onClick={(e) => router.push(`/${e}`)}
              />
            ))}
          </section>
        </main>
      </main>
      </Layout>
    </>
  )
}
