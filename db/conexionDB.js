import { MongoClient } from "mongodb";
import { variables } from "../utils/variables.js";

const url = `${variables.MONGO_INSTANCE}://${variables.MONGO_HOST}:${variables.MONGO_PORT}`
const cliente = new MongoClient(url)
const nombreDB = variables.MONGO_DB
let baseDatos;

const conexion={

    clienteMongo: async (callback)=>{

        await cliente.db().admin().listDatabases()
        .then( lista=> {
            const nombre= lista.databases.find(db=> db.name == nombreDB)

            if(!nombre) {
                callback("No se pudo conectar a la base de datos, no existe");
            }
        })
        .catch(()=> callback("Error al conectar con el servidor mongodb"));

        await cliente.connect()
        .then(database => {
            console.log("Conexion a la base de datos realizada con exito.");

            baseDatos= database.db(nombreDB)

            return callback()
        })
        .catch(()=> callback("Error al conectar con el servidor mongodb"));
    },

    obtenerDB: ()=>{
        return baseDatos;
    }
}

export {conexion}

// const conexion= async ()=> {

//     await cliente.connect();

//     const db= cliente.db(nombreDB);

//     return db;
// }

// conexion()
// .then( async (db)=> {

//     console.log("Conectado con exito al servidor");

//     const partidoColeccion= db.collection("partido");

//     const array = await partidoColeccion.find().toArray();

//     console.log(array);
// })
// .catch(console.error)
// .finally(()=> cliente.close());