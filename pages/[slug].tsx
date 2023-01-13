import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { Layout, ProductCard } from '@components'
import { useRouter } from 'next/router'
import { productData } from '@utils/sampleData'
import { IProductData } from '@utils/interfaces'
import { backBtn } from '@assets'


export default function ProductaDetailPage() {
    const router = useRouter()
    const {slug} = router.query

    const getProduct: Function = () => productData.find((item: IProductData) => item.id === slug)

  return (
    <>
      <Head>
        <title>Product Detail Page</title>
        <meta name="description" content="Chimoney frontend developer challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <main className={styles.product_detail__container}>
        {/* <Navbar /> */}
        <main className={styles.product_detail__main}>
        <Image src={backBtn} alt="" className={styles.product_detail__backBtn} 
            onClick={() => router.back()}
        />
          <section>
            <ProductCard 
                id={getProduct()?.id}
                oldPrice={getProduct()?.oldPrice}
                newPrice={getProduct()?.newPrice}
                name={getProduct()?.name}
                image={getProduct()?.image}
            />
          </section>
        </main>
      </main>
      </Layout>
    </>
  )
}
