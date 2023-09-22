import respuestasHttp from "../utils/respuestasHttp.js";
import usuarioServicio from "../services/usuarioServicio.js";
import { UsuarioCrearReqModel, UsuarioDatosResModel } from "../models/UsuarioModelo.js";
import { PartidoDatosResModel } from "../models/PartidoModelo.js";

const postUsuario= (req, res)=> {
    
    usuarioServicio.crearUsuario(new UsuarioCrearReqModel(req.body))
    .then((usuario)=> {
        respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, err, "Error al crear el usuario", 400)
    })
}

const getUsuario= (req, res)=> {

    if(!req.user.error){

        usuarioServicio.leerUsuario(req.user.sub)
        .then((usuario)=> {
            respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al leer el usuario", 400)
        })
    } else {
        respuestasHttp.error(req, res, "", req.user.error, 403);
    }    
}

const getMisPartidos= (req, res)=> {

    if(!req.user.error) {

        usuarioServicio.leerMisPartidos(req.user.sub)
        .then(array =>{

            let losPartidos= [];

            array.forEach(partido=> {
                losPartidos.push(new PartidoDatosResModel(partido))
            });

            respuestasHttp.exito(req, res, losPartidos, 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al leer mis partidos", 400)
        })
        
    } else {
        respuestasHttp.error(req, res, "", req.user.error, 403);
    }
}

const postSignin= (req, res)=> {
    
    if(!req.user.error) {
        respuestasHttp.signin(req, res, "", 200);
    } else {
        respuestasHttp.error(req, res, "", req.user.error, 403);
    }
}

export default {postUsuario, getUsuario, getMisPartidos, postSignin};