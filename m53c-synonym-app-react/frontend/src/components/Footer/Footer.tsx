import styles from './Footer.module.scss'

export default () => {
    return <footer className={styles.footer}>
        <div>This site is powered by tests taking way too long to run on my monolith project</div>
        <div className={styles.tooltip} >Nothing to see here, move along</div>
    </footer>
}
