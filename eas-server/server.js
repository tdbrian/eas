let express = require('express')
let bodyParser = require('body-parser')
let db = require('./db')
let apps = require('./apps/apps')

let app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => res.send({ status: 'running' }))
app.use('/api/v1/apps', apps)

db.connect()
    .then(() => app.listen(3001, () => console.log(`server started on http://localhost:3001`)))
    .catch((err) => console.error(err))
