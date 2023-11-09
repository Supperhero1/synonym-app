import store from "../store";

// we use these functions both for validation and for TS type narrowing
export default function (body: any): asserts body is { originalWord: string, synonym: string } {
    if(
        !body.originalWord
        || !body.synonym
        || typeof body.originalWord !== 'string'
        || typeof body.synonym !== 'string'
    ) {
        throw new Error('Malformed request. The request needs to contain both the original word and the synonym.')
    }
    const { originalWord, synonym } = body
    if(originalWord.includes(' ') || synonym.includes(' ')) {
        throw new Error('Only single words can be added. No whitespace.')
    }
    const firstWordSynonyms = store.get(originalWord)

    if(firstWordSynonyms && firstWordSynonyms.has(synonym)) {
        if(firstWordSynonyms.has(synonym))
            throw new Error('This synonym pair was already added')
    }

    if(originalWord.length > 30 || synonym.length > 30) {
        throw new Error('Maximum allowed word length is 30')
    }
}
