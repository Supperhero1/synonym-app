import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useApp = () => {
    const [ data, setData ] = useState<string[]>([])
    const [ wordToCheck, setWordToCheck ] = useState<string>('')
    const [ wordToDisplay, setWordToDisplay ] = useState<string>('')
    const [ synonym, setSynonym ] = useState<string>('')
    const [ error, setError ] = useState<string>()
    const fetchData = useCallback(async () => {
        if(wordToCheck) {
            try{
                const result = await fetch(`http://localhost:3001/synonyms?word=${wordToCheck}`)
                const parsedResult = await result.json()
                setData(parsedResult || [])
                setWordToDisplay(wordToCheck)
                setError(undefined)
            } catch(error: any) {
                console.error(error.stack || error)
                setError('An error has occurred while fetching the data. Please try again later.')
            }
        }
    }, [ wordToCheck ])
    const sendNewSynonym = useCallback(async () => {
        try {
            const body = JSON.stringify({
                originalWord: wordToCheck,
                synonym
            })

            if(synonym) {
                await fetch('http://localhost:3001/synonyms', {
                    body,
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                })
            }
            setError(undefined)
            await fetchData()
        } catch(error: any) {
            console.error(error.stack || error)
            setError('An error has occurred while sending the synonym pair to the server. Please try again later.')
        }
    }, [ synonym, wordToCheck, fetchData ])
    const deleteHandler = useCallback(async (wordToCheck: string) => {
        try {
            const response = await fetch(`http://localhost:3001/synonyms?word=${wordToCheck}`, { method: 'DELETE' })
            if(response.status !== 200) {
                setError('An error has occurred while attempting to delete a synonym. Please try again later.')
                return
            }
            await fetchData()
            setError(undefined)
        } catch (error: any) {
            console.error(error.stack || error)
            setError('An error has occurred while attempting to delete a synonym. Please try again later.')
        }
    }, [ fetchData ])
    const inputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setWordToCheck(event.target.value)
    }, [ setWordToCheck ])
    const synonymInputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSynonym(event.target.value)
    }, [ setSynonym ])

    useEffect(() => {
        fetchData().catch((error) => {
            console.log(`Error while fetching data: ${error.stack || error}`)
        })
    }, [])

    return {
        data,
        wordToCheck,
        wordToDisplay,
        inputHandler,
        synonymInputHandler,
        sendNewSynonym,
        fetchData,
        synonym,
        error,
        deleteHandler
    }
}
