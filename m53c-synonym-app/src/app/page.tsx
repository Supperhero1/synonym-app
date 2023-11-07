'use client'

import styles from '@/styles/page.module.scss'

export default function Home() {
    return (
    <main className={styles.main}>
        <h1 className={styles.title}>Synonym app</h1>
        {errorMessage && <h2>{errorMessage}</h2>}
        <p>
        </p>
    </main>
    )
}
