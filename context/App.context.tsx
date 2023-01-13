import { showToast } from "@utils";
import { childProps, contextTypes, ICartItem, IObject } from "@utils/interfaces";
import React, { createContext, useState } from "react";


export const AppContext = createContext<contextTypes>({
    cartArray: [], 
    addToCart: (e: ICartItem) => Function,
    removeFromCart: (e: ICartItem) => Function
});


export const ContextProvider = ({ children }: childProps ) => {
    let cart: ICartItem[] = []

    if (typeof window !== 'undefined') {
        cart = JSON.parse(localStorage.getItem("cart") || "[]") 
    }

    const [cartArray, setCartArray] = useState<ICartItem[]>(cart)

    const addToCart = (itemToAdd: ICartItem) => {
        const existingCartItem = cartArray?.find((items: ICartItem) => items.id === itemToAdd.id)

        if (existingCartItem && existingCartItem.quantity === 1) {
           const payload = cartArray.map((item: ICartItem) =>
            item.id === itemToAdd.id
                ? { ...item, quantity: item?.quantity + 1 }
                : { ...item })
            setCartArray(payload)
            localStorage.setItem("cart", JSON.stringify(payload))
            showToast(`item quantity increased by 1`, "info")
        }
        else if (existingCartItem && existingCartItem.quantity > 1) {
           const payload = cartArray.map((item: ICartItem) =>
            item.id === itemToAdd.id
                ? { ...item, quantity: item?.quantity + itemToAdd.quantity }
                : { ...item })
            setCartArray(payload)
            localStorage.setItem("cart", JSON.stringify(payload))
            showToast(`item quantity increased by ${itemToAdd.quantity}`, "info")
        }
        else {
            const payload = (prev: ICartItem[]) => [...prev, {id: itemToAdd.id, quantity: 1}]
            setCartArray(payload(cart))
            localStorage.setItem("cart", JSON.stringify(payload(cart)))
            showToast(`Item added to cart`, "info")
		}
    }

    const removeFromCart = (itemToRemove: ICartItem) => {
        const existingCartItem = cartArray?.find((items: ICartItem) => items.id === itemToRemove.id)

        if (Number(existingCartItem?.quantity) === 1) {
            const payload = cartArray?.filter((items: ICartItem) => items.id !== existingCartItem?.id)
            setCartArray(payload)
            localStorage.setItem("cart", JSON.stringify(payload))
            showToast("Item removed from cart", "info")
        }
        else if (Number(existingCartItem?.quantity) > 1 && itemToRemove?.quantity === 1) { 
            const payload = cartArray.map((item: ICartItem) => item.id === itemToRemove.id 
                ? { ...item, quantity: item.quantity - 1 }  : { ...item })
            setCartArray(payload)
            localStorage.setItem("cart", JSON.stringify(payload))
            showToast(`Item quantity reduced by 1 unit`, "info")
        }
        else if (existingCartItem && itemToRemove.type === "remove") {
            const payload = cartArray?.filter((items: ICartItem) => items.id !== existingCartItem?.id)
            setCartArray(payload)
            localStorage.setItem("cart", JSON.stringify(payload))
            showToast(`item removed from cart`, "info")
        }
        else if (itemToRemove.type === "clear") {
            setCartArray([])
            localStorage.removeItem("cart")
            showToast(`Checkout successfully`, "success")
        }
    }

    return (<AppContext.Provider value={{cartArray, addToCart, removeFromCart}}>
        {children}
    </AppContext.Provider>)
}
