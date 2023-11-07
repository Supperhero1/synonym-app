import express from 'express'
import {synonymRepository} from "./src/repository";
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    const word = req.body
    console.log('===word===', word)
    const value = synonymRepository.get('word')
    console.log('===value===', value)
    res.send(JSON.stringify(value ? Array.from(value) : null))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
