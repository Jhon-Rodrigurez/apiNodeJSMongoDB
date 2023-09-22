class EquipoDatosResModel {
    constructor(equipo){
        this.id= equipo.id;
        this.nombre = equipo.nombre;
    }
}

function EquipoEntity(equipo) {
    this.id= equipo.id;
    this.nombre = equipo.nombre;
}

export {EquipoDatosResModel, EquipoEntity}