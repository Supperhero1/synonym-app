import styles from './Synonym.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default ({ word, deleteHandler }: { word: string, deleteHandler: (word: string) => Promise<void> }) => {
    return <li key={word} className={styles.synonymListItem}>
        <div onClick={() => deleteHandler(word)} className={styles.deleteButton}>
            <FontAwesomeIcon icon={solid("trash")} className={styles.deleteIcon} />
        </div>
        {word}
    </li>
}
