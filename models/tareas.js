const Tarea = require('./tarea.js');
require('colors')

class Tareas{
    _listado = {}

    constructor(){
       this._listado={}
    }

    borrarTarea(id){

        if( this._listado[id]){
                delete this._listado[id]
        }
    }

    get cargarListadoTareas(){
        let listaTareas = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listaTareas.push(tarea)
        } )
        return listaTareas
    }

    completarTareas(ids){

        ids.forEach( id =>{
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = Date()
            }
        })

        this.cargarListadoTareas.forEach( tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }

    cargarTareasDB( tareas ){
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        } )
    }

    crearTarea( desc ){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = {...tarea,};
    }

    listadoCompleto(){
        console.log()
        this.cargarListadoTareas.forEach( (tarea,i) => {
            let num = (i+1).toString() + '.'
            let estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red
            console.log(`${num.green} ${tarea.descripcion} :: ${estado}`)
        } )
    }

    listadoTareasCompletadas( completada ){
        console.log()
        let contador = 0

        this.cargarListadoTareas.forEach( tarea => {

            let estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;

            if(completada){
                if(tarea.completadoEn){
                    contador += 1
                    console.log(`${(contador + '.').green} ${tarea.descripcion} :: ${tarea.completadoEn.green}`)
                }
            }else{
                if(!tarea.completadoEn){
                    contador += 1
                    console.log(`${(contador + '.').green} ${tarea.descripcion} :: ${estado}`)
                }
            }
        } )
    }



}



module.exports = Tareas;
