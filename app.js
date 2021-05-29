const { 
    inquirerMenu,
    inquirerPause,
    leerInput,
    listadoBorrarTarea,
    confirmar,
    mostrarListadoChecklist 
} = require('./helpers/inquirer');

const { 
    guardarData, 
    leerData,  
} = require('./helpers/opcionesDB')

const Tareas = require('./models/tareas');

require('colors')

const main = async() =>{
    console.log("Aplicacion ToDo\n");
    let opcion = '';

    const tareas = new Tareas();
    const tareasGuardadas = leerData()

    if(tareasGuardadas){
        tareas.cargarTareasDB(tareasGuardadas)
    }

    do {
       opcion = await inquirerMenu()
        switch (opcion) {
            case '1':
               const desc = await leerInput('Descripcion: ');
               tareas.crearTarea(desc)
               console.log("TAREA CREADA: ", desc)
            break;

            case '2':
                tareas.listadoCompleto()
            break;

            case '3':
                tareas.listadoTareasCompletadas(true)
            break;

            case '4':
                tareas.listadoTareasCompletadas(false)
            break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.cargarListadoTareas)
                tareas.completarTareas(ids)
            break;

            case '6':

               const id = await listadoBorrarTarea(tareas.cargarListadoTareas);
            if(id!=='0'){
                const resp = await confirmar("¿Esta seguro?")
                if(resp){
                     tareas.borrarTarea(id)
                     console.log('Tarea borrada')
                 }
            }
            break;
        
        }
        //console.log("ESTAS SON LAS TAREAS ",tareas.cargarListadoTareas)
        guardarData(tareas.cargarListadoTareas)

       console.log('\n')
       await inquirerPause()
    } while(opcion!=='0');
}

main();