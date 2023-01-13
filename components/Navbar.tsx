import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { cart_icon } from '../assets'
import styles from "@styles/navbar.module.scss"
import { useRouter } from 'next/router'
import { AppContext } from '@context/App.context'
import { ICartItem } from '@utils/interfaces'

type Props = {}

export const Navbar = (props: Props) => {
  const router = useRouter()

  const isMounted = useRef(false)

  const {cartArray} = useContext(AppContext)

  const [cart, setCart] = useState<ICartItem[]>([])
  
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      return setCart(cartArray)
    }
  }, [cartArray])


  return (
    <header className={styles.header}>
        <nav>
            <h1 className={styles.logo} onClick={() => router.push("/")}>
              WorldShop
            </h1>
            <div className={styles.cart_icon}
              onClick={() => cartArray?.length && router.push("/cart")}
            >
              <Image src={cart_icon} alt="cart icon" />
              <span className={styles.cart_quantity}>{cart.length > 0 ? cart.length : 0}</span>
            </div>
        </nav>
        <ul>
            <li>All</li>
            <li>Men</li>
            <li>Women</li>
            <li>Children</li>
        </ul>
    </header>
  )
}