const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const dbConnection = require('./database/connection')
const routerPropriedade = require('./routes/propriedade')
const routerProdutor = require('./routes/produtor')
const routerAnimal = require('./routes/rebanho')
const routerVacina = require('./routes/registro_vacina')
const routerVenda = require('./routes/venda')
const routerMunicipio = require('./routes/municipio')
const routerEspecie = require('./routes/especie')

const port = process.env.port || 3000

app.use(express.json())
app.use(cors())

app.use('/api', 
    routerPropriedade, 
    routerProdutor, 
    routerAnimal, 
    routerVacina, 
    routerVenda,
    routerMunicipio,
    routerEspecie
)

app.get('/', (req, res, next) => {
    res.send('home')
    next()
})

const start = async () => {
    try {
        await dbConnection()
        app.listen(port, console.log(`Server is listening on port: ${port}`))
    } catch (error) {
        console.log('ERROR CATCH: ', error)
    }
}

const populateMunicipios = () => {
    const municipios = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/database/municipios.json')))
    Array.from(municipios).forEach(async municipio => {
        try {
            const sql = await dbConnection()
            const query = `insert into tb_municipio values ('${municipio}')`
            sql.request().query(query, (err, result) => {
                if (err) throw new Error(err)
            })
        } catch (error) {
            
        }
    })
}

//populateMunicipios()
start()