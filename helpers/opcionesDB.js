const fs = require('fs');

const path = './DB/datos.json'

const guardarData = ( data ) =>{
    fs.writeFileSync( path, JSON.stringify(data))
}   

const leerData = () => {

    if(!fs.existsSync(path)) {
        return null
    }
    const info = fs.readFileSync(path, {encoding:'utf-8'})
    const data = JSON.parse(info)

    return data
}

module.exports = {
    guardarData,
    leerData,
}