import React, { useContext, useEffect } from 'react'
import styles from "@styles/components.module.scss"
import Image, { StaticImageData } from 'next/image'
import { minus, plus, ratingIcon } from '@assets'
import { useRouter } from 'next/router'
import { formatCurrency } from '@utils'
import { AppContext } from '@context/App.context'
import { ICartCard } from '@utils/interfaces'


export const CartCard = ({id, name, newPrice, oldPrice, image, quantity}: ICartCard) => {
  const router = useRouter()

  useEffect(() => {}, [])

  const {cartArray, addToCart, removeFromCart} = useContext(AppContext)
  

  return (
    <div className={styles.cart_card__container}>
        <div className={styles.cart_card__image} style={{backgroundImage: `url(${image?.src})`}}></div>
        <div className={styles.cart_card__details}>
            <p className={styles.cart_card__name}>{name}</p>
            <h4 className={styles.cart_card__new_price}>{formatCurrency({amount: newPrice, currency: "NGN"})}</h4>
            <p className={styles.cart_card__old_price}>{formatCurrency({amount: oldPrice, currency: "NGN"})}</p>
            <Image src={ratingIcon} alt="product-rating" width={"65"} />
              <div className={styles.cart_card__button_cont}>
                <div className={styles.cart_card__btn} onClick={() => removeFromCart({id, quantity: 1})}>
                  <Image src={minus} alt="remove" 
                    className={styles.cart_card__actionBtn}
                  />
                </div>
                <span className={styles.cart_card__quantity}>{quantity}</span>
                <div className={styles.cart_card__btn} onClick={() => addToCart({id, quantity: 1})} >
                  <Image src={plus} alt="add" 
                    className={styles.cart_card__actionBtn}
                  />
                </div>
              </div>

              <button className={styles.cart_card__remove_btn}
                  onClick={() => removeFromCart({id, quantity: 0, type: "remove"})}
                >
                  Remove
                </button>

        </div>
    </div>
  )
}