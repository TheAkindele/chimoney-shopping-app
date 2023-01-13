import { StaticImageData } from "next/image"
import { ReactNode } from "react"

export type IProductData = {
    id: string
    name: string
    gender: string
    category: string
    newPrice: number
    oldPrice: number
    image: StaticImageData
}

export interface ICartProductDetails extends IProductData {
    itemTotalPrice: number
    quantity: number
}

export interface ICurrencyFormat {
	amount?: string | number
	currency: string
	showCurrency?: boolean
}

export interface IObject {
    [key: string]: string | number
}

export interface ICartItem {
    id: string
    quantity: number
    type?: string
}

export interface contextTypes {
    cartArray: ICartItem[]
    addToCart: (obj: ICartItem) => void
    removeFromCart: (obj: ICartItem) => void
}

export interface childProps {children: ReactNode}

export type ICard = {
    id: string
    newPrice: number
    name: string
    image: StaticImageData
    oldPrice: number
}

export interface IProductCard extends ICard {
    onClick?: (e: string) => void
}

export interface ICartCard extends ICard {
    quantity?: number
}