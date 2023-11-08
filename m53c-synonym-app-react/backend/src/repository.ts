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
        const fullSetOfSynonyms = new Set([
            ...Array.from(firstWordSynonyms || []),
            ...Array.from(secondWordSynonyms || []),
            firstWord,
            secondWord
        ])

        for(const word of fullSetOfSynonyms) {
            store.set(word, fullSetOfSynonyms)
        }

        return fullSetOfSynonyms
    },
    get: (word: string) => {
        return store.get(word)
    },
    remove: (word: string) => {
        const currentSynonyms = store.get(word)
        if(!currentSynonyms) {
            throw new Error(`Can't delete the word: ${word} from the synonym database because it wasn't found there`)
        }
        // all words share a reference to the same object in memory, so we don't have to iterate over all of them
        currentSynonyms.delete(word)
        store.set(word, undefined)
    }
}
