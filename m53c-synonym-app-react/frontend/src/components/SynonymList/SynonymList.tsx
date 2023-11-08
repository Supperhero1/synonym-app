import styles from './SynonymList.module.scss'
import Tumbleweeds from "./Tumbleweeds/Tumbleweeds";
import Synonym from "./Synonym/Synonym";

export default ({
    originalWord,
    synonyms,
    deleteHandler
}: {
    originalWord: string,
    synonyms: string[],
    deleteHandler: (word: string) => Promise<void>
}) => {
    return <section className={`${styles.synonymListWrapper} ${synonyms.length ? '' : styles.hidden}`}>
        <h2>{`Displaying synonyms for the word `}<span className={styles.selectedWord} >{`${originalWord.toLocaleUpperCase()}`}</span>:</h2>
        <ul className={styles.synonymList}>
            {
                synonyms.length
                    ? synonyms.map((synonym) => <Synonym word={synonym} deleteHandler={deleteHandler} />)
                    : <Tumbleweeds />
            }
        </ul>
    </section>
}
