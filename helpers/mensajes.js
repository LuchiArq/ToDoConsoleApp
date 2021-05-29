require('colors');

const mostrarMenu = ()=>{

    return new Promise( ( res ) =>{

        console.clear();
        console.log('======================='.blue);
        console.log('   Elegir una opcion'.blue);
        console.log('=======================\n'.blue);
    
        console.log(`${ '1.'.blue } Crear tarea`);
        console.log(`${ '2.'.blue } Listar tareas`);
        console.log(`${ '3.'.blue } Listar tareas completadas`);
        console.log(`${ '4.'.blue } Listar tareas pendientes`);
        console.log(`${ '5.'.blue } Completar tarea(s)`);
        console.log(`${ '6.'.blue } Borrar tarea`);
        console.log(`${ '0.'.blue } Salir`);
    
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('\nSeleccione una opcion ',(opt)=>{
            readline.close();
      
            res(opt)
        })
    })

}

const pause = () =>{

    return new Promise ( res =>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresione ${'ENTER'.blue} para continuar\n`,()=>{
            readline.close();
            res()
        })
    })
}


module.exports={
    mostrarMenu,
    pause
}