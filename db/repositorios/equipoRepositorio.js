import { conexion } from "../conexionDB.js";

const coleccion= ()=>{
    return conexion.obtenerDB().collection("equipo");
}

const crear= async ()=> {

    await coleccion().deleteMany({});

    let nombresEquipos = ["Cucuta", "Bogota", "Medellin", "Bucaramanga", "Cali"];

    for(let i = 0; i < nombresEquipos.length; i++) {

        const equipo ={
            id: `${i+1}`,
            nombre: nombresEquipos[i]
        }

        await coleccion().insertOne(equipo);
    }

    return await coleccion().find().toArray();
}

const buscarId= async (id)=> {

    const equipo= await coleccion().findOne({id: id});

    return equipo ? equipo : null;
}

export default {crear, buscarId}