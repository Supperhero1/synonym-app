import styles from './ErrorMessage.module.scss'

export default ({ message }: { message: string }) => {
    return <div className={styles.errorMessage} >
        {message}
    </div>
}
