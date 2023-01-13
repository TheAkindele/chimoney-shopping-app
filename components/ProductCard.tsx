import React, { useContext } from 'react'
import styles from "@styles/components.module.scss"
import Image, { StaticImageData } from 'next/image'
import { ratingIcon } from '@assets'
import { useRouter } from 'next/router'
import { formatCurrency } from '@utils'
import { AppContext } from '@context/App.context'
import { IProductCard } from '@utils/interfaces'
import { Button } from './Button'


export const ProductCard = ({id, name, newPrice, oldPrice, image, onClick}: IProductCard) => {
  const router = useRouter()

  const {cartArray, addToCart} = useContext(AppContext)

  return (
    <div className={styles.product_card__container}
      
    >
        <div 
          className={router.pathname === "/" ? styles.product_card__small_image : styles.product_card__big_image} style={{backgroundImage: `url(${image?.src})`}}
          onClick={() => onClick && onClick(id)}
        ></div>
        <main className={router.pathname === "/" ? styles.product_card__home_main : styles.product_card__main}
          onClick={() => onClick && onClick(id)}
        >
            <p className={styles.product_card__name}>{name}</p>
            <h4 className={styles.product_card__new_price}>{formatCurrency({amount: newPrice, currency: "NGN"})}</h4>
            <p className={styles.product_card__old_price}>{formatCurrency({amount: oldPrice, currency: "NGN"})}</p>
            <Image src={ratingIcon} alt="product-rating" width={"65"} />
            {router.pathname !== "/" &&
              <Button onClick={() => addToCart({id, quantity: 1})} text="Add To Cart" />
            } 
        </main>
    </div>
  )
}