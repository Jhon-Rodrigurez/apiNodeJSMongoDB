import { UsuarioDatosResModel, UsuarioEntity } from "./UsuarioModelo.js";
import { EquipoDatosResModel, EquipoEntity } from "./EquipoModelo.js";

function PartidoCrearReqModel(partido) {
    this.fecha = partido.fecha;
    this.equipoLocal = partido.equipoLocal;
    this.equipoVisitante = partido.equipoVisitante;
}

function PartidoDatosResModel(partido) {
    this.idPartido = partido.idPartido;
    this.fecha = partido.fecha;
    this.golesLocal = partido.golesLocal;
    this.golesVisitante = partido.golesVisitante;
    this.creado = partido.creado;
    this.jugado = partido.jugado;
    this.usuarioEntity = new UsuarioDatosResModel(partido.usuarioEntity);
    this.equipoEntityLocal = new EquipoDatosResModel(partido.equipoEntityLocal);
    this.equipoEntityVisitante = new EquipoDatosResModel(partido.equipoEntityVisitante);
}

function PartidoActualizarReqModel(partido) {
    this.golesLocal = partido.golesLocal;
    this.golesVisitante = partido.golesVisitante;
}

function PartidoEntity(partido) {
    this.idPartido = partido.idPartido;
    this.fecha = partido.fecha;
    this.golesLocal = partido.golesLocal;
    this.golesVisitante = partido.golesVisitante;
    this.creado = partido.creado;
    this.usuarioEntity = new UsuarioEntity(partido.usuarioEntity);
    this.equipoEntityLocal = new EquipoEntity(partido.equipoEntityLocal);
    this.equipoEntityVisitante = new EquipoEntity(partido.equipoEntityVisitante);
}

export {PartidoCrearReqModel, PartidoDatosResModel, PartidoActualizarReqModel, PartidoEntity}