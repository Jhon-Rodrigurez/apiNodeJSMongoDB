import partidoRepositorio from "../db/repositorios/partidoRepositorio.js";
import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js";
import equipoRepositorio from "../db/repositorios/equipoRepositorio.js";
import { PartidoEntity } from "../models/PartidoModelo.js";
import crypto from "crypto";

const crearPartido= (partido, username)=> {

    return new Promise( async (resolver, rechazar)=> {

        if(!partido.fecha || !partido.equipoLocal || !partido.equipoVisitante) {
            rechazar("Datos vacios")
        }

        const usuarioEntity= await usuarioRepositorio.buscarUsername(username);
        const equipoEntityLocal= await equipoRepositorio.buscarId(partido.equipoLocal);
        const equipoEntityVisitante= await equipoRepositorio.buscarId(partido.equipoVisitante);

        partido.idPartido= crypto.randomUUID();
        partido.golesLocal= "0";
        partido.golesVisitante= "0";
        partido.creado= new Date();
        partido.usuarioEntity= usuarioEntity;
        partido.equipoEntityLocal= equipoEntityLocal;
        partido.equipoEntityVisitante= equipoEntityVisitante;

        await partidoRepositorio.crear(new PartidoEntity(partido));

        resolver(await partidoRepositorio.detalle(partido.idPartido));
    })
}

const leerPartido= ()=> {

    return new Promise( (resolver, rechazar)=> {

        partidoRepositorio.leer()
        .then(array=> {
            resolver(array)
        })
        .catch(err=> {
            rechazar("No es posible leer los partidos");
        })
    })
}

const detallePartido= (idPartido)=> {

    return new Promise((resolver, rechazar)=> {
        partidoRepositorio.detalle(idPartido)
        .then(partido=> {
            resolver(partido)
        })
        .catch(err=> {
            rechazar("No es posible leer el partido")
        })
    })
}

const actualizarPartido= (idPartido, partido, username)=> {

    return new Promise( async (resolver, rechazar)=> {

        if(!partido.golesLocal || !partido.golesVisitante) {
            rechazar("Datos vacios")
        }

        const partidoDetalle= await partidoRepositorio.detalle(idPartido);
        const usuarioEntity= await usuarioRepositorio.buscarUsername(username);

        if(partidoDetalle.usuarioEntity.idUsuario != usuarioEntity.idUsuario) {
            rechazar("No se puede actualizar el partido");
        }

        partidoDetalle.golesLocal = partido.golesLocal;
        partidoDetalle.golesVisitante= partido.golesVisitante;

        await partidoRepositorio.actualizar(partidoDetalle);

        resolver(await partidoRepositorio.detalle(partidoDetalle.idPartido));
    })
}

const eliminarPartido= (idPartido, username)=> {

    return new Promise( async (resolver, rechazar)=> {

        const partidoDetalle= await partidoRepositorio.detalle(idPartido);
        const usuarioEntity= await usuarioRepositorio.buscarUsername(username);

        if(partidoDetalle.usuarioEntity.idUsuario != usuarioEntity.idUsuario) {
            rechazar("No se puede eliminar el partido");
        }

        resolver(await partidoRepositorio.eliminar(partidoDetalle.idPartido));
    })
}

export default {crearPartido, leerPartido, detallePartido, actualizarPartido, eliminarPartido}