// arquivo para consultar a API do IBGE que retorna todos os municipios do MS.

const axios = require('axios')
const fs = require('fs')

const getMunicipiosFromAPI = async () => {
    axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados/MS/distritos')
    .then(response => {
        fs.writeFileSync('cidades.json', JSON.stringify(response.data))
    })
}

const filtrarJSON = () => {
    const municipios = JSON.parse(fs.readFileSync('./cidades.json'))
    const nomesCidades = municipios.map(municipio => municipio.nome)
    fs.writeFileSync('nomes.json', JSON.stringify(nomesCidades))
}

//getMunicipiosFromAPI()
//filtrarJSON()