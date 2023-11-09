import store from "./store";

export const synonymRepository = {
    add: (firstWord: string, secondWord: string): Set<string> => {
        const firstWordSynonyms = store.get(firstWord)

        const secondWordSynonyms = store.get(secondWord)
        // Whenever a new synonym is added, we create a new set of synonyms and link it to every synonym in the hash map
        // That way, all the words are pointing to the same object in memory and any subsequent requests to add synonyms
        // for any of those words or to remove a word will have access to all the linked words.
        const fullSetOfSynonyms = new Set([
            ...Array.from(firstWordSynonyms || []),
            ...Array.from(secondWordSynonyms || []),
            firstWord.toLowerCase(),
            secondWord.toLowerCase()
        ])

        for(const word of fullSetOfSynonyms) {
            store.set(word.toLowerCase(), fullSetOfSynonyms)
        }

        return fullSetOfSynonyms
    },
    get: (word: string) => {
        const fullSet = store.get(word.toLowerCase())

        return fullSet ? Array.from(fullSet).filter((wordInSet) => wordInSet !== word) : undefined
    },
    remove: (inputWord: string) => {
        // we don't want case sensitivity
        const word = inputWord.toLowerCase()
        const currentSynonyms = store.get(word)
        if(!currentSynonyms) {
            throw new Error(`Can't delete the word: ${word} from the synonym database because it wasn't found there`)
        }
        // all words share a reference to the same object in memory, so we don't have to iterate over all of them
        currentSynonyms.delete(word)
        store.set(word, undefined)
    }
}
