import { conexion } from "../conexionDB.js";

const coleccion= ()=>{
    return conexion.obtenerDB().collection("partido");
}

const crear= async (partido)=> {
    await coleccion().insertOne(partido);
}

const leer= async ()=> {
    return await coleccion().find().toArray();
}

const detalle = async (idPartido)=> {

    const partido= await coleccion().findOne({idPartido: idPartido});

    return partido ? partido : {}
}

const actualizar = async (partidoDetalle)=> {
    await coleccion().replaceOne({idPartido: partidoDetalle.idPartido}, partidoDetalle);
}

const eliminar = async (idPartido)=> {
    await coleccion().deleteOne({idPartido: idPartido});
}

const misPartidos= async (idUsuario)=> {

    const query = {"usuarioEntity.idUsuario": idUsuario};

    const partidos = await coleccion().find(query).toArray();

    return partidos ? partidos : [];
}

export default {crear, leer, detalle, actualizar, eliminar, misPartidos}