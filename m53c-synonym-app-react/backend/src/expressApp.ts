import express from 'express'
import { synonymRepository } from "./repository";
import cors from "cors"
import environment from "../config/environment";

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = environment.ALLOWED_ORIGINS.split(" ");
        if (origin && allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else if(!origin && environment.isTest) {
            callback(null, true);
        } else {
            callback(new Error("Request from unauthorized origin"));
        }
    }
}))

app.get('/api/synonyms', (req, res) => {
    const word = req.query.word
    if(!word) {
        res.status(400)
        res.send('Invalid query')
    }

    const value = synonymRepository.get(word as string)
    res.send(JSON.stringify(value ? Array.from(value) : null))
})

app.post('/api/synonyms', express.json(),(req, res) => {
    const payload = req.body as { originalWord: string, synonym: string }
    // TODO: validate structure
    try {
        const synonyms = synonymRepository.add(payload.originalWord, payload.synonym)

        res.send(JSON.stringify(Array.from(synonyms)))
    } catch (error) {
        console.log(`Error adding synonym: ${error}`)
        res.status(400).send(`Bad request: ${error.message}`)
    }
})

app.delete('/api/synonyms', (req, res) => {
    const word = req.query.word
    if(!word) {
        res.status(400)
        res.send('Invalid query')
    }

    try {
        synonymRepository.remove(word as string)
    } catch (error) {
        console.error(`Error occurred while deleting the word ${word} from the synonyms map: ${error}`)
        // we'd do some better error handling if we were doing a more serious application but for the purposes of this app
        // we're simply assuming the error is a user error.
        res.status(400).send(error.message)
    }
    res.send('OK')
})

export default app
