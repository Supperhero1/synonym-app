import Chance from 'chance'

describe('server should correctly handle adding new synonyms', () => {
    const chance = new Chance()

    it('should correctly set a synonym pair', async () => {
        const firstWord = chance.word({ length: 10 })
        const secondWord = chance.word({ length: 10 })

        const response = await fetch(`http://localhost:4002/api/synonyms`, {
            body: JSON.stringify({
                originalWord: firstWord,
                synonym: secondWord
            }),
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}) as HeadersInit,
        })

        expect(response.status).toStrictEqual(200)
        const parsedResponse = await response.json()
        expect(parsedResponse).toBeArrayOfSize(2)
        expect(parsedResponse).toStrictEqual(expect.arrayContaining([firstWord, secondWord]))

        const response2 = await fetch(`http://localhost:4002/api/synonyms?word=${firstWord}`)
        const parsedResponse2 = await response2.json()

        expect(parsedResponse2?.length).toStrictEqual(1)
        expect(parsedResponse2).toStrictEqual(expect.arrayContaining([
            secondWord
        ]))
    })

    it('should throw and error if the client sends an invalid input', async () => {
        const firstWord = [chance.word({ length: 10 }), chance.word({ length: 10 })].join(' ')
        const secondWord = chance.word({ length: 10 })
        const response = await fetch('http://localhost:4002/api/synonyms', {
            body: JSON.stringify({
                originalWord: firstWord,
                synonym: secondWord
            }),
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}) as HeadersInit,
        })

        expect(response.status).toStrictEqual(400)

        const response2 = await fetch(`http://localhost:4002/api/synonyms?word=${firstWord}`)
        const parsedResponse = await response2.json()

        expect(parsedResponse).toBeNull()
    })
})
