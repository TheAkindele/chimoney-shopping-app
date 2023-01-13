import { AppContext } from '@context/App.context'
import { ICartItem, ICartProductDetails, IProductData } from '@utils/interfaces'
import { productData } from '@utils/sampleData'
import React, { useContext, useEffect, useState } from 'react'

type Props = {}

export const useGetProduct = () => {
    const {cartArray} = useContext(AppContext)

  const [cart, setCart] = useState<ICartProductDetails[]>()

  useEffect(() => {
    const getCartItems = () => {
      const cartArrayIds = [], cartArrayIdsProduct = [], cartArrayQuantites = [], cartArrayPrices = []
      let cartElement!: ICartItem
  
      for (let index = 0; index < cartArray.length; index++) {
        const element = cartArray[index];
        cartArrayIds.push(element.id);
      }
  
      for (let index = 0; index < productData.length; index++) {
        let element = productData[index];
        
      
        const check = cartArrayIds.includes(element.id);

        let fromCart = cartArray.find(ele => ele.id === element.id)
        if (fromCart) {
          cartElement = fromCart
        }
      
        if (check && fromCart) {
          cartArrayIdsProduct.push({...element, quantity: cartElement?.quantity, itemTotalPrice: element.newPrice * cartElement?.quantity})
        }
      }
      
      return cartArrayIdsProduct
    }
    setCart(getCartItems())
  }, [cartArray])

  return {
    cartProductArray: cart,
  }
}