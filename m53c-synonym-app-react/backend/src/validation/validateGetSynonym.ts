export default function(query: any): asserts query is { word: string } {
    if(!query?.word) {
        throw new Error(
            'Malformed request. Requests need to have a word query parameter with the value of the word to be fetched.'
        )
    }
}
