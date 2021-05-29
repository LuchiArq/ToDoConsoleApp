const {v4:uuidV4} = require('uuid')

class Tarea {

    id = '';
    descripcion = '';
    completadoEn = null;

    constructor(descripcion){
        this.id = uuidV4();
        this.descripcion = descripcion;

    }
}

module.exports = Tarea;