import express from 'express'
import { synonymRepository } from "./repository";
import cors from "cors"
import environment from "../config/environment";
import validateAddSynonym from "./validation/validateAddSynonym";
import validateDeleteSynonym from "./validation/validateDeleteSynonym";
import validateGetSynonym from "./validation/validateGetSynonym";

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = environment.ALLOWED_ORIGINS.split(" ");
        if (origin && allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else if(!origin) {
            callback(null, true);
        } else {
            callback(new Error("Request from unauthorized origin"));
        }
    }
}))

app.get('/api/synonyms', (req, res) => {
    // we're using 400 status for all validation errors and 500 for all unknown errors. A more complete implementation
    // would have the status as a property of the error which would allow us to be more explicit with what we return,
    // but that isn't really needed for a demo app.
    try {
        validateGetSynonym(req.query)
        const word = req.query.word

        try {
            const value = synonymRepository.get(word)
            res.send(JSON.stringify(value || null))
        } catch (error) {
            console.error(`Error fetching synonym: ${error.stack || error}`)
            res.status(500).send(`Internal server error: ${error.message}`)
        }
    } catch(error) {
        res.status(400).send(error.message)
    }
})

app.post('/api/synonyms', express.json(),(req, res) => {
    const payload = req.body
    try {
        validateAddSynonym(payload)
        try {
            const synonyms = synonymRepository.add(payload.originalWord, payload.synonym)

            res.send(JSON.stringify(Array.from(synonyms)))
        } catch (error) {
            console.error(`Error adding synonym: ${error.stack || error}`)
            res.status(500).send(`Internal server error: ${error.message}`)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.delete('/api/synonyms', (req, res) => {
    try {
        validateDeleteSynonym(req.query)
        const word = req.query.word

        try {
            synonymRepository.remove(word)
            res.send('OK')
        } catch (error) {
            console.error(`Error occurred while deleting the word ${word} from the synonyms map: ${error}`)
            res.status(500).send(error.message)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export default app
