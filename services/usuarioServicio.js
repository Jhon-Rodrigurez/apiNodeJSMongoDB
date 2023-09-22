import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import partidoRepositorio from "../db/repositorios/partidoRepositorio.js";
import { UsuarioEntity } from "../models/UsuarioModelo.js";

const crearUsuario= (usuario)=> {

    return new Promise( (resolver, rechazar)=> {

        if(!usuario.nombre || !usuario.email || !usuario.username || !usuario.password) {
            rechazar("Datos vacios")
        }

        usuarioRepositorio.buscarEmail(usuario.email)
        .then(usuario=> {
            if(usuario != null) {
                rechazar("Este correo ya se encuentra registrado")
            }
        })

        usuarioRepositorio.buscarUsername(usuario.username)
        .then(usuario=> {
            if(usuario != null) {
                rechazar("Este usuario ya se encuentra registrado")
            }
        })
    
        usuario.idUsuario= crypto.randomUUID();
        usuario.passwordEncriptada= bcrypt.hashSync(usuario.password, 10);

        usuarioRepositorio.crear(new UsuarioEntity(usuario))
        .then(async ()=> {
            resolver(await usuarioRepositorio.buscarUsername(usuario.username))
        })
        .catch(err=> {
            rechazar("No es posible crear el usuario")
        })
    })
}

const leerUsuario= (username)=> {

    return new Promise( (resolver, rechazar)=> {

        usuarioRepositorio.buscarUsername(username)
        .then(usuario=> {

            if(usuario == null) {
                rechazar("No se encuentra el usuario");
            }

            resolver(usuario);
        })
    })
}

const leerMisPartidos= (username)=> {

    return new Promise( (resolver, rechazar)=> {

        usuarioRepositorio.buscarUsername(username)
        .then(usuario=> {

            if(usuario == null) {
                rechazar("No se encuentra el usuario")
            }

            partidoRepositorio.misPartidos(usuario.idUsuario)
            .then(array=> {
                resolver(array)
            })
            .catch(err=> {
                rechazar("No es posible obtener mis partidos");
            })
        })
    })
}

export default {crearUsuario, leerUsuario, leerMisPartidos}