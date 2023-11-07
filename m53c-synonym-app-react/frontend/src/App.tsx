import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from './App.module.scss';

function App() {
    const [data, setData] = useState<string[]>([])
    const [wordToCheck, setWordToCheck] = useState<string>('')
    const [synonym, setSynonym] = useState<string>('')
    const fetchData = useCallback(async () => {
        const result = await fetch(`http://localhost:3001/synonyms?word=${wordToCheck}`)
        const parsedResult = await result.json()
        setData(parsedResult || [])
        console.log('===parsedResult===', parsedResult)
    }, [wordToCheck])
    const sendNewSynonym = useCallback(async () => {
        console.log('===synonym===', synonym)
        const body = JSON.stringify({
            originalWord: wordToCheck,
            synonym
        })
        console.log('===body===', body)
        if(synonym) {
            await fetch('http://localhost:3001/synonyms', {
                body,
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
            })
        }
    }, [synonym, wordToCheck, fetchData])
    const inputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setWordToCheck(event.target.value)
    }, [setWordToCheck])
    const synonymInputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSynonym(event.target.value)
    }, [setSynonym])
    useEffect(() => {
        fetchData().catch((error) => {
            console.log(`Error while fetching data: ${error.stack || error}`)
        })
    }, [])
    return (
        <div className={styles.App}>
            <h1>Synonym app</h1>
            <div>
                <input onChange={inputHandler} value={wordToCheck} />
                <button onClick={fetchData}>Get synonyms</button>
            </div>
            <div>
                <input onChange={synonymInputHandler} value={synonym} />
                <button onClick={sendNewSynonym}>Set new synonym</button>
            </div>
            <ul>{data.map((word) => {
                return <li>{word}</li>
            })}</ul>
        </div>
    );
}

export default App;
