import styles from './FlavorMessage.module.scss'
import { useEffect, useState } from "react";

const synonymsForSynonym: { first: string, second: string }[] = [
    {  first: 'substitute', second: 'a substitute for ' },
    {  first: 'equivalent', second: 'equivalent to ' },
    {  first: 'duplicate', second: 'a duplicate of ' },
    {  first: 'analog', second: 'an analog of ' },
    {  first: 'paraphrase', second: 'a paraphrase of ' },
]

function randChoice<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

export default ({ dependency, forceConsistency = false }: { dependency: unknown, forceConsistency: boolean }) => {
    // this useState + useEffect setup is here just to control when the component is re-rendered. I wanted it to render
    // again whenever a new word is selected
    const [ firstWord, setFirstWord ] = useState(randChoice(synonymsForSynonym).first)
    const [ secondWord, setSecondWord ] = useState(
        randChoice(synonymsForSynonym.filter(({ first }) => first !== firstWord)).second
    )
    useEffect(() => {
        if(forceConsistency) {
            // used for snapshot testing
            setFirstWord(synonymsForSynonym[0].first)
            setSecondWord(synonymsForSynonym[1].second)
        } else {
            const newFirstWord = randChoice(synonymsForSynonym).first
            setFirstWord(newFirstWord)
            setSecondWord(randChoice(synonymsForSynonym.filter(({ first }) => first !== newFirstWord)).second)
        }
    }, [ dependency ])

    return <section className={styles.flavorMessage}>
        <p><i>
            {firstWord}
            {' is '}
            {secondWord}
            synonym
        </i></p>
    </section>
}
