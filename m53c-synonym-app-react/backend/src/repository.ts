import store from "./store";

export const synonymRepository = {
    add: (firstWord: string, secondWord: string) => {
        if(firstWord.includes(' ') || secondWord.includes(' ')) {
            throw new Error('single words only')
        }
        const firstWordSynonyms = store.get(firstWord)

        if(firstWordSynonyms && firstWordSynonyms.has(secondWord)) {
            if(firstWordSynonyms.has(secondWord))
                throw new Error('This synonym pair was already added')
        }
        const secondWordSynonyms = store.get(secondWord)
        const currentSynonymSet = firstWordSynonyms || secondWordSynonyms || []
        // this ends up doing exactly what we want regardless of which word already has synonyms defined and which doesn't
        // they will both me merged after this and have a reference to the same object in memory, ensuring the
        // transitive property
        let newSynonymSet = new Set([...currentSynonymSet, firstWord, secondWord])
        store.set(firstWord, newSynonymSet)
        store.set(secondWord, newSynonymSet)
    },
    get: (word: string) => {
        return store.get(word)
    }
}
