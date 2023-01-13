import { Button, Layout } from '@components'
import Head from 'next/head'
import React, { useContext } from 'react'
import styles from "@styles/checkout.module.scss"
import { useGetProduct } from '@customHooks'
import { formatCurrency, showToast } from '@utils'
import { AppContext } from '@context/App.context'
import { useRouter } from 'next/router'

type Props = {}

export default function Checkout() {
    const router = useRouter()

    const{cartProductArray} = useGetProduct()

    const {removeFromCart} = useContext(AppContext)

    const getPrices = cartProductArray?.map(ele => ele?.itemTotalPrice).reduce((curr, acc) => curr + acc, 0)

  return (
    <>
        <Head>
            <title>Checkout Page</title>
            <meta name="description" content="Chimoney frontend developer challenge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
        <main className={styles.checkout__container}>
            <section className={styles.checkout__wrapper}>
                <div className={styles.checkout__details_cont}>
                    <h4 className={styles.checkout__section_title}>1. Your address</h4>
                    <p className={styles.checkout__section_detail}>10, Tinubu street, Atiku road by Peter obi road, Lagos, Nigeria</p>
                </div>
                <div className={styles.checkout__details_cont}>
                    <h4 className={styles.checkout__section_title}>2. Payment Details</h4>
                    <p className={styles.checkout__section_detail}>Card Name - Muhyideen Akindele</p>
                    <p className={styles.checkout__section_detail}>Card Number - 1234 5670 8904 1234</p>
                    <p className={styles.checkout__section_detail}>CVV - 331</p>
                </div>
                <div className={styles.checkout__details_cont}>
                    <h4 className={styles.checkout__section_title}>3. Shipping Details</h4>
                    <p className={styles.checkout__section_detail}>To be delivered on Monday 18 July, 2030</p>
                    <p className={styles.checkout__section_detail}>Subtotal - 
                        <span className={styles.checkout__section_detail_subtotal}>{formatCurrency({amount: getPrices, currency: "NGN"})}</span>
                    </p>
                    <p className={styles.checkout__section_detail}>Shipping Fee - 
                        <span className={styles.checkout__section_detail_fee}>{formatCurrency({amount: 5472, currency: "NGN"})}</span>
                    </p>
                    <p className={styles.checkout__section_detail_total}>Total - 
                        <span className={styles.checkout__section_detail_total_value}>{formatCurrency({amount: Number(getPrices) + 5472, currency: "NGN"})}</span>
                    </p>
                </div>

                <Button text="Checkout"  
                    onClick={() => {
                        removeFromCart({id: "", quantity: 0, type: "clear"})
                        router.push("/")
                    }}
                />
            </section>
        </main>
        </Layout>
    </>
  )
}