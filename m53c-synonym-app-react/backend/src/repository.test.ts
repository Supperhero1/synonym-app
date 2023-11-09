import store from "@/store";
import {synonymRepository} from "@/repository";
import { Chance } from 'chance'
import validateAddSynonym from "@/validation/validateAddSynonym";

describe('Test CRUD operations', () => {
    const chance = new Chance()
    beforeAll(() => {
        // clear store
        (global as any).M53C_SYNONYM_APP_STORE = new Map()
    })
    it('should set a synonym pair', () => {
        const firstWord = chance.word()
        const secondWord = chance.word()
        synonymRepository.add(firstWord, secondWord)

        const firstWordFromStore = store.get(firstWord)
        const secondWordFromStore = store.get(secondWord)
        expect(firstWordFromStore).toBeInstanceOf(Set)
        expect(firstWordFromStore.size).toStrictEqual(2)
        expect(Array.from(firstWordFromStore)).toStrictEqual(expect.arrayContaining([
            firstWord, secondWord
        ]))

        expect(secondWordFromStore).toBeInstanceOf(Set)
        expect(secondWordFromStore.size).toStrictEqual(2)
        expect(Array.from(secondWordFromStore)).toStrictEqual(expect.arrayContaining([
            firstWord, secondWord
        ]))
    })

    it('should throw and error when the user tries to input a string with whitespace', () => {
        let error: Error | undefined
        try {
            validateAddSynonym({ originalWord: [chance.word(), chance.word()].join(' '), synonym: chance.word() })
        } catch(e) {
            error = e
        }

        expect(error).toBeTruthy()
        expect(error.message).toStrictEqual('Only single words can be added. No whitespace.')
    })

    it('should throw and error when the user tries to input a synonym pair that has already been added', () => {
        let error: Error | undefined
        const firstWord = chance.word()
        const secondWord = chance.word()
        synonymRepository.add(firstWord, secondWord)
        try {
            validateAddSynonym({ originalWord: firstWord, synonym: secondWord })
        } catch(e) {
            error = e
        }

        expect(error).toBeTruthy()
        expect(error.message).toStrictEqual('This synonym pair was already added')
    })

    it('should retrieve synonyms', () => {
        // const words: string[] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
        //     .map(chance.word.bind(chance))
        const words = ['1', '2', '3', '4', '5', '6', '7', '8']

        synonymRepository.add(words[0], words[1])
        synonymRepository.add(words[0], words[2])
        synonymRepository.add(words[2], words[4])
        synonymRepository.add(words[4], words[7])
        synonymRepository.add(words[3], words[5])

        const results = [
            synonymRepository.get(words[0]),
            synonymRepository.get(words[2]),
            synonymRepository.get(words[3]),
            synonymRepository.get(words[6])
        ]

        expect(results[0]).toBeInstanceOf(Set)
        expect(results[1]).toBeInstanceOf(Set)
        expect(results[2]).toBeInstanceOf(Set)
        expect(results[3]).toBeUndefined()

        expect(results[0].size).toStrictEqual(5)
        expect(Array.from(results[0])).toStrictEqual(expect.arrayContaining([
            words[0], words[1], words[2], words[4], words[7]
        ]))

        expect(results[1].size).toStrictEqual(5)
        expect(Array.from(results[1])).toStrictEqual(expect.arrayContaining([
            words[0], words[1], words[2], words[4], words[7]
        ]))

        expect(results[2].size).toStrictEqual(2)
        expect(Array.from(results[2])).toStrictEqual(expect.arrayContaining([
            words[3], words[5]
        ]))
    })

    it('should return undefined when the word has no synonyms', () => {
        const result = synonymRepository.get(chance.word())

        expect(result).toBeUndefined()
    })
})
