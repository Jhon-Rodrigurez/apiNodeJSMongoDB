import { conexion } from "../conexionDB.js";

const coleccion= ()=>{
    return conexion.obtenerDB().collection("usuario");
}

const crear= async (usuario)=> {
    await coleccion().insertOne(usuario);
}

const buscarUsername= async (username)=> {

    const usuario= await coleccion().findOne({username: username});

    return usuario ? usuario : null
}

const buscarEmail= async (email)=> {

    const usuario= await coleccion().findOne({email: email});

    return usuario ? usuario : null
}

export default {crear, buscarEmail, buscarUsername}