import Chance from 'chance'

describe('server should correctly handle queries for synonyms', () => {
    const chance = new Chance()
    const wordsToTest = [
        chance.word({ length: 10 }),
        chance.word({ length: 10 }),
        chance.word({ length: 10 }),
        chance.word({ length: 10 })
    ]
    beforeAll(async () => {
        await fetch('http://localhost:4002/synonyms', {
            body: JSON.stringify({
                originalWord: wordsToTest[0],
                synonym: wordsToTest[1]
            }),
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
        })
        await fetch('http://localhost:4002/synonyms', {
            body: JSON.stringify({
                originalWord: wordsToTest[0],
                synonym: wordsToTest[2]
            }),
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
        })
        await fetch('http://localhost:4002/synonyms', {
            body: JSON.stringify({
                originalWord: wordsToTest[0],
                synonym: wordsToTest[3]
            }),
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
        })
    })

    it('should correctly return a synonym set', async () => {
        const response = await fetch(`http://localhost:4002/synonyms?word=${wordsToTest[0]}`)

        expect(response.status).toStrictEqual(200)

        const parsedResponse = await response.json()

        expect(parsedResponse).toBeArrayOfSize(4)
        expect(parsedResponse).toStrictEqual(expect.arrayContaining(wordsToTest))
    })
})
