const express =  require('express')
const {json} = require("express");
const cors = require('cors');
const app = express()
const port = 8383

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World</h1>')
})

app.post('/',(req, res) => {
    const { body } = req
    if (body.username === '') {
        return res.status(400).send({ status: 'User Name Missing'})
    }
    if (body.country === '') {
        return res.status(400).send({ status: 'Country Missing'})
    }
    if (body.taxIdentifier === '') {
        return res.status(400).send({ status: 'Tax Identifier Missing'})
    }
    console.log("success body content")
    return res.status(200).send({ status: 'received'})
})
app.listen(port, () => console.log(`Server has started on port: ${port}`))