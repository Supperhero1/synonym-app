import styles from './Tumbleweeds.module.scss'

export default () => {
    return <section className={styles.tumblewrapper}>
        <div className={styles.desert}>
            <div className={styles.tumbleweed}></div>
            <div className={styles.tumbleweed}></div>
            <div className={styles.tumbleweed}></div>
        </div>
        <p>
            Nothing here... Maybe add some synonyms?
        </p>
    </section>
}
