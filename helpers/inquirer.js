const inquirer = require('inquirer');
require('colors');

const menuOpt = {
    type:'list',
    message:'¿Que desea hacer?',
    name: 'opcion',
    choices: [
        {
            value:'1',
            name:'1. Crear tarea'
        },
        {
            value:'2',
            name:'2. Listar tareas'
        },
        {
            value:'3',
            name:'3. Listar tareas completadas'
        },
        {
            value:'4',
            name:'4. Listar tareas pendientes'
        },
        {
            value:'5',
            name:'5. Completar tarea(s)'
        },
        {
            value:'6',
            name:'6. Borrar tarea'
        },
        {
            value:'0',
            name:'0. Salir'
        },
    ]

}



const inquirerMenu = async () =>{
    console.clear()
    console.log('======================='.blue);
    console.log('   Elegir una opcion'.blue);
    console.log('=======================\n'.blue);

    const {opcion} = await inquirer.prompt(menuOpt)

    return opcion
}

const inquirerPause = async () =>{
    const pausa = {
        //type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.blue} para continuar`,
    
    }
    return await inquirer.prompt(pausa)
}

const leerInput = async (message) =>{
    const input = {
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if(!value.length) return "Por favor escriba una tarea";
            return true
        }
     }

     const { desc } = await inquirer.prompt(input)
     
     return desc

}

const listadoBorrarTarea = async ( listado ) => {

   const choices =  listado.map( (tarea,id) =>{

        const desc = `${(id + 1 + '.').green} ${tarea.descripcion}`

       return {
           value: tarea.id,
           name: desc
       }
   } )

   choices.unshift({
       value: '0',
       name: '0.'.green + ' Cancelar'
   })

    const preguntas = { 
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices,
    }
   const {id} = await inquirer.prompt(preguntas)

    return id
}

const mostrarListadoChecklist = async ( listado ) => {

    const choices =  listado.map( (tarea,id) =>{
 
         const desc = `${(id + 1 + '.').green} ${tarea.descripcion}`
 
        return {
            value: tarea.id,
            name: desc,
            checked: tarea.completadoEn ? true : false
        }
    } )
 
     const preguntas = { 
         type: 'checkbox',
         name: 'ids',
         message: 'Selecciones',
         choices,
     }
    const {ids} = await inquirer.prompt(preguntas)
 
     return ids
 }
 
 const confirmar = async (message) =>{
     const pregunta = {
         type: 'confirm',
         name: 'resp',
         message,
     
     }
     const {resp} =  await inquirer.prompt(pregunta);
     return resp
 }

module.exports = {
    inquirerMenu,
    inquirerPause,
    leerInput,
    listadoBorrarTarea,
    confirmar,
    mostrarListadoChecklist
}