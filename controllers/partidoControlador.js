import respuestasHttp from "../utils/respuestasHttp.js";
import partidoServicio from "../services/partidoServicio.js";
import { PartidoCrearReqModel, PartidoDatosResModel, PartidoActualizarReqModel } from "../models/PartidoModelo.js";

const postPartido= (req, res)=> {

    if(!req.user.error) {

        partidoServicio.crearPartido(new PartidoCrearReqModel(req.body), req.user.sub)
        .then(partido =>{
            respuestasHttp.exito(req, res, new PartidoDatosResModel(partido), 201)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al crear el partido", 400)
        })
        
    } else {
        respuestasHttp.error(req, res, "", req.user.error, 403);
    }
}

const getPartido= (req, res)=> {
    
    partidoServicio.leerPartido()
    .then(array =>{

        let losPartidos= [];

        array.forEach(partido=> {
            losPartidos.push(new PartidoDatosResModel(partido))
        });

        respuestasHttp.exito(req, res, losPartidos, 200)
    })
    .catch(err => {
        respuestasHttp.error(req, res, err, "Error al leer los partidos", 400)
    })
}

const getDetallePartido= (req, res)=> {
    
    partidoServicio.detallePartido(req.params.id)
    .then(partido =>{
        respuestasHttp.exito(req, res, new PartidoDatosResModel(partido), 200)
    })
    .catch(err => {
        respuestasHttp.error(req, res, err, "Error al leer el detalle del partido", 400)
    })
}

const putPartido= (req, res)=> {

    if(!req.user.error) {

        partidoServicio.actualizarPartido(req.params.id, new PartidoActualizarReqModel(req.body), req.user.sub)
        .then(partido =>{
            respuestasHttp.exito(req, res, new PartidoDatosResModel(partido), 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al actualizar el detalle del partido", 400)
        })
        
    } else {
        respuestasHttp.error(req, res, "", req.user.error, 403);
    }
}

const deletePartido= (req, res)=> {

    if(!req.user.error) {
        
        partidoServicio.eliminarPartido(req.params.id, req.user.sub)
        .then( () =>{
            respuestasHttp.exito(req, res, "Partido eliminado", 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al eliminar el detalle del partido", 400)
        })

    } else {
        respuestasHttp.error(req, res, "", req.user.error, 403);
    }
}

export default {postPartido, getPartido, getDetallePartido, putPartido, deletePartido};