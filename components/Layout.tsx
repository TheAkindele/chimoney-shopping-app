import React, { ReactNode } from 'react'
import { Navbar } from './Navbar'
import styles from "@styles/components.module.scss"

interface Props {
    children: ReactNode
}

export const Layout = ({children}: Props) => {
  return (
    <main className={styles.layout__container}>
        <section className={styles.layout__nav_container}><Navbar /></section>
        <section className={styles.layout__children_conatiner}>{children}</section>
    </main>
  )
}