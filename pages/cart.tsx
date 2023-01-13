import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/cart.module.scss'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@context/App.context'
import { Button, CartCard, Layout } from '@components'
import { useRouter } from 'next/router'
import { productData } from '@utils/sampleData'
import { ICartItem, ICartProductDetails, IProductData } from '@utils/interfaces'
import { backBtn } from '@assets'
import { formatCurrency } from '@utils'
import { useGetProduct } from '@customHooks'


export default function Cart() {
  const router = useRouter()

  const {cartProductArray} = useGetProduct()


  const getQuantity = (productId: string) => cartProductArray?.find(ele => ele.id === productId)
  const getPrices = cartProductArray?.map(ele => ele?.itemTotalPrice).reduce((curr, acc) => curr + acc, 0)


  return (
    <>
      <Head>
        <title>Cart Page</title>
        <meta name="description" content="Chimoney frontend developer challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <main className={styles.cart__container}>
        <main className={styles.cart__wrapper}>
        <Image src={backBtn} alt="" className={styles.cart__backBtn} 
            onClick={() => router.back()}
        />
        <section className={styles.cart__main}>
          <section className={styles.cart__main_section}>
            {cartProductArray?.map((item) => (
              <CartCard
                key={item.id}
                id={item.id}
                oldPrice={item.oldPrice}
                newPrice={item.newPrice}
                name={item.name}
                image={item.image}
                quantity={getQuantity(item.id)?.quantity}
              />
            ))}
          </section>
          <aside className={styles.cart__aside}>
            <div>
            <span className={styles.cart__total}>
                {`Subtotal (${cartProductArray?.length} items): `}
            </span >
            <span  className={styles.cart__amount}>
              {formatCurrency({amount: getPrices, currency: "NGN"})}
            </span>
            </div>
            <Button text="Proceed to Checkout" onClick={() => router.push("/checkout")} />
          </aside>
              
          </section>
        </main>
      </main>
      </Layout>
    </>
  )
}
