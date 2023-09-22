function UsuarioCrearReqModel(usuario) {
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.username = usuario.username;
    this.password = usuario.password;
}

function UsuarioDatosResModel(usuario) {
    this.idUsuario = usuario.idUsuario;
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.username = usuario.username;
}

function UsuarioEntity(usuario) {
    this.idUsuario = usuario.idUsuario;
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.username = usuario.username;
    this.passwordEncriptada = usuario.passwordEncriptada;
}

export {UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioEntity}