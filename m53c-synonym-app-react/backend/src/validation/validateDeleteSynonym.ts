import store from "../store";

export default function (query: any): asserts query is { word: string } {
    if(!query?.word) {
        throw new Error(
            'Malformed request. Delete requests need to have a word query parameter with the value of the word to be deleted.'
        )
    }
    const wordIsInStore = store.has(query.word)

    if(!wordIsInStore) {
        throw new Error(`Can\'t delete '${query.word}' from store because it wasn't found there.`)
    }
}
