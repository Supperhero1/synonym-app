import express from 'express'
import {synonymRepository} from "./repository";
import cors from "cors"
require('dotenv').config()

const app = express()
app.use(cors({
    origin: (origin, callback) => {
        console.log('===origin===', origin)
        if(!process.env.ALLOWED_ORIGINS) throw new Error('Missing allowed origins config')
        const allowedOrigins = process.env.ALLOWED_ORIGINS.split(" ");
        if (origin && allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Request from unauthorized origin"));
        }
    }
}))
const port = process.env.PORT

app.get('/synonyms', (req, res) => {
    const word = req.query.word
    if(!word) {
        res.status(400)
        res.send('Invalid query')
    }
    console.log('===word===', word)
    const value = synonymRepository.get(word as string)
    console.log('===value===', value)
    res.send(JSON.stringify(value ? Array.from(value) : null))
})

app.post('/synonyms', express.json(),(req, res) => {
    const payload = req.body as { originalWord: string, synonym: string }
    // TODO: validate structure
    synonymRepository.add(payload.originalWord, payload.synonym)
    res.send('whatever')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
